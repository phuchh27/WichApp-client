import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from '../../../store/Icategory/iCategory.reducer';

export const selectICategoriesState = createFeatureSelector<State>('ICategories');

export const selectICategories = createSelector(selectICategoriesState, (state) => state.ICategories);

export const selectICategoriesLoading = createSelector(selectICategoriesState, (state) => state.loading);

export const selectICategoriesError = createSelector(selectICategoriesState, (state) => state.error);