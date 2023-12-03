import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AllStaffs } from '../models/staff.models';

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

  getStoreId(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/get-store/`);
  }

  getAllStaffs(): Observable<any> {
    const url = `${this.baseUrl}/get/staff/owner/`; // Adjust the endpoint URL as needed
    return this.http.get(url);
  }

  updateStaff(staff_id:any, data:AllStaffs): Observable<any> {
    console.log('request',data)
    const url = `${this.baseUrl}/update/${staff_id}/`; 0
    return this.http.put(url, data);
  }

  removeStaff(staff_id:any): Observable<any> {
    const url = `${this.baseUrl}/remove/${staff_id}/`; 0
    return this.http.delete(url);
  }

  checkingStaff(email:string, password:string): Observable<any> {
    const url = `http://127.0.0.1:8000/auth/loginstaff/`;
    return this.http.post(url, {email, password});
  }

  onlineStaff(): Observable<any> {
    const url = `http://127.0.0.1:8000/auth/onlineStaffs`;
    return this.http.get(url);
  }

}
