import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import { HttpClient } from '@angular/common/http';
import { Observable, interval, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenExpirationTimer: any;
  // private loginTime: Date;
  private logoutTime?: Date;

  private apiUrl = 'http://127.0.0.1:8000/auth/token/refresh/';

  constructor(
    private store: Store<fromApp.AppState>,
    private http: HttpClient
  ) {
    interval(3 * 60 * 1000).subscribe(() => {
      this.checkTokenLicense();
    });
  }
  setLogoutTimer(expirationDuration: number) {
    const currentTime = new Date();
    console.log(currentTime);
    this.logoutTime = new Date(currentTime.getTime() + expirationDuration);
    console.log(this.logoutTime);
  }

  clearLogoutTimer() {
    this.logoutTime = new Date();
  }

  checkTokenLicense() {
    const currentTime = new Date();
    if (this.logoutTime) {
      if (currentTime > this.logoutTime) {
        const refreshData = this.getRefresh();
        if (refreshData) {
          this.store.dispatch(AuthActions.logout(refreshData));
        } else {
          // console.log('Refresh token not available.');
        }
      } else {
        const refreshData = this.getRefresh();
        // console.log('from RF', refreshData);
        if (typeof refreshData === 'string') {
          this.store.dispatch(
            AuthActions.refreshTokenStart({ refresh: refreshData })
          );
        } else {
          // console.log('Refresh token not available.');
        }
      }
    }
  }

  refreshAccessToken(refreshToken: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { refresh: refreshToken });
  }

  replaceAccessToken(accessToken: string): void {
    // Get user data from local storage
    const userDataString = localStorage.getItem('userData');

    // Parse user data
    const userData = JSON.parse(userDataString || '{}');

    // Update the 'access' token in the '_tokens' property
    if (userData._tokens && typeof userData._tokens === 'string') {
      try {
        // Attempt to parse the _tokens string as JSON
        const tokensObject = JSON.parse(userData._tokens);

        // Check if the parsed value is an object
        if (tokensObject && typeof tokensObject === 'object') {
          tokensObject.access = accessToken;

          // Convert the object back to a string and update _tokens
          userData._tokens = JSON.stringify(tokensObject);
        }
      } catch (error) {
        console.error('Error parsing _tokens as JSON:', error);
        console.log('_tokens value:', userData._tokens);
      }
    }

    // Convert the updated user data back to a string
    const updatedUserDataString = JSON.stringify(userData);

    // Save the updated user data back to local storage
    localStorage.setItem('userData', updatedUserDataString);

    console.log('Updated Userdata', userData);
  }

  getAccess(): { access: string } | null {
    const authDataString = localStorage.getItem('userData');
    if (!authDataString) {
      return null;
    }

    const authData = JSON.parse(authDataString); // Parse authDataString as JSON
    if (!authData._tokens || typeof authData._tokens !== 'string') {
      return null;
    }

    const tokensJSON = authData._tokens.replace(/'/g, '"');
    const tokensObject = JSON.parse(tokensJSON);
    const access = tokensObject.access;
    return access;
  }

  getRefresh(): { refresh: string } | null {
    const authDataString = localStorage.getItem('userData');
    if (!authDataString) {
      return null;
    }

    const authData = JSON.parse(authDataString);
    if (!authData._tokens || typeof authData._tokens !== 'string') {
      return null;
    }

    const tokensJSON = authData._tokens.replace(/'/g, '"');
    const tokensObject = JSON.parse(tokensJSON);
    const refresh = tokensObject.refresh;

    console.log(refresh);
    return refresh;
  }

  signup(email: string, username: string, phone: string, password: string): Observable<any> {
    const signupData = { email, username, phone, password };
    const apiUrl = 'http://127.0.0.1:8000/'
    return this.http.post(`${apiUrl}/auth/register/`, signupData);
  }
}

// getRefresh(): { refresh: string } | null {
//   const tokenData = JSON.parse(localStorage.getItem('userData') || '{}');

//   if (!tokenData) {
//     return null;
//   }

//   const tokensJSON = tokenData._tokens.replace(/'/g, '"');
//   if (!tokensJSON) {
//     return null; // Return null if _tokens property is not found or is undefined
//   }
//   const tokensObject = JSON.parse(tokensJSON);
//   const refresh = tokensObject.refresh;
//   return {refresh};
// }
// }
