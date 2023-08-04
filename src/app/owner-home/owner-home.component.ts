import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthAction from '../auth/store/auth.actions';
import { AppState } from '../store/app.reducer';


@Component({
  selector: 'app-owner-home',
  templateUrl: './owner-home.component.html',
  styleUrls: ['./owner-home.component.css']
})
export class OwnerHomeComponent implements OnInit  {
  constructor( private store : Store<AppState>){}
  ngOnInit(): void {
    this.store.dispatch(AuthAction.autoLogin())
  }

}
