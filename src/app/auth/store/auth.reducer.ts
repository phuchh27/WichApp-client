import { User } from '../user.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export const authFeatureKey = 'auth';

export interface State {
  user: User | null;
  authError: string | null;
  loading: boolean;
  errorDetail?: any;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
  errorDetail: null
};

const _authReducer = createReducer(
  initialState,
  on(AuthActions.loginStart, (state) => ({
    ...state,
    authError: null,
    loading: true,
  })),
  on(AuthActions.socialLoginStart, (state) => ({
    ...state,
    authError: null,
    loading: true,
  })),
  on(AuthActions.authenticateSuccess, (state, action) => ({
    ...state,
    authError: null,
    loading: false,
    user: new User(
      action.id,
      action.email,
      action.username,
      action.token,
      action.expiresIn,
      action.expirationDate,
      action.is_owner,
      action.is_staff
    ),
  })),
  on(AuthActions.authenticateFail, (state, action) => ({
    ...state,
    user: null,
    authError: action.errorMessage,
    errorDetail: action.errorDetail, // Include the errorDetail property
    loading: false,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    user: null,
  })),

  on(AuthActions.refreshTokenStart, (state, { refresh }) => ({
    ...state,
    authError: null,
    loading: true,
  })),
  on(AuthActions.refreshTokenSuccess, (state) => ({
    ...state,
    authError: null,
    loading: false,
  })),
  on(AuthActions.refreshTokenFail, (state, action) => ({
    ...state,
  }))
);

export function authReducer(state: State | undefined, action: Action) {
  return _authReducer(state, action);
}
