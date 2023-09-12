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

export const PaidStore = createAction(
  '[Payment] Paid Store',
  props<{
    store: PaidStoreData;
  }>()
);

export const PaidStoreSuccess = createAction(
  '[Payment] Paid Store Success',
)

export const PaidStoreFailure = createAction(
  '[Payment] Paid Store Failure',
  props<{ error: any }>()
)
