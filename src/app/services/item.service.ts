import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';
import { ICategory } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private baseUrl = 'http://127.0.0.1:8000/';
  constructor(private http: HttpClient) {}

  addItem(item: Item, storeId: any | null): Observable<any> {
    const url = `${this.baseUrl}stores/${storeId}/items/`;

    const formData = new FormData();

    formData.append('name', item.name);
    formData.append('code', item.code || '');
    formData.append('description', item.description);
    formData.append('cost', item.cost.toString());
    formData.append('price', item.price.toString());
    formData.append('quantity', item.quantity.toString());

    if (item.image) {
      formData.append('image', item.image);
    }

    // Set the headers to 'multipart/form-data'
    const headers = new HttpHeaders({
      Accept: 'application/json', // Optional, specify the desired response type
    });

    console.log('fromservice', formData.get('image'));
    return this.http.post(url, formData, { headers: headers });
  }

  getListItem(storeId: any | null): Observable<any> {
    return this.http.get(`${this.baseUrl}stores/${storeId}/items/`);
  }

  // for staff

  getListItemForStaff(storeId: any | null): Observable<any> {
    return this.http.get(`${this.baseUrl}items/items/${storeId}/staff/`);
  }

  getListItemByCategory(storeId: any | null, cate_id: any | null):Observable<any>{
    return this.http.get(`${this.baseUrl}items/items/${storeId}/${cate_id}/`);
  }
  

  getListCategoryItem(storeId: any | null): Observable<any> {
    return this.http.get(`${this.baseUrl}stores/${storeId}/items/categoryCreate`);
  }

  addCategoryItem(categoryName: ICategory, storeId: any | null): Observable<any> {
    return this.http.post(
      `${this.baseUrl}stores/${storeId}/categories/`,
      categoryName
    );
  }

  updateItem(item: Item): Observable<any> {
    const url = `${this.baseUrl}items/update/${item.id}/`;

    const formData = new FormData();

    formData.append('name', item.name);
    formData.append('code', item.code || '');
    formData.append('description', item.description);
    formData.append('cost', item.cost.toString());
    formData.append('price', item.price.toString());
    formData.append('quantity', item.quantity.toString());  

    if (item.image) {
      formData.append('image', item.image);
    }
    const headers = new HttpHeaders({
      Accept: 'application/json', 
    });

    console.log('fromservice', formData.get('image'));
    return this.http.put(url, formData, { headers: headers });
  }
}

