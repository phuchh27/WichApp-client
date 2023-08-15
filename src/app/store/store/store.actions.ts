import { createAction, props } from '@ngrx/store';

export const CreateStoreStart = createAction(
  '[Store] Create  Store',
  props<{
    storeName: string;
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