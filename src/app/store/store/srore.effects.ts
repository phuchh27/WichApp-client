import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as StoreActions from './store.actions';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { StoreServices } from '../../services/store.service';

export interface StoreResponseData {
  store_id: number;
  store_name: string;
  store_address: string;
  store_phone: string;
}

@Injectable()
export class StoreEffects {
  $storeCreate = createEffect(() =>
    this.actions$.pipe(
      ofType(StoreActions.CreateStoreStart),
      mergeMap((action) => {
        return this.http
          .post<{ message: string; data: any; payment_link: string ; status: number}>(
            'http://127.0.0.1:8000/stores/create/',
            {
              shopname: action.shopname,
              description: action.description,
              phone: action.phone,
              address: action.address,
              category: action.category,
            }
          )
          .pipe(
            map(response =>{
              const status  = response.status
              if(status ===  402)
              {
                console.log(status)
                const paymentLink = response.payment_link
                return StoreActions.paymentRequired({paymentLink})
              }             
              // localStorage.setItem('status', JSON.stringify(response));
              // console.log(response.payment_link
              //   );
              return StoreActions.createNewStoreSuccess();
            }),
            catchError(error => {
                return of(StoreActions.createNewStoreFailure({ error }));
            })
          );
      })
    )
  );

  

  fetchUserStores$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoreActions.fetchUserStores),
      switchMap(() => {
        return this.storeServices.getUserStores().pipe(
          map(stores => {
            localStorage.setItem('userStores', JSON.stringify(stores));
            return StoreActions.setUserStores({ stores });
          }),
          catchError(error => {
            return of(StoreActions.fetchUserStoresFail({ error: error.message }));
          })
        );
      })
    ))

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private storeServices : StoreServices
  ) {}
}
