import { Component } from '@angular/core';
import {
  AbstractControl,
  Form,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  email: string = '';

  constructor(private store: Store<fromApp.AppState>) {}

  onEmailChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.email = inputElement.value;
    console.log('Email changed:', this.email);
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    const username = form.value.username;
    const phone = form.value.phone;
    console.log(email, password, username, phone);
    this.store.dispatch(
      AuthActions.signupStart({
        email: email,
        password: password,
        username: username,
        phone: phone,
      })
    );
    form.reset();
  }
}
