import { Component } from '@angular/core';
import { Store as StoreData } from '../models/store.model';


@Component({
  selector: 'app-store-com',
  templateUrl: './store-com.component.html',
  styleUrls: ['./store-com.component.css']
})
export class StoreComComponent {
  userStores: StoreData[] = JSON.parse(localStorage.getItem('userStores') || '[]');
  selectedStoreIndex: number | undefined;
  selectedStore: StoreData | undefined;

  onStoreClicked(index: number) {
    this.selectedStoreIndex = index;
    console.log(this.selectedStoreIndex);
    this.selectedStore = this.userStores[this.selectedStoreIndex];
  
  }
}
