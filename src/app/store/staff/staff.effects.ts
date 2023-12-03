import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { StaffService } from '../../services/staff.service'; // Create a service for making HTTP requests
import * as StaffActions from './staff.actions';

@Injectable()
export class StaffEffects {
  registerStaff$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StaffActions.registerStaff),
      switchMap(({ staff, storeId }) =>
        this.staffService.registerStaff(staff, storeId).pipe(
          map(() => {
            console.log('Registration successful');
            return StaffActions.registrationSuccess({ staff: staff }); // Dispatch a success action if needed
          }),
          catchError((error) => {
            console.error('Registration failed', error);
            return of(StaffActions.registrationFailure({ error })); // Dispatch a failure action if needed
          })
        )
      )
    )
  );

  getStaffs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StaffActions.startGetStaff),
      switchMap(({ storeId }) =>
        this.staffService.getStaffs(storeId).pipe(
          map((staffs) => StaffActions.getStaffSuccess({ staffs })),
          catchError((error) => of(StaffActions.getStaffFailure({ error })))
        )
      )
    )
  );

  getStoreId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StaffActions.getStoreId),
      mergeMap(() =>
        this.staffService.getStoreId().pipe(
          map((result) => {
            console.log('Received storeId:', result);

            localStorage.setItem('storeId', JSON.stringify(result));

            return StaffActions.setStoreId({ storeId: result });
          })
        )
      )
    )
  );

  getAllStaffs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StaffActions.startGetAllStaff),
      switchMap(() =>
        this.staffService.getAllStaffs().pipe(
          map((allStaffs) => StaffActions.getStaffAllSuccess({ allStaffs })),
          catchError((error) => of(StaffActions.getStaffAllFailure({ error })))
        )
      )
    )
  );

  updateStaff$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StaffActions.updateStaff),
      switchMap(({ staff_id, data }) =>
        this.staffService.updateStaff(staff_id, data).pipe(
          map(() => StaffActions.updateStaffSuccess()),
          catchError((error) => of(StaffActions.updateStaffFailure({ error })))
        )
      )
    )
  );

  removeStaff$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StaffActions.removeStaff),
      switchMap(({ staff_id }) =>
        this.staffService.removeStaff(staff_id).pipe(
          map(() => StaffActions.removeStaffSuccess()),
          catchError((error) => of(StaffActions.removeStaffFailure({ error })))
        )
      )
    )
  );

  checkingStaff$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StaffActions.staffCheking),
      switchMap(({ email, password }) =>
        this.staffService.checkingStaff(email, password).pipe(
          map((resData) => StaffActions.staffChekingSuccess()),
          catchError((error) => of(StaffActions.staffChekingFail({ error })))
        )
      )
    )
  );

  getAllOnlineStaffs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StaffActions.startGetAllOnlineStaff),
      switchMap(() =>
        this.staffService.onlineStaff().pipe(
          map((onlineStaffs) => StaffActions.getStaffAllOnlineSuccess({ onlineStaffs })),
          catchError((error) => of(StaffActions.getStaffAllOnlineFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private staffService: StaffService // Inject the service for making HTTP requests
  ) {}
}
