import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Item } from 'src/app/models/item.model';
import * as fromApp from 'src/app/store/app.reducer';
import { addItemStart, getItemsStart } from 'src/app/store/item/item.actions';
import * as selectorsItem from './item.selectors'

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css'],
})
export class ItemsListComponent implements OnInit {
  createMode: boolean = false;

  selectedImage: any | null = null;
  base64String: string | null = null;

  $item: Observable<Item[]> | undefined;
  $loading: Observable<boolean> | undefined;
  $error: Observable<any> | undefined;

  @ViewChild('fileInput') fileInput: any;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    const currentShopActive = localStorage.getItem('currentShopActive');
    this.store.dispatch(getItemsStart({storeId: currentShopActive}));
    this.$item = this.store.select(selectorsItem.selectItem);
    this.$loading = this.store.select(selectorsItem.selectItemLoading);
    this.$error = this.store.select(selectorsItem.selectItemError);
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
  }

  onCancel() {
    this.createMode = false;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      console.log('form not valid');
      return;
    }

    const newItem: Item = {
      name: form.value.itemname,
      code: form.value.code,
      description: form.value.description,
      price: form.value.price,
      cost: form.value.cost,
      quantity: form.value.quantity,
      image: this.base64String,
    };
    // console.log(newItem);
    this.store.dispatch(
      addItemStart({
        item: newItem,
        storeId: localStorage.getItem('currentShopActive'),
      })
    );
  }
}
