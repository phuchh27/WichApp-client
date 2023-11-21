import { createReducer, on } from '@ngrx/store';
import { Store } from 'src/app/models/store.model';
import {
  getStaffFailure,
  getStaffSuccess,
  registerStaff,
  startGetStaff,
  setStoreId,
  startGetAllStaff,
  getStaffAllSuccess,
  getStaffAllFailure,
  updateStaff,
  updateStaffSuccess,
  updateStaffFailure,
  removeStaff,
  removeStaffSuccess,
  removeStaffFailure,
} from './staff.actions';
import { AllStaffs, Staffs } from 'src/app/models/staff.models';

export interface State {
  allStaffs: AllStaffs[];
  staffs: Staffs[];
  loading: boolean;
  error: string | null;
  storeId: string | null;
}
const initialState: State = {
  allStaffs: [],
  staffs: [],
  loading: false,
  error: null,
  storeId: null,
};

export const staffReducer = createReducer(
  initialState,
  on(registerStaff, (state, { staff }) => {
    console.log('Registration request sent:', staff);
    return state;
  }),
  on(startGetStaff, (state) => ({ ...state, loading: true, error: null })),
  on(getStaffSuccess, (state, { staffs }) => ({
    ...state,
    staffs,
    loading: false,
    error: null,
  })),
  on(getStaffFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(setStoreId, (state, { storeId }) => ({ ...state, storeId })),

  on(startGetAllStaff, (state) => ({ ...state, loading: true, error: null })),
  on(getStaffAllSuccess, (state, { allStaffs }) => ({
    ...state,
    allStaffs,
    loading: false,
    error: null,
  })),
  on(getStaffAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(updateStaff, (state) => ({ ...state, loading: true, error: null })),
  on(updateStaffSuccess, (state) => ({
    ...state,
    loading: false,
    error: null,
  })),
  on(updateStaffFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(removeStaff, (state) => ({ ...state, loading: true, error: null })),
  on(removeStaffSuccess, (state) => ({
    ...state,
    loading: false,
    error: null,
  })),
  on(removeStaffFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
