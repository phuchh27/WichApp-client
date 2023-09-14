import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '../models/store.model';

@Injectable({
  providedIn: 'root'
})
export class StoreServices {
  private apiUrl = 'http://127.0.0.1:8000'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getUserStores(): Observable<Store[]> {
    return this.http.get<Store[]>(`${this.apiUrl}/stores/`);
  }
}
