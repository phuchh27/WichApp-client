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
  staffCheking,
  staffChekingSuccess,
  staffChekingFail,
  startGetAllOnlineStaff,
  getStaffAllOnlineSuccess,
  getStaffAllOnlineFailure,
} from './staff.actions';
import { AllStaffs, Staffs, onlineStaffs } from 'src/app/models/staff.models';

export interface State {
  allStaffs: AllStaffs[];
  staffs: Staffs[];
  loading: boolean;
  error: string | null;
  storeId: string | null;
  onlineStaffs: onlineStaffs[];
}
const initialState: State = {
  allStaffs: [],
  staffs: [],
  loading: false,
  error: null,
  storeId: null,
  onlineStaffs: [],
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

  on(staffCheking, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(staffChekingSuccess, (state) => ({
    ...state,
    loading: false,
    error: null,
  })),
  on(staffChekingFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(startGetAllOnlineStaff, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(getStaffAllOnlineSuccess, (state, { onlineStaffs }) => ({
    ...state,
    onlineStaffs,
    loading: false,
    error: null,
  })),
  on(getStaffAllOnlineFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
