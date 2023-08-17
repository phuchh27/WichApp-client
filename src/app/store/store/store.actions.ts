import { createAction, props } from '@ngrx/store';
import { Store } from '../../models/store.model';

export const CreateStoreStart = createAction(
  '[Store] Create  Store',
  props<{
    shopname: string;
    description: string;
    address: string;
    phone: string;
    category: number;
  }>()
);

export const createStoreSuccess = createAction(
  '[Store] Create Store Success',
  props<{ message: string, data: any }>()
);


export const createStoreFail = createAction(
  '[Store] Create Store Fail',
  props<{ error: any }>()
);

export const fetchUserStores = createAction('[Store] Fetch User Stores');

export const setUserStores = createAction(
  '[Store] Set User Stores',
  props<{ stores: Store[] }>()
);

export const fetchUserStoresFail = createAction(
  '[Store] Fetch User Stores Fail',
  props<{ error: string }>()
);