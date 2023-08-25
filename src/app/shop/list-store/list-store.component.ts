import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as StoreActions from '../../store/store/store.actions';
import { Observable } from 'rxjs';
import { Store as StoreModel } from '../../models/store.model';

@Component({
  selector: 'app-list-store',
  templateUrl: './list-store.component.html',
  styleUrls: ['./list-store.component.css'],
})
export class ListStoreComponent implements OnInit {

 
  @Output() storeClicked = new EventEmitter<number>();

  onStoreClick(index: number) {
    this.storeClicked.emit(index);
  }
  
  constructor(private store: Store<fromApp.AppState>) {}

  userStores$: Observable<StoreModel[]> | undefined;

  ngOnInit(): void {
    const userStores = localStorage.getItem('userStores');

    if (!userStores) {
      this.store.dispatch(StoreActions.fetchUserStores());
    } else {
      // Dispatch an action to set user stores from local storage
      const parsedStores = JSON.parse(userStores);
      this.store.dispatch(StoreActions.setUserStores({ stores: parsedStores }));
    }
    this.userStores$ = this.store.select(state => state.store.Stores);

  }
}
