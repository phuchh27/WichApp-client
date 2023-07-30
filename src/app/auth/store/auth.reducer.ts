import { User } from '../user.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export const authFeatureKey = 'auth';

export interface State {
  user: User | null;
  authError: string | null;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
};

const _authReducer = createReducer(
  initialState,
  on(AuthActions.loginStart, (state) => ({
    ...state,
    authError: null,
    loading: true,
  })),
  on(AuthActions.authenticateSuccess, (state, action) => ({
    ...state,
    user: new User(
      action.id,
      action.email,
      action.username,
      action.token,
      action.expiresIn,
      action.expirationDate
    ),
  })),
  on(AuthActions.authenticateFail, (state, action) => ({
    ...state,
    user: null,
    authError: action.errorMessage,
    loading: false,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    user: null,
    authError: null,
    loading: false,
  }))
);

export function authReducer(state: State | undefined, action: Action) {
  return _authReducer(state, action);
}
