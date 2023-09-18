import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css'],
})
export class StaffListComponent {
  createMode : boolean = false;

  showPassC : boolean = false;
  showPass : boolean = false;

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
    const username: string = form.value.username;
    const email: string = form.value.email;
    const phone: string = form.value.phone;
    const password: string = form.value.password;
    const repassword: string = form.value.repassword;

  }
  onShowPassC(){this.showPassC = true}
  onHidePassC(){this.showPassC = false}

  onShowPass(){this.showPass = true}
  onHidePass(){this.showPass = false}
}

