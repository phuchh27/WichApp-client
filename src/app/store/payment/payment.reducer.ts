import { createReducer, on } from '@ngrx/store';
import * as PaymentStoreActions from './payment.actions';

export interface State {
  title: string;
  cost: string;
  error: any;
}

export const initialState: State = {
  title: '',
  cost: '',
  error: null,
};

export const paymentReducer = createReducer(
  initialState,
  on(PaymentStoreActions.PaymentRequired, (state, { title, cost }) => ({
    ...state,
    title,
    cost,
    error: null,
  })),
  on(PaymentStoreActions.PaymentSuccess, (state) => ({
    ...state,
    error: null,
  })),
  on(PaymentStoreActions.PaymentFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
