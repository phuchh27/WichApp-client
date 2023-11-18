import { Component, OnInit } from '@angular/core';
import * as fromApp from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { selectStaff, selectStaffError, selectStaffLoading } from 'src/app/shop/shop-detail/staff-list/staff.selectors';
import { Observable } from 'rxjs';
import { Staffs } from 'src/app/models/staff.models';
import { startGetStaff } from 'src/app/store/staff/staff.actions';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent  implements OnInit  {
  panelOpenState = false;

  constructor(private store:Store<fromApp.AppState>) {}

  staff$: Observable<Staffs[]> | undefined;
  loading$: Observable<boolean> | undefined;
  error$: Observable<any> | undefined;

  ngOnInit(): void {
    const currentShopActive = localStorage.getItem('currentShopActive');
    this.store.dispatch(startGetStaff({storeId : currentShopActive}));
    this.staff$ = this.store.select(selectStaff);
    this.loading$ = this.store.select(selectStaffLoading);
    this.error$ = this.store.select(selectStaffError);
  }
}
