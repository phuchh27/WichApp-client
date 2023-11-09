import { createFeatureSelector, createSelector } from '@ngrx/store';
import {State} from './bill.reducer'
import { State as BillState } from './bill.reducer';

export const selectBillState = createFeatureSelector<State>('bill');




export const selectBillLoading = createSelector(selectBillState, (state) => state.loading);
export const selectBillSuccess = createSelector(selectBillState, (state) => state.success);
export const selectBillError = createSelector(selectBillState, (state) => state.error);

export const selectBills = createSelector(
    selectBillState,
    (state: BillState) => state.bills
)

export const selectBillDetail = createSelector(
    selectBillState,
    (state: BillState) => state.cartItems
)

export const selectBillsLoading = createSelector(
    selectBillState,
    (state: BillState) => state.loading
)


export const selectBillsError = createSelector(
    selectBillState,
    (state: BillState) => state.error
)

