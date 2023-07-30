import { createAction, props } from '@ngrx/store';

export const signupStart = createAction(
  '[Auth] Signup Start',
  props<{
    email: string;
    password: string;
  }>()
);

export const loginStart = createAction(
  '[AUTH] Login Start',
  props<{ email: string; password: string }>()
);

export const authenticateSuccess = createAction(
  '[AUTH] Authenticate Success',
  props<{
    id: number;
    email: string;
    username: string;
    token: any;
    expiresIn: number;
    expirationDate: Date;
    redirrect: boolean;
  }>()
);

export const authenticateFail = createAction(
  '[Auth] Authenticate Fail',
  props<{
    errorMessage: string;
  }>()
);

export const clearError = createAction('[Auth] Clear Error');

export const autoLogin = createAction('[Auth] Auto Login');

export const logout = createAction(
  '[Auth] Logout',
  props<{ refresh: string }>()
);

