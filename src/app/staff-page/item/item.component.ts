import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as ItemActions from '../../store/item/item.actions';
import * as ItemSelectors from '../../selectors/item.selectors';
import { Observable } from 'rxjs';
import { Item } from 'src/app/models/item.model';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  standalone: true,
  imports: [MatPaginatorModule, CommonModule, QRCodeModule],
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

  constructor(private store: Store<fromApp.AppState>) {}

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

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.itemsPerPage = event.pageSize;
  }

  onAddBill() {
    this.showOrHidenBillConsole = true;
  }

  onHideAddBill() {
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
