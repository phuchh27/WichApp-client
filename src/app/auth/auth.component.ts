import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isOwnerMode = false;
  isStaffMode = false;
  isLoading = false;
  error: string = '';
  constructor() { }
  onSwitchOWnerMode() {
    this.isOwnerMode = !this.isOwnerMode;
    this.isStaffMode = false;
    console.log(this.isOwnerMode);
  
  }
  onSwitchStaffMode() {
    this.isStaffMode = !this.isStaffMode;
    this.isOwnerMode = false;
    console.log(this.isStaffMode);
  }
}
