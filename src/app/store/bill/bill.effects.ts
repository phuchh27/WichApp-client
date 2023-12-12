import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as billActions from './bill.actions';
import { BillService } from '../../services/bill.service'; // Điều này là một dịch vụ để gửi request đến server

@Injectable()
export class BillEffects {
  createBill$ = createEffect(() =>
    this.actions$.pipe(
      ofType(billActions.createBill),
      switchMap((action) =>
        this.billService.createBill(action.payload).pipe(
          map(() => billActions.createBillSuccess()),
          catchError((error) => of(billActions.createBillFailure({ error })))
        )
      )
    )
  );

  loadBills$ = createEffect(() =>
    this.actions$.pipe(
      ofType(billActions.loadBills),
      switchMap(() =>
        this.billService.getBills().pipe(
          map((bills) => billActions.loadBillsSuccess({ bills })),
          catchError((error) => of(billActions.loadBillsFailure({ error })))
        )
      )
    )
  );

  loadBillsOwner$ = createEffect(() =>
    this.actions$.pipe(
      ofType(billActions.loadBillsOwner),
      switchMap((action) => {
        const store_id = action.store_id;
        return this.billService.getBillsOwner(store_id).pipe(
          map((billsowner) =>
            billActions.loadBillsOwnerSuccess({ billsowner })
          ),
          catchError((error) =>
            of(billActions.loadBillsOwnerFailure({ error }))
          )
        );
      })
    )
  );

  loadBillsDetailOwner$ = createEffect(() =>
    this.actions$.pipe(
      ofType(billActions.loadBillsDetailOwner),
      switchMap((action) => {
        const bill_id = action.bill_id; 
        return this.billService.getBillsDetailOwner(bill_id).pipe(
          map((billdetailsowner) =>
            billActions.loadBillsDetailOwnerSuccess({ billdetailsowner })
          ),
          catchError((error) =>
            of(billActions.loadBillsDetailOwnerFailure({ error }))
          )
        );
      })
    )
  );

  loadBillDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(billActions.loadBillDetail),
      mergeMap((action) =>
        this.billService.getBillDetail(action.bill_id).pipe(
          map((cartItems) => billActions.loadBillDetailSuccess({ cartItems })),
          catchError((error) =>
            of(billActions.loadBillDetailFailure({ error }))
          )
        )
      )
    )
  );

  saveBill$ = createEffect(() =>
    this.actions$.pipe(
      ofType(billActions.saveBill),
      mergeMap(({ bill_id, billEditing, billtotal }) =>
        this.billService.saveBill(bill_id, billEditing, billtotal).pipe(
          map(() => billActions.saveBillSuccess()),
          catchError((error) => of(billActions.saveBillFailure({ error })))
        )
      )
    )
  );

  deleteBill$ = createEffect(() =>
    this.actions$.pipe(
      ofType(billActions.deleteBill),
      mergeMap(({ bill_id }) =>
        this.billService.deleteBill(bill_id).pipe(
          map(() => billActions.deleteBillSuccess()),
          catchError((error) => of(billActions.deleteBillFailure({ error })))
        )
      )
    )
  );

  payBill$ = createEffect(() =>
    this.actions$.pipe(
      ofType(billActions.payBill),
      mergeMap(({ bill_id }) =>
        this.billService.payBill(bill_id).pipe(
          map(() => billActions.payBillSuccess()),
          catchError((error) => of(billActions.payBillFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private billService: BillService) {}
}
