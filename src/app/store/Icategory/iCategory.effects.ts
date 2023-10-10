import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ItemService } from 'src/app/services/item.service';
import * as ICategoryActions from './iCategory.actions';
import { ICategory } from 'src/app/models/category.model';

@Injectable()
export class ICategoriesEffects {

    getIcategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ICategoryActions.getICategoryStart),
      switchMap(({storeId }) =>
        this.itemServices.getListCategoryItem(storeId).pipe(
          map((icategories) =>  ICategoryActions.getICategorySuccess({icategories})),
          catchError((error) => of(ICategoryActions.getICategoryFailure({ error })))))
    )
  )
  constructor(private actions$: Actions, private itemServices: ItemService) {}
}
