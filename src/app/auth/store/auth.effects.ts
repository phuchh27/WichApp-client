import { Injectable } from '@angular/core';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { HttpClient } from '@angular/common/http';

import { EMPTY, catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Action } from '@ngrx/store';

export interface AuthResponseData {
  email: string;
  username: string;
  tokens: {
    refresh: string;
    access: string;
  };
  expiresIn: number;
  id: number;
  is_owner: boolean;
  is_staff: boolean;
}

const handleAuthentication = (
  email: string,
  id: number,
  username: string,
  token: any,
  expiresIn: number,
  is_owner: boolean,
  is_staff: boolean
) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(
    id,
    email,
    username,
    token,
    expiresIn,
    expirationDate,
    is_owner,
    is_staff
  );
  localStorage.setItem('userData', JSON.stringify(user));
  return AuthActions.authenticateSuccess({
    id,
    email,
    username,
    token,
    expiresIn,
    expirationDate,
    redirrect: true,
    is_owner,
    is_staff,
  });
};

@Injectable()
export class AuthEffects {
  authSignin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginStart),
      switchMap((action) => {
        return this.http
          .post<AuthResponseData>('http://127.0.0.1:8000/auth/login/', {
            email: action.email,
            password: action.password,
            returnSecureToken: true,
          })
          .pipe(
            map((resData) => {
              return handleAuthentication(
                resData.email,
                resData.id,
                resData.username,
                resData.tokens,
                resData.expiresIn,
                resData.is_owner,
                resData.is_staff
              );
            }),
            catchError((errorRes) => {
              return handleError(errorRes);
            })
          );
      })
    )
  );

  authLogOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        switchMap((action) => {
          return this.http
            .post<AuthResponseData>('http://127.0.0.1:8000/auth/logout/', {
              refresh: action.refresh,
            })
            .pipe(
              tap(() => {
                localStorage.removeItem('userData');
                this.router.navigate(['/auth']);
              })
            );
        })
      ),
    { dispatch: false }
  );

  authRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.authenticateSuccess),
        tap((action) => {
          if (action.is_staff) {
            this.router.navigate(['/staff-page']);
          } else if (action.is_owner) {
            this.router.navigate(['/ohome']);
          }
        })
      ),
    { dispatch: false }
  );

  autoLogin$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.autoLogin),
    switchMap(() => {
      const userDataString = localStorage.getItem('userData');
      if (!userDataString) {
        return EMPTY; // If userData doesn't exist in Local Storage, do nothing
      }

      const userData: AuthResponseData = JSON.parse(userDataString);
      const expirationDate = new Date(new Date().getTime() + userData.expiresIn * 1000);
      this.authService.setLogoutTimer(userData.expiresIn * 1000);
      // If the token is expired, dispatch logout action
        // If the token is not expired yet, dispatch authenticateSuccess action
        return of(
          AuthActions.authenticateSuccess({
            id: userData.id,
            email: userData.email,
            username: userData.username,
            token: userData.tokens,
            expiresIn: userData.expiresIn,
            expirationDate: expirationDate,
            redirrect: false,
            is_owner: userData.is_owner,
            is_staff: userData.is_staff,
          })
        );
      
    }),
    map((result) => result as Action) // Transform the result into the expected type Action
  )
);

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(AuthActions.authenticateFail({ errorMessage }));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
      break;
  }
  return of(AuthActions.authenticateFail({ errorMessage }));
};
