import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { registerStaff } from 'src/app/store/staff/staff.actions';
import * as fromApp from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { Staff } from '../../../models/staff.models';
import { ActivatedRoute, Route } from '@angular/router';


@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css'],
})
export class StaffListComponent {
  createMode : boolean = false;

  showPassC : boolean = false;
  showPass : boolean = false;

  staff: Staff[] = [];
  constructor(private route: ActivatedRoute ,private store:Store<fromApp.AppState>) {}
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

