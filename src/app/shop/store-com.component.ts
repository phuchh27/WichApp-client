import { Component } from '@angular/core';
import { Store as StoreData } from '../models/store.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-store-com',
  templateUrl: './store-com.component.html',
  styleUrls: ['./store-com.component.css']
})
export class StoreComComponent {
  userStores: StoreData[] = JSON.parse(localStorage.getItem('userStores') || '[]');
  selectedStoreIndex: number | undefined;
  selectedStore: StoreData | undefined;

  constructor(private router: Router) {}

  onStoreClicked(index: number) {
    this.selectedStoreIndex = index;
    console.log(this.selectedStoreIndex);
    this.selectedStore = this.userStores[this.selectedStoreIndex];
  }

  goToShop(){
    const id = this.selectedStore?.id;
    this.router.navigate(['/ohome/store',id]);
  }
}
