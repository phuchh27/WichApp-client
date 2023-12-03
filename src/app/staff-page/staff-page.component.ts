import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { WebsocketService } from '../services/websocket.service';
import { Store, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as StaffActions from '../store/staff/staff.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-staff-page',
  templateUrl: './staff-page.component.html',
  styleUrls: ['./staff-page.component.css'],
})
export class StaffPageComponent implements OnInit {
  loading: boolean = true;

  checkStaff: boolean | undefined;

  message: string = '';
  messages: string[] = [];

  storeId$: Observable<string | null> | undefined;
  storeId: string | null = null;
  items: any[] = [];

  menuItems: any;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) // private websocketService: WebsocketService
  {
    const selectStoreState = createFeatureSelector<fromApp.AppState>('staff');
    const selectStoreId = createSelector(
      selectStoreState,
      (state) => state.staff?.storeId
    );
    this.storeId$ = this.store.select(selectStoreId);
  }

  ngOnInit() {
    const userdata = localStorage.getItem('userData');

    //check role
    if (userdata) {
      const getstaff = JSON.parse(userdata);
      this.checkStaff = getstaff.is_staff;
    }

    this.menuItems = [
      { label: 'Back', link: `/staff-page` },
      { label: 'Bills', link: `/staff-page/bills` },
      { label: 'Items', link: `/staff-page/items` },
      { label: 'Work schedule', link: `/staff-page` },
    ];

    if (this.checkStaff) {
      console.log('isStaff');
    } else {
      this.router.navigate(['/not-found']);
    }

    this.store.dispatch(StaffActions.getStoreId());

    const storedDataString = localStorage.getItem('storeId');
    const storeData = JSON.parse(storedDataString || '{}');
    this.storeId = storeData.store_id;

    // if (this.storeId) {
    //   this.websocketService.sendStoreId(this.storeId);
    //   this.websocketService.getItems().subscribe((data: any) => {
    //     console.log('Received items:', data);
    //     this.items = data.items; // Adjust based on your data structure
    //   });
    // } else {
    //   console.error('store_id is null. Cannot send to the WebSocket.');
    // }

    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
  shouldShowStaffHome(): boolean {
    const firstPath = this.activatedRoute.snapshot.url[0]?.path;
    return firstPath === '';
  }
}
