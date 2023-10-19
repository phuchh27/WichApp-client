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
            
            

            localStorage.setItem('storeId', JSON.stringify(result))

            
            return StaffActions.setStoreId({ storeId: result });
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private staffService: StaffService // Inject the service for making HTTP requests
  ) {}
}
