import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
 // Replace with your service

import * as CategoryActions from '../category/cactegory.actions';
import { HttpClient } from '@angular/common/http';
import { Category } from 'src/app/models/category.model';


@Injectable()
export class CategoryEffects {
  fetchCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.fetchCategories),
      switchMap(() => {
        return this.http.get<Category[]>(
            'http://127.0.0.1:8000/stores/categories/'
        )
      }),
      map((categories) => {
        return CategoryActions.setCategories({ categories });
      })
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
