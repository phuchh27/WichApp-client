import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import * as fromApp from '../../store/app.reducer';
import { AuthService } from '../../auth/auth.service';
import * as AuthActions from '../../auth/store/auth.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;

  username: string ='';
  is_owner: boolean = false;
  is_staff: boolean = false;
  ngOnInit() {
    const userData = JSON.parse(localStorage.getItem('userData')!)
    if(userData){
      this.username = userData.username
      this.is_owner = userData.is_owner
      this.is_staff = userData.is_staff
    }
  }

  constructor(
    private Store: Store<fromApp.AppState>,
    private authService: AuthService
  ) {}

  handleLogout() {
    const refresh = String(this.authService.getRefresh())
    if(!refresh){
      console.log('refresh is null')
      
    }
    this.Store.dispatch(AuthActions.logout({refresh}));
  }
}
