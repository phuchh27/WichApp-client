import { Item } from 'src/app/models/item.model';
import * as fromItemActions from './item.actions';
import { createReducer, on } from '@ngrx/store';
export interface State {
  items: Item[];
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  items: [],
  loading: false,
  error: null,
};

export const itemReducer = createReducer(
  initialState,
  on(fromItemActions.addItemStart, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(fromItemActions.addItemSuccess, (state) => ({
    ...state,
    loading: false,
    error: null,
  })),
  on(fromItemActions.addItemFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
  on(fromItemActions.getItemsStart, (state) => ({...state, loading:true, error:null})),
  on(fromItemActions.getItemsSuccess, (state, {items}) => ({...state, items, loading:false, error:null})),
  on(fromItemActions.getItemsFailure, (state, {error}) => ({...state, loading:false, error:error}))
);
