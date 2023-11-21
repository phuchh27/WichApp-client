import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as fromApp from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import {
  selectAllStaff,
  selectStaff,
  selectStaffError,
  selectStaffLoading,
} from 'src/app/shop/shop-detail/staff-list/staff.selectors';
import { Observable } from 'rxjs';
import { AllStaffs, Staffs } from 'src/app/models/staff.models';
import {
  removeStaff,
  startGetAllStaff,
  startGetStaff,
  updateStaff,
} from 'src/app/store/staff/staff.actions';
import { NgForm } from '@angular/forms';

import { TooltipPosition } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css'],
})
export class EmployeeManagementComponent implements OnInit {
  panelOpenState = false;

  editMode: boolean = false;

  positionOptions: TooltipPosition[] = ['left'];
  position = this.positionOptions[0];

  constructor(
    private store: Store<fromApp.AppState>,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  allStaff$: Observable<AllStaffs[]> | undefined;
  loading$: Observable<boolean> | undefined;
  error$: Observable<any> | undefined;

  editingStaff: AllStaffs = new AllStaffs(
    0,
    '',
    '',
    '',
    '',
    '',
    false,
    false,
    ''
  );

  ngOnInit(): void {
    this.store.dispatch(startGetAllStaff());
    this.allStaff$ = this.store.select(selectAllStaff);
    this.loading$ = this.store.select(selectStaffLoading);
    this.error$ = this.store.select(selectStaffError);
  }

  generateRandomColor(): string {
    try {
      this.cdr.detach();
      const red = Math.floor(Math.random() * 256);
      const green = Math.floor(Math.random() * 256);
      const blue = Math.floor(Math.random() * 256);
      const hexColor = `#${red.toString(16)}${green.toString(
        16
      )}${blue.toString(16)}`;

      this.cdr.reattach();

      return hexColor;
    } catch {
      return '#e01c3e';
    }
  }

  onEditStaff(staffMember: AllStaffs) {
    this.editMode = true;
    this.editingStaff = staffMember;
    console.log(this.editingStaff);
  }

  onSaveChange(form: NgForm) {
    if (!form.valid) {
      console.log('form not valid');
      return;
    }

    const EditedStaff = {
      username: form.value.username,
      email: form.value.email,
      address: form.value.address,
      phone: form.value.phone,
      fullname: form.value.fullname,
      is_active: form.value.is_active,
    };

    if (!this.isEditedStaffEqual(EditedStaff, this.editingStaff)) {
      this.store.dispatch(
        updateStaff({ staff_id: this.editingStaff.id, data: EditedStaff })
      );
    }
    this.store.dispatch(startGetAllStaff());

    this.editMode = false;
  }

  isEditedStaffEqual(editedStaff: any, originalStaff: AllStaffs): boolean {
    return (
      editedStaff.username === originalStaff.username &&
      editedStaff.email === originalStaff.email &&
      editedStaff.address === originalStaff.address &&
      editedStaff.phone === originalStaff.phone &&
      editedStaff.fullname === originalStaff.fullname &&
      editedStaff.is_active === originalStaff.is_active
    );
  }

  onRemoveStaff() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirmation Remove Staff',
        message: 'Are you sure you want delete this staff',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(removeStaff({staff_id: this.editingStaff.id}))
        this.store.dispatch(startGetAllStaff());
        this.editMode = false;
      }
    });
  }
}
