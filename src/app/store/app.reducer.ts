import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { authReducer, State as AuthState } from '../auth/store/auth.reducer';
import * as fromCategory from './category/category.reducer';
import * as fromStore from './store/store.reducer';
import * as fromStaff from './staff/staff.reducer';
import * as fromPayment from './payment/payment.reducer';
import * as fromItem from './item/item.reducer';
import * as fromIcategory from './Icategory/iCategory.reducer';

export interface AppState {
  auth: AuthState;
  category : fromCategory.State;
  store : fromStore.State;
  staff: fromStaff.State;
  payment: fromPayment.State;
  item: fromItem.State;
  icategory: fromIcategory.State;
}
export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  category : fromCategory.categoryReducer,
  store : fromStore.storeReducer,
  staff: fromStaff.staffReducer,
  payment: fromPayment.paymentReducer,
  item: fromItem.itemReducer,
  icategory: fromIcategory.ICategoriesReducer,
};
export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectCategoryState = createFeatureSelector<fromCategory.State>('category');

export const selectStoreState = createFeatureSelector<fromStore.State>('store');

export const selectStaffState = createFeatureSelector<fromStaff.State>('staff');

export const selectPaymentState = createFeatureSelector<fromPayment.State>('payment');

export const selectItemState = createFeatureSelector<fromItem.State>('item');

export const selectIcategoryState = createFeatureSelector<fromIcategory.State>('icategory');
