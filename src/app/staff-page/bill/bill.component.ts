import { Component, OnInit } from '@angular/core';
import * as BillActions from '../../store/bill/bill.actions';
import * as BillSelectors from '../../store/bill/bill.selectors';
import * as fromApp from '../../store/app.reducer';
import { Store, select } from '@ngrx/store';
import { Observable, first, map, of } from 'rxjs';
import { CartItem, Bills } from 'src/app/models/bill.model';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css'],
  standalone: true,
  imports: [MatFormFieldModule,CommonModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule],
})
export class BillComponent implements OnInit {
  isloading: boolean = false;
  issuccess: boolean = false;
  iserror: any = null;

  $listbill: Observable<Bills[]> | undefined;
  $loading?: Observable<boolean>;
  $error?: Observable<any>;

  $billDetail: Observable<CartItem[]> | undefined;
  billtotal: number = 0;
  billEditing: CartItem[] | null = null;
  keyID: string = '';

  del: boolean = false;
  showDetail: boolean = false;
  onEdit: boolean = false;
  value = '';

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(BillActions.loadBills());

    this.$listbill = this.store.select(BillSelectors.selectBills);
    this.$loading = this.store.select(BillSelectors.selectBillLoading);
    this.$error = this.store.select(BillSelectors.selectBillLoading);
  }

  onDetail(bill_id: any, total_amount: any) {
    this.store.dispatch(BillActions.loadBillDetail({ bill_id }));
    this.billtotal = Number(total_amount);
    this.showDetail = true;
    this.$billDetail = this.store.select(BillSelectors.selectBillDetail);
    if (this.$billDetail) {
      this.$billDetail.subscribe((billDetail) => {
        this.billEditing = billDetail;
      });
    }
    this.keyID = bill_id;
    console.log(this.keyID);
  }

  onCloseDetail() {
    this.showDetail = false;
  }

  onplus(i: number, price: any) {
    if (this.billEditing !== null && i >= 0 && i < this.billEditing.length) {
      const updatedItem: CartItem = {
        ...this.billEditing[i],
        quantity: this.billEditing[i].quantity + 1,
      };
      this.billtotal += Number(price);

      this.billEditing = [
        ...this.billEditing.slice(0, i),
        updatedItem,
        ...this.billEditing.slice(i + 1),
      ];
    }
  }

  ondel(i: number, price: any) {
    if (this.billEditing !== null && i >= 0 && i < this.billEditing.length) {
      const updatedItem: CartItem = {
        ...this.billEditing[i],
        quantity: this.billEditing[i].quantity - 1,
      };
      this.billtotal -= Number(price);
      if (updatedItem.quantity === 0) {
        this.billEditing = [
          ...this.billEditing.slice(0, i),
          ...this.billEditing.slice(i + 1),
        ];
      } else {
        this.billEditing = [
          ...this.billEditing.slice(0, i),
          updatedItem,
          ...this.billEditing.slice(i + 1),
        ];
      }
    }
  }

  onDel() {
    this.del = true;
  }

  onCancelDel() {
    this.del = false;
  }

  onedit() {
    this.onEdit = true;
  }

  onSave() {
    const bill_id = this.keyID.toString();
    const billEditing = this.billEditing || [];
    const billtotal = this.billtotal;

    this.store.dispatch(
      BillActions.saveBill({ bill_id, billEditing, billtotal })
    );

    this.store
      .pipe(select(BillSelectors.selectBills))
      .pipe(
        first(), // Automatically unsubscribes after the first emission
        map((bills) => {
          const updatedBills = bills.map((bill) => {
            if (bill.id === bill_id) {
              return {
                ...bill,
                total_amount: billtotal,
              };
            }
            return bill;
          });
          return updatedBills;
        })
      )
      .subscribe((updatedBills) => {
        this.store.dispatch(
          BillActions.loadBillsSuccess({ bills: updatedBills })
        );
        this.showDetail = false;
      });
  }

  onDelBill(){
    const bill_id = this.keyID.toString();
    this.store.dispatch(
      BillActions.deleteBill({ bill_id})
    );

    this.store
    .pipe(select(BillSelectors.selectBills))
    .pipe(
      first(), 
      map((bills) => {
        const updatedBills = bills.filter((bill) => bill.id !== bill_id);
        return updatedBills;
      })
    )
    .subscribe((updatedBills) => {
      this.store.dispatch(
        BillActions.loadBillsSuccess({ bills: updatedBills })
      );
      this.showDetail = false;
    });

  }
}
