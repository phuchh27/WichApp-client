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

  

  constructor(private actions$: Actions, private itemServices: ItemService) {}
}
