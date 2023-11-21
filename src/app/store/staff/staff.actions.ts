import { createAction, props } from '@ngrx/store';
import { AllStaffs, Staff, Staffs } from '../../models/staff.models';

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


export const startGetAllStaff = createAction(
  '[Staff] Start Get All Staff',
);
export const getStaffAllSuccess = createAction(
  '[Staff] Get Staff All Success',
  props<{ allStaffs: AllStaffs[] }>()
);
export const getStaffAllFailure = createAction(
  '[Staff] Get Staff All Failure',
  props<{ error: any }>()
);

export const updateStaff = createAction(
  '[Staff] Update Staff',
  props<{ staff_id : any ; data: AllStaffs}>()
);

export const updateStaffSuccess = createAction(
  '[Staff] Update Success',
  
);

export const updateStaffFailure = createAction(
  '[Staff] Update Failure',
  props<{ error: any }>()
);

export const removeStaff = createAction(
  '[Staff] Remove Staff',
  props<{ staff_id : any}>()
);

export const removeStaffSuccess = createAction(
  '[Staff] Remove Success',
  
);

export const removeStaffFailure = createAction(
  '[Staff] Remove Failure',
  props<{ error: any }>()
);
