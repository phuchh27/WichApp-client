import { createAction, props } from '@ngrx/store';
import { Bills, CartItem } from 'src/app/models/bill.model';

export const createBill = createAction('[Bill] Create Bill', props<{ payload: any }>());
export const createBillSuccess = createAction('[Bill] Create Bill Success');
export const createBillFailure = createAction('[Bill] Create Bill Failure', props<{ error: any }>());


export const loadBills = createAction('[Bill] Load Bills');
export const loadBillsSuccess = createAction('[Bill] Load Bills Success', props<{ bills: Bills[] }>());
export const loadBillsFailure = createAction('[Bill] Load Bills Failure', props<{ error: any }>());

export const loadBillDetail = createAction('[Bill] Load Bill Detail', props<{ bill_id: string }>());
export const loadBillDetailSuccess = createAction('[Bill] Load Bill Detail Success', props<{ cartItems: CartItem[] }>());
export const loadBillDetailFailure = createAction('[Bill] Load Bill Detail Failure', props<{ error: any }>());

export const saveBill = createAction(
    '[Bill] Save Bill',
    props<{ bill_id: string; billEditing: CartItem[]; billtotal: number }>()
  );
  
  export const saveBillSuccess = createAction('[Bill] Save Bill Success');
  export const saveBillFailure = createAction('[Bill] Save Bill Failure', props<{ error: any }>());

  export const deleteBill = createAction(
    '[Bill] Delete Bill',
    props<{ bill_id: string;}>()
  );
  
  export const deleteBillSuccess = createAction('[Bill] Delete Bill Success');
  export const deleteBillFailure = createAction('[Bill] Delete Bill Failure', props<{ error: any }>());

  export const payBill = createAction(
    '[Bill] Pay Bill',
    props<{ bill_id: string;}>()
  );
  
  export const payBillSuccess = createAction('[Bill] Pay Bill Success');
  export const payBillFailure = createAction('[Bill] Pay Bill Failure', props<{ error: any }>());