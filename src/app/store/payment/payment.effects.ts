import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PaymentStoreActions from './payment.actions';
import { tap, catchError, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PaymentServices } from 'src/app/services/payment.service';

@Injectable()
export class PaymentEffects {
  $paymentRequired = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentStoreActions.PaymentRequired),
      map((action) => {
        return PaymentStoreActions.PaymentRequired({
          title: 'Pay for new store',
          cost: '20$', // Replace with dynamic data if needed
        });
      })
    )
  );

  $simulatePayment = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PaymentStoreActions.PaymentRequired),
        tap((action) => {
          // Simulate payment process using an HTTP request
          this.http.post('your-payment-api-url', {}).subscribe(
            () => {
              // Simulate success
              this.router.navigate(['/payment-success']); // Navigate to success page
            },
            (error) => {
              // Simulate failure
              this.router.navigate(['/payment-failure']); // Navigate to failure page
            }
          );
        })
      ),
    { dispatch: false }
  );
  $PaidStore = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentStoreActions.PaidStore),
      switchMap(({ store }) =>
        this.paymentService.PaidStore(store).pipe(
          map(
            () => PaymentStoreActions.PaidStoreSuccess(),
            localStorage.removeItem('store402')
          ),
          catchError((error) =>
            of(PaymentStoreActions.PaidStoreFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private http: HttpClient,
    private paymentService: PaymentServices
  ) {}
}
