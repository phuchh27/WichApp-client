import { createReducer, on } from '@ngrx/store';
import { ICategory } from 'src/app/models/category.model';
import * as fromCategoryActions from '../Icategory/iCategory.actions';

export interface State {
  ICategories: ICategory[];
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  ICategories: [],
  loading: false,
  error: null,
};

export const ICategoriesReducer = createReducer(
  initialState,
  on(fromCategoryActions.getICategoryStart, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(fromCategoryActions.getICategorySuccess, (state, action) => ({
    ...state,
    ICategories: action.icategories,
    loading: false,
    error: null,
  })),
  on(fromCategoryActions.getICategoryFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  }))
);
