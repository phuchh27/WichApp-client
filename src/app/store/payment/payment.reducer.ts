import { createReducer, on } from '@ngrx/store';
import * as PaymentStoreActions from './payment.actions';
import { state } from '@angular/animations';
import {PaidStoreData} from '../../models/store.model'

export interface State {
  paidStore : PaidStoreData[];
  loading: boolean;
  success: boolean;
  error: any;
}

export const initialState: State = {
  paidStore: [],
  loading: false,
  success: false,
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
  })),
  on(PaymentStoreActions.startPaymentCreateStore, (state) => ({ ...state, loading: true, success: false, error: null })),
  on(PaymentStoreActions.successPaymentCreateStore, (state) => ({ ...state, loading: false, success: true, error: null })),
  on(PaymentStoreActions.failurePaymentCreateStore, (state, { error }) => ({ ...state, loading: false, success: false, error }))
);
