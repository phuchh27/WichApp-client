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

export const createNewStoreSuccess = createAction(
  '[Store] Create New Store Success'
);

export const createNewStoreFailure = createAction(
  '[Store] Create New Store Failure',
  props<{ error: string }>()
);

export const paymentRequired = createAction('[Store] Payment Required');

export const fetchUserStores = createAction('[Store] Fetch User Stores');

export const setUserStores = createAction(
  '[Store] Set User Stores',
  props<{ stores: Store[] }>()
);

export const fetchUserStoresFail = createAction(
  '[Store] Fetch User Stores Fail',
  props<{ error: string }>()
);
