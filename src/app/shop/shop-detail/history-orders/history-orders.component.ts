import { Component, OnInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { BillDetailProductItem, BillsForOwner } from 'src/app/models/bill.model';
import * as fromApp from 'src/app/store/app.reducer';
import * as BillActions from 'src/app/store/bill/bill.actions';
import { Store, select } from '@ngrx/store';
import * as BillSelectors from 'src/app/store/bill/bill.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history-orders',
  templateUrl: './history-orders.component.html',
  styleUrls: ['./history-orders.component.css'],
})
export class HistoryOrdersComponent implements OnInit {
  $listbill: Observable<BillsForOwner[]> | undefined;
  $listbillDetail: Observable<BillDetailProductItem[]> | undefined;
  $loading?: Observable<boolean>;
  $error?: Observable<any>;

  null_data: boolean = false;
  null_data_detail: boolean = false;

  products : any 
  

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    const store_id = Number(localStorage.getItem('currentShopActive'));

    this.store.dispatch(BillActions.loadBillsOwner({ store_id }));

    this.$listbill = this.store.select(BillSelectors.selectBillsOwner);
   
    this.$loading = this.store.select(BillSelectors.selectBillLoading);
    this.$error = this.store.select(BillSelectors.selectBillError);
    console.log('Bills:', this.$listbill);

    this.$listbill.subscribe((bills) => {
      this.null_data = bills.length === 0;
      console.log('Bills:', bills);
    });

    

    this.store.pipe(select(fromApp.selectBillState)).subscribe(state => {
      console.log('NgRx Store State:', state);
    });
  }

  onDetail(bill_id : string){
    console.log(bill_id);
    this.store.dispatch(BillActions.loadBillsDetailOwner({bill_id}));
    this.$listbillDetail = this.store.select(BillSelectors.selectBillsDetailOwner);
    this.$listbillDetail.subscribe((bills) => {
      this.null_data_detail = true;
      console.log('Bills Detail:', bills);
      this.products = bills;
    });
  }
}
