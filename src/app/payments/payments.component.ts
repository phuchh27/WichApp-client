import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import * as PaymentActions from '../store/payment/payment.actions';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
})
export class PaymentsComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>) {}

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
    const session_id = window.location.href.split('Session_id=')[1];
    const storeData = {
      shopname: this.PaidStoreData.shopname,
      description: this.PaidStoreData.description,
      address: this.PaidStoreData.address,
      phone: this.PaidStoreData.phone,
      category: this.PaidStoreData.category,
      verify_code: session_id,
    };
    this.store.dispatch(
      PaymentActions.PaidStore({
        store : storeData,
      })
    );
  }
}
