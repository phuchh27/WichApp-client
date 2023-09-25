import { createAction, props } from '@ngrx/store';
import {PaidStoreData}  from '../../models/store.model';

export const PaymentRequired = createAction(
  '[Payment] Payment Required',
  props<{ title: string; cost: string }>()
);

export const PaymentSuccess = createAction('[Payment] Payment Success');

export const PaymentFailure = createAction(
  '[Payment] Payment Failure',
  props<{ error: any }>()
);

export const startPaymentCreateStore = createAction(
  '[Store] Start Payment Create Store',
  props<{ storeData: PaidStoreData }>()
);

export const successPaymentCreateStore = createAction(
  '[Store] Success Payment Create Store',
  props<{ response: any }>()
);

export const failurePaymentCreateStore = createAction(
  '[Store] Failure Payment Create Store',
  props<{ error: any }>()
);
