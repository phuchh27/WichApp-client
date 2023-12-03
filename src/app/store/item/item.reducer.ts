import { Item } from 'src/app/models/item.model';
import * as fromItemActions from './item.actions';
import { createReducer, on } from '@ngrx/store';
import { state } from '@angular/animations';
export interface State {
  items: Item[];
  loading: boolean;
  error: string | null;
  addNewCategory: boolean;
}

const initialState: State = {
  items: [],
  loading: false,
  error: null,
  addNewCategory: false,
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
  on(fromItemActions.getItemsStart, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(fromItemActions.getItemsSuccess, (state, { items }) => ({
    ...state,
    items,
    loading: false,
    error: null,
  })),
  on(fromItemActions.getItemsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
  on(fromItemActions.getItemsByCategoryStart, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(fromItemActions.getItemsByCategorySuccess, (state, { items }) => ({
    ...state,
    items,
    loading: false,
    error: null,
  })),
  on(fromItemActions.getItemsByCategoryFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  on(fromItemActions.getItemsForStaffStart, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(fromItemActions.getItemsForStaffSuccess, (state, { items }) => ({
    ...state,
    items,
    loading: false,
    error: null,
  })),
  on(fromItemActions.getItemsForStaffFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
  on(fromItemActions.updateItemStart,(state)=>({
    ...state,
    loading:true,
    error:null,
  })),
  on(fromItemActions.updateItemSuccess,(state)=>({
    ...state,
    loading:false,
    error:null,
  })),
  on(fromItemActions.updateItemFailure,(state,{ error })=>({
    ...state,
    loading:false,
    error:error,
  })),

  on(fromItemActions.addItemsCategoryStart,(state)=>({
    ...state,
    loading:true,
    error:null,
  })),
  on(fromItemActions.addItemsCategorySuccess,(state)=>({
    ...state,
    loading:false,
    error:null,
    addNewCategory: true
  })),
  on(fromItemActions.addItemsCategoryFailure,(state,{ error })=>({
    ...state,
    loading:false,
    error:error,
  })),
);
