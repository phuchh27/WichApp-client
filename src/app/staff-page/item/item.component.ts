import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Store } from '@ngrx/store';
import * as ItemActions from '../../store/item/item.actions';
import * as ItemSelectors from '../../selectors/item.selectors';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Item } from 'src/app/models/item.model';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';

// import { BillService } from '../../services/bill.service';
import { BillItem, Bill, BillData } from 'src/app/models/bill.model';

import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

import * as BillActions from '../../store/bill/bill.actions';
import * as BillSelectors from '../../store/bill/bill.selectors';
import * as fromApp from '../../store/app.reducer';
import { convertToBillData } from 'src/app/services/bill.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  standalone: true,
  imports: [
    MatPaginatorModule,
    CommonModule,
    QRCodeModule,
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class ItemComponent implements OnInit {
  @ViewChild('bill') bill!: ElementRef;

  showOrHidenBillConsole: boolean = false;

  storeId: any;

  isloading: boolean = false;
  issuccess: boolean = false;
  iserror: any = null

  $item: Observable<Item[]> | undefined;
  $loading: Observable<boolean> | undefined;
  $error: Observable<any> | undefined;

  $successbill: Observable<boolean> | undefined;
  $loadingbill: Observable<boolean> | undefined;
  $errorbill: Observable<any> | undefined;

  loadingSubscription: Subscription | undefined;
  successSubscription: Subscription | undefined;
  errorSubscription: Subscription | undefined;

  //paginator page
  itemsPerPage = 5;
  currentPage = 0;
  length: number = 0;
  totalItems = this.length;

  billItem: BillItem = {
    id: 0,
    name: '',
    price: 0,
    quantity: 0,
    total: 0,
  };

  billview: Bill = {
    items: [],
    Total: 0,
  };

  billTotal: number = 0;

  constructor(
    private store: Store<fromApp.AppState>,
    // private billService: BillService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const storedDataString = localStorage.getItem('storeId');
    const storeData = JSON.parse(storedDataString || '{}');
    this.storeId = storeData.store_id;
    console.log(this.storeId);
    this.store.dispatch(
      ItemActions.getItemsForStaffStart({ storeId: this.storeId })
    );

    this.$item = this.store.select(ItemSelectors.selectItem);
    this.$loading = this.store.select(ItemSelectors.selectItemLoading);
    this.$error = this.store.select(ItemSelectors.selectItemError);

    this.$loading = this.store.select(BillSelectors.selectBillLoading);
    this.$successbill = this.store.select(BillSelectors.selectBillSuccess);
    this.$errorbill = this.store.select(BillSelectors.selectBillError);

    this.loadingSubscription = this.$loading.subscribe((loading) => {
      if (loading) {
        console.log('Loading...');
      }
    });

    this.successSubscription = this.$successbill.subscribe((success) => {
      if (success) {
       
        console.log('Success!');
       this.issuccess = true;
        setTimeout(() => {
          this.issuccess = false;
          this.showOrHidenBillConsole = false;
        }, 3000);
      }
    });

    this.errorSubscription = this.$errorbill.subscribe((error) => {
      if (error) {
        console.log(error)
        this.iserror = error;
        setTimeout(() => {
          this.iserror = null;
          this.showOrHidenBillConsole = false;
        }, 3000);
      }
    });

    this.$item?.subscribe((items) => {
      this.length = items.length;
    });
  }

  generateRandomId(): string {
    // Logic to generate a random 6-digit number
    const randomId = Math.floor(100000 + Math.random() * 900000).toString();
    return randomId;
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.itemsPerPage = event.pageSize;
  }

  onAddBill() {
    this.showOrHidenBillConsole = true;

    this.billview = {
      items: [],
      Total: 0,
    };
  }

  calculateTotal() {
    this.billview.Total = this.billview.items.reduce(
      (total, item) => total + Number(item.total),
      0
    );
  }

  onAddToBill(item: Item) {
    // Check if the item is already in the bill
    const existingItem = this.billview.items.find(
      (billItem) => billItem.name === item.name
    );

    if (existingItem) {
      // If the item exists, increase its quantity and total
      existingItem.quantity += 1;
      existingItem.total = existingItem.quantity * existingItem.price;
    } else {
      // If the item does not exist, add it to the bill
      let newBillItem: BillItem = {
        id: item.id ?? 0,
        name: item.name,
        price: item.price,
        quantity: 1,
        total: item.price,
      };
      this.billview.items.push(newBillItem);
    }
    this.calculateTotal();
  }

  onHideAddBill() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        title: 'Confirmation',
        message: 'Are you sure you want to close the bill?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.billview = {
          items: [],
          Total: 0,
        };
        this.showOrHidenBillConsole = false;
        this.billTotal = 0;
      }
    });
  }

  

  onSaveBill() {
    const billDataToSend: BillData = convertToBillData(this.billview);

    // if (billDataToSend) {
    //   // If bills already exist in localStorage, update the existing bills
    //   let bills: Bill[] = JSON.parse(storedBills);
    //   const existingBill = this.billview;

    //   if (existingBill) {
    //     // If the bill already exists, update its details
    //     existingBill.items = this.billview.items;
    //     existingBill.Total = this.billview.Total;
    //   } else {
    //     // If the bill does not exist, add it to the bills array
    //     bills.push(this.billview);
    //   }

    //   // Save the updated bills array back to localStorage
    //   localStorage.setItem('bills', JSON.stringify(bills));
    // } else {
    //   // If no bills exist in localStorage, create a new array with the current bill
    //   localStorage.setItem('bills', JSON.stringify([this.billview]));
    // }

    // Reset the billview after saving
    this.store.dispatch(BillActions.createBill({ payload: billDataToSend }));
    console.log(JSON.stringify(billDataToSend));
    this.resetBill();
  }

  resetBill() {
    this.billview = {
      items: [],
      Total: 0,
    };
  }

  onPrint() {
    const printContents = this.bill.nativeElement.innerHTML;
    const printWindow = window.open('', '_blank');

    printWindow!.document.write(`
      <html>
        <head>
          <link rel="stylesheet" type="text/css" href="./item.component.css">
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);
    printWindow!.document.close();
    printWindow!.print();
  }
}
