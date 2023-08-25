import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
})
export class PaymentsComponent implements OnInit {
  constructor() {}

  failedStoreData: any;

  ngOnInit(): void {
    // ... other code
    this.getPayments();
  }

  getPayments() {
    const failedStoreDataString = localStorage.getItem('failedStoreData');
    if (failedStoreDataString) {
      this.failedStoreData = JSON.parse(failedStoreDataString);
    }
  }
}
