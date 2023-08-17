import { createReducer, on } from '@ngrx/store';
import * as StoreActions from './store.actions';
import { Store } from '../../models/store.model';
export interface State {
  Stores: Store[];
  message: string;
  data: any;
  error: any;
}

const initialState: State = {
  Stores: [],
  message: '',
  data: null,
  error: null,
};

export const storeReducer = createReducer(
  initialState,
  on(StoreActions.createStoreSuccess, (state, action) => ({
    ...state,
    message: action.message,
    data: action.data,
    error: null,
  })),
  on(StoreActions.createStoreFail, (state, action) => ({
    ...state,
    message: '',
    data: null,
    error: action.error,
  })),
  on(StoreActions.setUserStores, (state, action) => ({
    ...state,
    Stores: action.stores,
    error: ''
  })),
  on(StoreActions.fetchUserStoresFail, (state, action) => ({
    ...state,
    error: action.error
  }))
);
