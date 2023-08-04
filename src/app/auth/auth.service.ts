import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenExpirationTimer: any;

  constructor(private store: Store<fromApp.AppState>) {}
  setLogoutTimer(expirationDuration: number) {
    console.log('Setting timer: ' + expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      const refreshData = this.getRefresh();
      if (refreshData) {
        this.store.dispatch(AuthActions.logout(refreshData));
      } else {
        // Handle the case when refreshData is null (optional)
        console.log('Refresh token not available.');
      }
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  getAccess(): { access: string } | null {
    const authDataString = localStorage.getItem('userData');
  if (!authDataString) {
    return null; // Return null if authDataString is not found in localStorage
  }

  const authData = JSON.parse(authDataString); // Parse authDataString as JSON
  if (!authData._tokens || typeof authData._tokens !== 'string') {
    return null; // Return null if _tokens property is not found or not a string
  }

  const tokensJSON = authData._tokens.replace(/'/g, '"');
  const tokensObject = JSON.parse(tokensJSON);
  const access = tokensObject.access;
  return  access ;
  }

  getRefresh(): { refresh: string } | null {
    const authDataString = localStorage.getItem('userData');
    if (!authDataString) {
      return null; // Return null if authDataString is not found in localStorage
    }
  
    const authData = JSON.parse(authDataString); // Parse authDataString as JSON
    if (!authData._tokens || typeof authData._tokens !== 'string') {
      return null; // Return null if _tokens property is not found or not a string
    }
  
    const tokensJSON = authData._tokens.replace(/'/g, '"');
    const tokensObject = JSON.parse(tokensJSON);
    const refresh = tokensObject.refresh;
    return  refresh ;
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
