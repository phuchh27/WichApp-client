import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from '../store/item/item.reducer';
import {State as ItemState} from '../store/item/item.reducer';


export const selectItemState = createFeatureSelector<State>('item');

export const selectItem = createSelector(
  selectItemState,
  (state: ItemState) => state.items
);

export const selectItemLoading = createSelector(
  selectItemState,
  (state: ItemState) => state.loading
);

export const selectItemError = createSelector(
  selectItemState,
  (state: ItemState) => state.error
);
