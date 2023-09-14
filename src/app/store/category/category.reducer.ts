import { createReducer, on } from '@ngrx/store';

import * as CategoryActions from '../category/cactegory.actions';
import { Category } from 'src/app/models/category.model';

export interface State {
  categories: Category[];
  error: string;
}

const initialState: State = {
  categories: [],
  error: ''
};

export const categoryReducer = createReducer(
  initialState,
  on(CategoryActions.setCategories, (state, action) => ({
    ...state,
    categories: action.categories,
    error: ''
  })),
  on(CategoryActions.fetchCategoriesFail, (state, action) => ({
    ...state,
    error: action.error
  }))
);
