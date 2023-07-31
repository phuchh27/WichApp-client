import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { authReducer, State as AuthState } from '../auth/store/auth.reducer';

export interface AppState {
  auth: AuthState;
}
export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
};
export const selectAuthState = createFeatureSelector<AuthState>('auth');
