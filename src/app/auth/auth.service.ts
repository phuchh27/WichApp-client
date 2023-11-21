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
          console.log('Refresh token not available.');
        }
      } else {
        const refreshData = this.getRefresh();
        console.log('from RF' ,refreshData)
        if (typeof refreshData === 'string') {
          this.store.dispatch(AuthActions.refreshTokenStart({ refresh: refreshData }));
        } else {
          console.log('Refresh token not available.');
        }
      }
    }
  }

  refreshAccessToken(refreshToken: string): Observable<any> {
    console.log('do refresh',refreshToken );
    return this.http.post<any>(this.apiUrl, { refresh: refreshToken });
  }

  replaceAccessToken(accessToken: string): void {
    const userDataString = localStorage.getItem('userData');
    const userData = JSON.parse(userDataString || '{}');
    const tokensObject = userData._tokens || {};
    tokensObject.access = accessToken;
    const newUserData = { ...userData, _tokens: tokensObject };
    
    const currentTime = new Date();
    const gracePeriodTime = userData.expiresIn; 
    const gracePeriodMilliseconds = gracePeriodTime * 1000; 
    this.logoutTime = new Date(currentTime.getTime() + gracePeriodMilliseconds);
    
    localStorage.setItem('userData', JSON.stringify(newUserData));
    console.log(newUserData);
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
