import { createReducer, on } from "@ngrx/store";
import * as StoreActions from './store.actions';

export interface State {
    message: string;
    data: any;
    error: any;
  }

  const initialState: State = {
    message: '',
    data: null,
    error: null
  };

  export const storeReducer = createReducer(
    initialState,
    on(StoreActions.createStoreSuccess, (state, action) => ({
      ...state,
      message: action.message,
      data: action.data,
      error: null
    })),
    on(StoreActions.createStoreFail, (state, action) => ({
      ...state,
      message: '',
      data: null,
      error: action.error
    }))
  );