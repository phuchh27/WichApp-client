import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { registerStaff, startGetStaff } from 'src/app/store/staff/staff.actions';
import * as fromApp from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { Staff,Staffs } from '../../../models/staff.models';
import { ActivatedRoute, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { selectStaff, selectStaffError, selectStaffLoading } from './staff.selectors';


@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css'],
})
export class StaffListComponent implements OnInit {
  createMode : boolean = false;

  showPassC : boolean = false;
  showPass : boolean = false;

  staff$: Observable<Staffs[]> | undefined;
  loading$: Observable<boolean> | undefined;
  error$: Observable<any> | undefined;


  staff: Staff[] = [];
  constructor(private route: ActivatedRoute ,private store:Store<fromApp.AppState>) {}
  
  ngOnInit(): void {
    const currentShopActive = localStorage.getItem('currentShopActive');
    this.store.dispatch(startGetStaff({storeId : currentShopActive}));
    this.staff$ = this.store.select(selectStaff);
    this.loading$ = this.store.select(selectStaffLoading);
    this.error$ = this.store.select(selectStaffError);
  }
  
  onCreate() {
    this.createMode = true;
  }
  onCancel(){
    this.createMode = false;
  }

  onSubmit(form:NgForm){
    if (!form.valid) {
      console.log("form not valid");
      return;
    }
    const newStaff: Staff ={
      email: form.value.email,
      username : form.value.username,
      password : form.value.password,
      phone : form.value.phone,
    }
    console.log(newStaff);
    const currentShopActive = localStorage.getItem('currentShopActive');
    console.log(currentShopActive);
    this.store.dispatch(
      registerStaff({staff:newStaff, storeId : currentShopActive})
    )

  }
  onShowPassC(){this.showPassC = true}
  onHidePassC(){this.showPassC = false}

  onShowPass(){this.showPass = true}
  onHidePass(){this.showPass = false}
}

