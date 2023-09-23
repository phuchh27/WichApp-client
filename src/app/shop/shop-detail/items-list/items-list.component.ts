import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent {

  createMode : boolean = false;


  onCreate() {
    this.createMode = true;
  }

  onCancel() {
    this.createMode = false;
  }

  onSubmit(from: NgForm){

  }

}
