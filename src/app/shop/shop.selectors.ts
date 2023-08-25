// store.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from '../store/store/store.reducer';

const selectStoreState = createFeatureSelector<State>('store');

export const selectPaymentRequired = createSelector(
  selectStoreState,
  state => state.paymentRequired
);
