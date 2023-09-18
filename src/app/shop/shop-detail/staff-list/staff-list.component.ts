import { Component } from '@angular/core';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css'],
})
export class StaffListComponent {
  createMode : boolean = false;
  onCreate() {
    this.createMode = true;
  }
  onCancel(){
    this.createMode = false;
  }
}
