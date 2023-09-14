import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/models/category.model';


export const fetchCategories = createAction('[Category] Fetch Categories');

export const setCategories = createAction(
  '[Category] Set Categories',
  props<{ categories: Category[] }>()
);

export const fetchCategoriesFail = createAction(
  '[Category] Fetch Categories Fail',
  props<{ error: string }>()
);
