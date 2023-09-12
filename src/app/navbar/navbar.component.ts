import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  showSidebar = true;
  constructor(){}
  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
    console.log(this.showSidebar);
  }

  onlog(){
    console.log("true");
  }
}
