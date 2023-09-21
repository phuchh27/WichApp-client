import { createReducer, on } from '@ngrx/store';
import { Store } from 'src/app/models/store.model';
import {
  getStaffFailure,
  getStaffSuccess,
  registerStaff,
  startGetStaff,
} from './staff.actions';
import { Staffs } from 'src/app/models/staff.models';

export interface State {
  staffs: Staffs[];
  loading: boolean;
  error: string | null;
}
const initialState: State = {
  staffs: [],
  loading: false,
  error: null,
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
  }))
);
