import { Component } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  email: string = ''

  onEmailChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.email = inputElement.value;
    console.log('Email changed:', this.email);
  }
  
  onSubmit(form: NgForm){

  }
}
