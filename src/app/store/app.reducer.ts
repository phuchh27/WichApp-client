import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { authReducer, State as AuthState } from '../auth/store/auth.reducer';
import * as fromCategory from './category/category.reducer';
import * as fromStore from './store/store.reducer';
import * as fromStaff from './staff/staff.reducer';

export interface AppState {
  auth: AuthState;
  category : fromCategory.State;
  store : fromStore.State;
  staff: fromStaff.State;
}
export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  category : fromCategory.categoryReducer,
  store : fromStore.storeReducer,
  staff: fromStaff.staffReducer
};
export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectCategoryState = createFeatureSelector<fromCategory.State>('category');

export const selectStoreState = createFeatureSelector<fromStore.State>('store');

export const selectStaffState = createFeatureSelector<fromStaff.State>('staff');
