import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';
import { AppState } from '../store/app.reducer';
import { Store } from '@ngrx/store';

import { SocialAuthService } from "@abacritt/angularx-social-login";
import { SocialUser } from "@abacritt/angularx-social-login";
import { socialLoginStart } from './store/auth.actions';

import * as AuthActions  from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit , OnDestroy {
  isOwnerMode = false;
  isStaffMode = false;
  isLoading = false;
  error: string | null = '';

  user?: SocialUser;
  loggedIn?: boolean;

 private storeSub!: Subscription;
  private closeSub!: Subscription;
  
  constructor(private store: Store<AppState>, private authService: SocialAuthService) { }

  ngOnInit() {
    let idToken = ''

    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
    });

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      idToken = user.idToken
      console.log(idToken)
      this.store.dispatch(AuthActions.socialLoginStart({ auth_token: idToken }));
      idToken=''
    });

    
  }

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


  
  
  



  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
