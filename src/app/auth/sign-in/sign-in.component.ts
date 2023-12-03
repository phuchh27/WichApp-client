import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from '../store/auth.actions';
import { selectAuthError } from './auth.selectors';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {

  authError$ = this.store.select(selectAuthError);

  errorDetail: any;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.authError$.subscribe((authError) => {
      if (authError && authError.errorMessage) {
        this.errorDetail = authError.errorDetail;
        if (!this.errorDetail) {
          this.errorDetail = 'User not found';
        }
        console.log('Authentication Error Detail:', authError.errorDetail);
      }
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    console.log(email, password);
    this.store.dispatch(AuthActions.loginStart({ email, password }));
    form.reset();
  }
}
