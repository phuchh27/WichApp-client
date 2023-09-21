// staff.selectors.ts

import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from '../../../store/staff/staff.reducer';

export const selectStaffState = createFeatureSelector<State>('staff');

export const selectStaff = createSelector(selectStaffState, (state) => state.staffs);
export const selectStaffLoading = createSelector(selectStaffState, (state) => state.loading);
export const selectStaffError = createSelector(selectStaffState, (state) => state.error);
