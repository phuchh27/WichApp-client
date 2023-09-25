import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  private baseUrl = 'http://127.0.0.1:8000/staff';

  constructor(private http: HttpClient) {}

  registerStaff(staff: any, storeId: string| null): Observable<any> {
    const url = `${this.baseUrl}/${storeId}/staff-register/`;
    return this.http.post(url, staff);
  }

  getStaffs(storeId: string| null): Observable<any> {
    const url = `${this.baseUrl}/${storeId}/`; // Adjust the endpoint URL as needed
    return this.http.get(url);
  }

}
