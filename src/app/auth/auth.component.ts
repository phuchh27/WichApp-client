import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';
import { AppState } from '../store/app.reducer';
import { Store } from '@ngrx/store';

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

 private storeSub!: Subscription;
  private closeSub!: Subscription;
  
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
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
