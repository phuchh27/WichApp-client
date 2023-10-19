import { createAction, props } from '@ngrx/store';
import { Staff, Staffs } from '../../models/staff.models';

export const registerStaff = createAction(
  '[Staff] Register Staff',
  props<{ staff: Staff; storeId: string | null }>()
);

export const registrationSuccess = createAction(
  '[Staff] Registration Success',
  props<{ staff: Staff }>()
);

export const registrationFailure = createAction(
  '[Staff] Registration Failure',
  props<{ error: any }>()
);

export const startGetStaff = createAction(
  '[Staff] Start Get Staff',
  props<{ storeId: string | null }>()
);
export const getStaffSuccess = createAction(
  '[Staff] Get Staff Success',
  props<{ staffs: Staffs[] }>()
);
export const getStaffFailure = createAction(
  '[Staff] Get Staff Failure',
  props<{ error: any }>()
);
export const getStoreId = createAction('[Store] Get Store ID');
export const setStoreId = createAction(
  '[Store] Set Store ID',
  props<{ storeId: string }>()
);
