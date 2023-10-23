import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Bill, BillItem } from '../models/bill.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class BillService {
//   private billItemsSubject = new BehaviorSubject<BillItem[]>([]);
//   billItems$ = this.billItemsSubject.asObservable();

//   private currentItems: BillItem[] = [];

//   constructor() {}

  //   createBill() {
  //     const newBill: Bill = {
  //       id: generateRandomId(10),
  //       items: [],
  //       Total: 0,
  //     };
  //     this.billSubject.next(newBill);
  //   }

//   addItemToBill(item: BillItem) {
//     const existingItem = this.currentItems.find(
//       (billItem) => billItem.name === item.name
//     );

//     if (existingItem) {
//       existingItem.quantity += 1;
//     } else {
//       const newBillItem: BillItem = {
//         name: item.name,
//         price: item.price,
//         quantity: 1,
//       };
//       this.currentItems.push(newBillItem);
//       this.billItemsSubject.next([...this.currentItems]);
//     }
//   }
// }

// function generateRandomId(length: number): string {
//   const characters =
//     'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   let result = '';

//   for (let i = 0; i < length; i++) {
//     const randomIndex = Math.floor(Math.random() * characters.length);
//     result += characters.charAt(randomIndex);
//   }

//   return result;
// }
