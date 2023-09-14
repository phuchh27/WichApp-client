import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription, map } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import * as fromApp from 'src/app/store/app.reducer';
import * as CactegoryActrions from '../../store/category/cactegory.actions';
import * as StoreActions from '../../store/store/store.actions';
import { selectPaymentLink } from '../shop.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-store',
  templateUrl: './create-store.component.html',
  styleUrls: ['./create-store.component.css'],
})
export class CreateStoreComponent implements OnInit, OnDestroy {
  categories: Category[] | undefined;
  subscription: Subscription | undefined;

  subscriptionPayment: Subscription | undefined;
  paymentRequired$: Observable<boolean> | undefined;
  paymentLink$ = this.store.select(selectPaymentLink);

  constructor(
    private categoryService: CategoryService,
    private store: Store<fromApp.AppState>,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.store.dispatch(CactegoryActrions.fetchCategories());
    this.subscription = this.store
      .select('category')
      .pipe(map((categoryState) => categoryState.categories))
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });

    // this.paymentRequired$ = this.store.select(selectPaymentRequired);
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const shopname: string = form.value.shopname;
    const description = form.value.description;
    const phone = form.value.phone;
    const address = form.value.address;
    const category = form.value.category;
    this.store.dispatch(
      StoreActions.CreateStoreStart({
        shopname: shopname,
        description: description,
        address: address,
        phone: phone,
        category: category,
      })
    );
    // form.resetForm();
    this.subscriptionPayment = this.paymentLink$.subscribe((paymentLink) => {
      if (paymentLink) {
        const storeData = {
          shopname: shopname,
          description: description,
          address: address,
          phone: phone,
          category: category,
        };
        localStorage.setItem('store402', JSON.stringify(storeData));
        console.log('Payment Link: log from component', paymentLink);
        window.location.href = paymentLink; // Navigate to payment page
      }
    });
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscriptionPayment?.unsubscribe();
  }
}
