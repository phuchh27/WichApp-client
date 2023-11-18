import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as ItemActions from './item.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { ItemService } from '../../services/item.service';

@Injectable()
export class ItemEffects {
  addItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.addItemStart),
      switchMap(({ item, storeId }) =>
        this.itemServices.addItem(item, storeId).pipe(
          map(() => {
            return ItemActions.addItemSuccess({ item });
          }),
          catchError((error) => {
            return of(ItemActions.addItemFailure({ error }));
          })
        )
      )
    )
  );

  getListItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.getItemsStart),
      switchMap(({ storeId }) =>
        this.itemServices.getListItem(storeId).pipe(
          map((items) => ItemActions.getItemsSuccess({ items })),
          catchError((error) => of(ItemActions.getItemsFailure({ error })))
        )
      )
    )
  );

  getListItemForStaff$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.getItemsForStaffStart),
      switchMap(({ storeId }) =>
        this.itemServices.getListItemForStaff(storeId).pipe(
          map((items) => ItemActions.getItemsForStaffSuccess({ items })),
          catchError((error) =>
            of(ItemActions.getItemsForStaffFailure({ error }))
          )
        )
      )
    )
  );

  getListItemByCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.getItemsByCategoryStart),
      switchMap(({ storeId, cate_id }) =>
        this.itemServices.getListItemByCategory(storeId, cate_id).pipe(
          map((items) => ItemActions.getItemsByCategorySuccess({ items })),
          catchError((error) =>
            of(ItemActions.getItemsByCategoryFailure({ error }))
          )
        )
      )
    )
  );

  updateItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.updateItemStart),
      switchMap(({ item }) =>
        this.itemServices.updateItem(item).pipe(
          map(() => ItemActions.updateItemSuccess()),
          catchError((error) => of(ItemActions.updateItemFailure({ error })))
        )
      )
    )
  );

  addCategory$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ItemActions.addItemsCategoryStart),
    switchMap(({ storeId ,category }) =>
      this.itemServices.addCategoryItem(category,storeId).pipe(
        map(() => ItemActions.addItemsCategorySuccess()),
        catchError((error) => of(ItemActions.addItemsCategoryFailure({ error })))
      )
    )
  )
);


  constructor(private actions$: Actions, private itemServices: ItemService) {}
}
