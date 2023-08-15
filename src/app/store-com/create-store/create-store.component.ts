import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription, map } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import * as fromApp from 'src/app/store/app.reducer';
import * as CactegoryActrions from '../../store/category/cactegory.actions';



@Component({
  selector: 'app-create-store',
  templateUrl: './create-store.component.html',
  styleUrls: ['./create-store.component.css'],
})
export class CreateStoreComponent implements OnInit, OnDestroy {
  categories: Category[] | undefined;
  subscription: Subscription | undefined;


  constructor(private categoryService: CategoryService, private store :Store<fromApp.AppState> ) {}
  ngOnInit(): void {
    this.store.dispatch(CactegoryActrions.fetchCategories())
    this.subscription = this.store.select('category').pipe(map(categoryState=> categoryState.categories)).subscribe((categories : Category[] )=>{
      this.categories = categories;
    })
    console.log(this.categories);
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
