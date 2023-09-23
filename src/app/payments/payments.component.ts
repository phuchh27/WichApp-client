import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as PaymentActions from '../store/payment/payment.actions';
import {Router } from '@angular/router';
import {PaidStoreData } from '../models/store.model';





@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
})
export class PaymentsComponent implements OnInit {
  constructor(
    private store: Store<fromApp.AppState>,
    private router : Router  ) {}

  PaidStoreData: any;

  ngOnInit(): void {
    // ... other code
    this.getPayments();
    
  }

  getPayments() {
    const PaidStoreDataString = localStorage.getItem('store402');
    if (PaidStoreDataString) {
      this.PaidStoreData = JSON.parse(PaidStoreDataString);
    } else {
      // Handle the case when PaidStoreDataString is null (optional)
      this.PaidStoreData = null;
    }
  }

  onCreate() {
    const url = this.router.url;
    const regex = /session_id=%7B([^%]+)%7D/;
    const match = url.match(regex);
    const sessionId = match ? match[1] : null;
    console.log(sessionId)
    
    const storeDataa :PaidStoreData = {
      shopname: this.PaidStoreData.shopname,
      description: this.PaidStoreData.description,
      phone: this.PaidStoreData.phone,
      address: this.PaidStoreData.address,
      category: this.PaidStoreData.category,
      verify_code: sessionId,
    };
    console.log(storeDataa);
    this.store.dispatch(
      PaymentActions.startPaymentCreateStore({
        storeData : storeDataa,
      })
    );
    // this.router.navigate(['/ohome/store']);
  }
}
