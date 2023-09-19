import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
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

  constructor(
    private actions$: Actions,
    private staffService: StaffService // Inject the service for making HTTP requests
  
  ) {}
}
