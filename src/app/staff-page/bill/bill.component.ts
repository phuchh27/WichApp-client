import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  billList: any[] = [];

  ngOnInit(): void {
    const storedBills = localStorage.getItem('bills');
        if (storedBills) {
            this.billList = JSON.parse(storedBills);
        }
        console.log('All Bills:', this.billList); 
  }


}
