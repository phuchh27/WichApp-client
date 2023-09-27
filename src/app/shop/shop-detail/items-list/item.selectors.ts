import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from '../../../store/item/item.reducer';

export const selectItemState = createFeatureSelector<State>('item');

export const selectItem = createSelector(selectItemState, (state) => state.items);

export const selectItemLoading = createSelector(selectItemState, (state) => state.loading);

export const selectItemError = createSelector(selectItemState, (state) => state.error);