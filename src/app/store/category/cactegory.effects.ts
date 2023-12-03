import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
 // Replace with your service

import * as CategoryActions from '../category/cactegory.actions';
import { HttpClient } from '@angular/common/http';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';


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

  addCategory$ = createEffect(() =>
  this.actions$.pipe(
    ofType(CategoryActions.createCategories),
    switchMap(({ category, storeId }) =>
      this.categoryService.addcategory(category, storeId).pipe(
        map(() => CategoryActions.createCategoriesSuccess()),
        catchError((error) => of(CategoryActions.createCategoriesFail({ error })))
      )
    )
  )
);


  

  constructor(private actions$: Actions, private http: HttpClient, private categoryService : CategoryService) {}
}
