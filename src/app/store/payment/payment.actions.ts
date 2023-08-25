import { createAction, props } from '@ngrx/store';

export const PaymentRequired = createAction(
  '[Payment] Payment Required',
  props<{ title: string; cost: string }>()
);

export const PaymentSuccess = createAction(
  '[Payment] Payment Success'
);

export const PaymentFailure = createAction(
  '[Payment] Payment Failure',
  props<{ error: any }>()
);
