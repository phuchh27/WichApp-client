import { createReducer, on } from '@ngrx/store';
import * as billActions from './bill.actions';
import { Bill, Bills,CartItem } from '../../models/bill.model';

export interface State {
  bills: Bills[];
  bill: Bill[];
  bill_id?: string;
  billtotal?: number;
  cartItems:CartItem[];
  loading: boolean;
  success: boolean;
  error: any;
}

export const initialState: State = {
  bills: [],
  bill: [],
  bill_id: '',
  billtotal: 0,
  cartItems:[],
  loading: false,
  success: false,
  error: null,
};

export const billReducer = createReducer(
  initialState,
  on(billActions.createBill, (state) => ({
    ...state,
    loading: true,
    success: false,
    error: null,
  })),
  on(billActions.createBillSuccess, (state) => ({
    ...state,
    loading: false,
    success: true,
  })),
  on(billActions.createBillFailure, (state, { error }) => ({
    ...state,
    loading: false,
    success: false,
    error,
  })),

  on(billActions.loadBills, (state) => ({
    ...state,
    loading: true,
    success: false,
    error: null,
  })),
  on(billActions.loadBillsSuccess, (state, { bills }) => ({
    ...state,
    bills,
    loading: false,
    error: null,
  })),
  on(billActions.loadBillsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  on(billActions.loadBillDetail, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(billActions.loadBillDetailSuccess, (state, { cartItems }) => ({
    ...state,
    cartItems,
    loading: false,
    error: null,
  })),
  on(billActions.loadBillDetailFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(billActions.saveBill, (state, { bill_id, billEditing, billtotal }) => {
    return {
      ...state,
      bill_id,
      billtotal,
      loading: true,
      error: null,
    };
  }),
  on(billActions.saveBillSuccess, (state) => {
    return {
      ...state,
      loading: false,
      error: null,
    };
  }),
  on(billActions.saveBillFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error,
    };
  }),

  on(billActions.deleteBill, (state, { bill_id}) => {
    return {
      ...state,
      bill_id,
      loading: true,
      error: null,
    };
  }),
  on(billActions.deleteBillSuccess, (state) => {
    return {
      ...state,
      loading: false,
      error: null,
    };
  }),
  on(billActions.deleteBillFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error,
    };
  })
);
