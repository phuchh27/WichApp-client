import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { onlineStaffs } from 'src/app/models/staff.models';
import { selectStaffError, selectStaffLoading, selectStaffOnline } from 'src/app/shop/shop-detail/staff-list/staff.selectors';
import * as fromApp from 'src/app/store/app.reducer' 
import { staffCheking, startGetAllOnlineStaff } from 'src/app/store/staff/staff.actions';

@Component({
  selector: 'app-staff-home',
  templateUrl: './staff-home.component.html',
  styleUrls: ['./staff-home.component.css']
})
export class StaffHomeComponent implements OnInit {

  message: string = ''
  loading$?: Observable<boolean>;
  error$?: Observable<string>;
  success: boolean =false

  onlineStaffs$: Observable<onlineStaffs[]> | undefined

  constructor(private store: Store<fromApp.AppState>){}

  ngOnInit(): void {
    this.loading$ = this.store.pipe(select(selectStaffLoading));
    this.error$ = this.store.pipe(select(selectStaffError));

    
  }

  onSubmit(form:NgForm){
    if (!form.valid) {
      this.message = 'Invalid form';
      return;
    }

    const mail = form.value.email;
    const pass = form.value.password;
    console.log(mail, pass);
    this.store.dispatch(staffCheking({email: mail , password: pass}))
    this.store.dispatch(startGetAllOnlineStaff())
    this.onlineStaffs$ = this.store.select(selectStaffOnline)
    if(this.onlineStaffs$){
      this.onlineStaffs$.subscribe((data) => {
        if(data){
          localStorage.setItem('onlineStaffs', JSON.stringify(data))
        }
      })
    }
    setTimeout(() => {
      this.success = true;
    }, 5000);
  }

}
