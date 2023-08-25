import { createReducer, on } from '@ngrx/store';
import * as StoreActions from './store.actions';
import { Store } from '../../models/store.model';
export interface State {
  Stores: Store[];
  loading: boolean;
  error: string | null;
  paymentRequired: boolean;
}

const initialState: State = {
  Stores: [],
  loading: false,
  error: null,
  paymentRequired: false
};

export const storeReducer = createReducer(
  initialState,
  on(StoreActions.CreateStoreStart, state => ({ ...state, loading: true, error: null })),
  on(StoreActions.createNewStoreSuccess, state => ({ ...state, loading: false, error: null })),
  on(StoreActions.createNewStoreFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(StoreActions.paymentRequired, state => ({ ...state, paymentRequired: true }))
);
