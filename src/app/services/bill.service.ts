import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BillData, BillItem, Bills, CartItem } from '../models/bill.model';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  

  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  createBill(data: any): Observable<any> {
    console.log('request data: ',data);
    return this.http.post<any>(`${this.apiUrl}/bills/createBill/`, data);
  }

  getBills(): Observable<Bills[]> {
    const url = `${this.apiUrl}/bills/bills/by-store/`;
    return this.http.get<Bills[]>(url);
  }

  getBillDetail(bill_id: string): Observable<CartItem[]> {
    const url = `${this.apiUrl}/bills/bill-detail/${bill_id}/`;
    return this.http.get<CartItem[]>(url);
  }

  saveBill(bill_id: string, billEditing: CartItem[], billtotal: number): Observable<any> {
    const payload = { bill_id, billEditing, billtotal };
    return this.http.post(`${this.apiUrl}/bills/update_bill/`, payload);
  }

  deleteBill(bill_id: string): Observable<any> {
    const url = `${this.apiUrl}/bills/delete_bill/${bill_id}/`;
    return this.http.delete(url);
  }

  payBill(bill_id: string): Observable<any> {
    const url = `${this.apiUrl}/bills/pay_bill/${bill_id}/`;
    return this.http.delete(url);
  }

}

export function convertToBillData(billView: any): BillData {
  const billDetails = billView.items.map((item: BillItem) => ({
    product: {
      id : item.id,
      name: item.name,
      price: item.price,
    },
    quantity: item.quantity,
  }));

  return {
    total_amount: billView.Total.toString(),
    bill_details: billDetails,
  };
}



