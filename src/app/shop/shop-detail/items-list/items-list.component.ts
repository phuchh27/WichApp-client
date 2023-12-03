import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, map, of } from 'rxjs';

import { Item } from 'src/app/models/item.model';

import * as fromApp from 'src/app/store/app.reducer';
import {
  addItemStart,
  addItemsCategoryStart,
  getItemsByCategoryStart,
  getItemsStart,
  updateItemStart,
} from 'src/app/store/item/item.actions';
import {
  getICategoryStart,
  getICategorySuccess,
} from 'src/app/store/Icategory/iCategory.actions';

import * as selectorsItem from '../../../selectors/item.selectors';
import * as selectorsICategory from './icategory.selectors';
import { ICategory } from 'src/app/models/category.model';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css'],
})
export class ItemsListComponent implements OnInit {
  createMode: boolean = false;
  addNewCategory: boolean = false;
  editMode: boolean = false;
  showDetail: boolean = false;

  selectby: any;
  selectmode: boolean = false;

  selectedImage: any | null = null;
  base64String: string | null = null;

  $item: Observable<Item[]> | undefined;
  $loading: Observable<boolean> | undefined;
  $error: Observable<any> | undefined;

  iCategoriesMenu: any | null;

  $icategories: Observable<ICategory[]> | undefined;
  categories: any[] = [];

  subscription: Subscription | undefined;

  itemDetail?: Item;
  itemEdited: Item = new Item(0,0, '', null, '', null, 0, 0, null, null);
  itemcreateCategory!: number; 

  invalidFormmessage: string = '';

  @ViewChild('fileInput') fileInput: any;

  constructor(private store: Store<fromApp.AppState>) {
    const currentShopActive = localStorage.getItem('currentShopActive');
    this.store.dispatch(getICategoryStart({ storeId: currentShopActive }));
    this.$icategories = this.store.select(selectorsICategory.selectICategories);
    this.$icategories.subscribe((categories) => {
      this.categories = categories;
    });
  }

  ngOnInit(): void {
    // const currentShopActive = localStorage.getItem('currentShopActive');
    // if ((!this.selectmode)) {
    //   console.log(this.selectmode)
    //   this.store.dispatch(getItemsStart({ storeId: currentShopActive }));
    // } if ((this.selectmode)) {
    //   this.store.dispatch(
    //     getItemsByCategoryStart({
    //       storeId: currentShopActive,
    //       cate_id: this.selectby,
    //     })
    //   );
    // }
    const currentShopActive = localStorage.getItem('currentShopActive');
    this.store.dispatch(getItemsStart({ storeId: currentShopActive }));
    this.$item = this.store.select(selectorsItem.selectItem);
    this.$loading = this.store.select(selectorsItem.selectItemLoading);
    this.$error = this.store.select(selectorsItem.selectItemError);

    // this.iCategoriesMenu = this.categories;

    console.log(this.categories)

    this.onSubCategories();
  }

  onSubCategories() {
    // setTimeout(() => {
    //   this.iCategoriesMenu = this.categories;
    // }, 300);

    this.iCategoriesMenu = [];
    setTimeout(() => {
      this.categories.forEach((item) => {
        this.iCategoriesMenu.push({
          id: item.id,
          name: item.name,
          store: item.store,
        });
      });

      // Add item at the beginning
      this.iCategoriesMenu.unshift({ id: 0, name: 'All', store: null });

      // Add item at the end
      this.iCategoriesMenu.push({ id: 99, name: 'Create', store: null });
    }, 300);
  }

  onCategorySelected(categoryId: number) {
    const currentShopActive = localStorage.getItem('currentShopActive');

    if (categoryId === 99) {
      this.addNewCategory = true;
      this.createMode = false;
    } else if (categoryId === 0) {
      this.selectmode = false;
      this.store.dispatch(getItemsStart({ storeId: currentShopActive }));
    } else {
      if (this.selectby !== categoryId) {
        this.selectmode = true;
        this.selectby = categoryId;
        this.store.dispatch(
          getItemsByCategoryStart({
            storeId: currentShopActive,
            cate_id: this.selectby,
          })
        );
      }
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
        this.base64String = this.selectedImage;
        // .split(',')[1];
      };
      reader.readAsDataURL(file);
    }
  }

  onCreate() {
    this.createMode = true;
    this.addNewCategory = false;
  }

  onCancel() {
    this.createMode = false;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      this.invalidFormmessage = 'Form invalid. Please check your input and try again!'

      return;
    }

    const newItem: Item = {
      category:  this.itemcreateCategory,
      name: form.value.itemname,
      code: form.value.code,
      description: form.value.description,
      price: form.value.price,
      cost: form.value.cost,
      quantity: form.value.quantity,
      image: this.base64String,
    };
    console.log(newItem);
    this.store.dispatch(
      addItemStart({
        item: newItem,
        storeId: localStorage.getItem('currentShopActive'),
      })
    );
  }

  onCancelAdd() {
    this.addNewCategory = false;
  }

  onOpentDetail(item: Item) {
    this.showDetail = true;
    console.log(item);
    this.itemDetail = item;
  }

  onCloseDetail() {
    this.showDetail = false;
  }

  onEdit() {
    this.editMode = true;
    if (this.itemDetail) {
      this.itemEdited = this.itemDetail;
    } else {
    }
    console.log(this.itemEdited);
  }
  onSave(form: NgForm) {
    this.editMode = false;
    if (!form.valid) {
      console.log('form not valid');
      return;
    }

    const ItemEdted: Item = {
      id: this.itemEdited.id,
      name: form.value.itemname,
      code: form.value.code,
      description: form.value.description,
      price: form.value.price,
      cost: form.value.cost,
      quantity: form.value.quantity,
      image: this.base64String,
    };

    this.store.dispatch(updateItemStart({ item: ItemEdted }));
    console.log(ItemEdted);
  }

  onAddCategoty(form: NgForm) {
    if (!form.valid) {
      console.log('form not valid');
      return;
    }
    const categotyName = form.value.category;
    const currentShopActive = Number(localStorage.getItem('currentShopActive'));

    const newCategory: ICategory = {
      name: categotyName,
      store: Number(currentShopActive),
    };
    this.store.dispatch(
      addItemsCategoryStart({
        category: newCategory,
        storeId: currentShopActive,
      })
    );

    this.addNewCategory = false;

    this.store.dispatch(getICategoryStart({ storeId: String(currentShopActive) }));

  }
}
