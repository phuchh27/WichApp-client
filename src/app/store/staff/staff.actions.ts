import { createAction, props } from '@ngrx/store';
import { Staff } from '../../models/staff.models';

export const registerStaff = createAction(
  '[Staff] Register Staff',
  props<{ staff: Staff; storeId: string|null }>()
);

export const registrationSuccess = createAction(
    '[Staff] Registration Success',
    props<{ staff: Staff }>()
  );
  
  export const registrationFailure = createAction(
    '[Staff] Registration Failure',
    props<{ error: any }>()
  );
