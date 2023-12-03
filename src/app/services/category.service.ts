// src/app/services/category.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../models/category.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


 

  private baseUrl = 'http://127.0.0.1:8000/';
  constructor(private http: HttpClient) {}
  
  private categories: Category[] = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Clothing' },
    { id: 3, name: 'Furniture' },
  ];

  getCategories(): Observable<Category[]> {
    return of(this.categories);
  }

  addcategory(category: any, storeId: number): Observable<any> {
    const url = `${this.baseUrl}/stores/${storeId}/categories/`;
    return this.http.post(url, category);
  }



  
}
