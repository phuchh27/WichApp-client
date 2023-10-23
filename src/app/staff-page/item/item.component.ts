import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as ItemActions from '../../store/item/item.actions';
import * as ItemSelectors from '../../selectors/item.selectors';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from 'src/app/models/item.model';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';

// import { BillService } from '../../services/bill.service';
import { BillItem, Bill } from 'src/app/models/bill.model';

import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  standalone: true,
  imports: [MatPaginatorModule, CommonModule, QRCodeModule, MatTableModule],
})
export class ItemComponent implements OnInit {
  @ViewChild('bill') bill!: ElementRef;

  showOrHidenBillConsole: boolean = false;

  storeId: any;

  $item: Observable<Item[]> | undefined;
  $loading: Observable<boolean> | undefined;
  $error: Observable<any> | undefined;

  //paginator page
  itemsPerPage = 5;
  currentPage = 0;
  length: number = 0;
  totalItems = this.length;

  billItem: BillItem = {
    name: '',
    price: 0,
    quantity: 0,
    total: 0,
  };
  billview: Bill = {
    id: '',
    items: [],
    Total: 0,
  };
  billTotal: number = 0;
  billviewSubject = new BehaviorSubject<BillItem[]>([]);
  billview$ = this.billviewSubject.asObservable();

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

    //get length
    this.$item?.subscribe((items) => {
      // Get the length of the array
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
      id: this.generateRandomId(),
      items: [],
      Total: 0,
    };
  }

  calculateTotal() {
    this.billview.Total = this.billview.items.reduce((total, item) => total + Number(item.total), 0);
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
          id: '',
          items: [],
          Total: 0,
        };
        this.showOrHidenBillConsole = false;
        this.billTotal = 0;
      }
    });
  }

  onSaveBill() {
    const storedBills = localStorage.getItem('bills');

    if (storedBills) {
      let bills = JSON.parse(storedBills);

      bills.push(this.billview);

      // Lưu lại danh sách bills đã được cập nhật
      localStorage.setItem('bills', JSON.stringify(bills));
    } else {
      localStorage.setItem('bills', JSON.stringify(this.billview));
    }
    // this.billview = [];
    this.billTotal = 0;
    this.showOrHidenBillConsole = false;
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
