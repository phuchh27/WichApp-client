import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { PaidStoreData } from "../models/store.model";

@Injectable({
    providedIn: 'root'
  })
  export class PaymentServices {
    private apiUrl = 'http://127.0.0.1:8000'; // Replace with your API URL
  
    constructor(private http: HttpClient) {}
  
    PaidStore( store : PaidStoreData): Observable<void> {
      return this.http.post<void>(`${this.apiUrl}/stores/paymentcreatestore/`,store );
    }
  }