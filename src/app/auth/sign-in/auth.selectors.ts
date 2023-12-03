


import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../store/auth.reducer';

export const selectAuthState = createFeatureSelector<State>('auth');

export const selectAuthError = createSelector(
    selectAuthState,
    (state: State) => ({ errorMessage: state.authError, errorDetail: state.errorDetail })
  );
