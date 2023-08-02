import { Injectable } from '@angular/core';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { HttpClient } from '@angular/common/http';

import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

export interface AuthResponseData {
  email: string;
  username: string;
  tokens: {
    refresh: string;
    access: string;
  };
  expiresIn: number;
  id: number;
}

const handleAuthentication = (
  email: string,
  id: number,
  username: string,
  token: any,
  expiresIn: number
) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  console.log(expirationDate);
  const user = new User(id, email, username, token, expiresIn, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return AuthActions.authenticateSuccess({
    id,
    email,
    username,
    token,
    expiresIn,
    expirationDate,
    redirrect: true,
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
                resData.expiresIn
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
        tap((action) => action.redirrect && this.router.navigate(['/ohome']))
      ),
    { dispatch: false }
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.autoLogin),
      switchMap(() => {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        if (!userData || !userData._tokens) {
          return of({ type: 'DUMMY_ACTION' }); // Dispatch a dummy action to do nothing if no user data in local storage
        }

        const user = new User(
          userData.id,
          userData.email,
          userData.username,
          userData._tokens,
          userData.expiresIn,
          new Date(userData.__tokenExpirationDate)
        );

        if (user.token) {
          // Token is not expired, dispatch the authenticateSuccess action
          const expirationDuration =
            new Date(userData.__tokenExpirationDate).getTime() -
            new Date().getTime();
          return of(
            AuthActions.authenticateSuccess({
              id: user.id,
              email: user.email,
              username: user.username,
              token: user.token,
              expiresIn: expirationDuration / 1000, // Convert to seconds
              expirationDate: new Date(userData.__tokenExpirationDate),
              redirrect: false,
            })
          );
        } else {
          const refreshToken = userData._tokens.refresh;
          // Token is expired, dispatch the logout action
          return of(AuthActions.logout(refreshToken));
        }
      })
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
