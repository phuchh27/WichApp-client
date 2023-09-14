import { RouterModule, Routes } from '@angular/router';
import { StoreComComponent } from './store-com.component';
import { NgModule } from '@angular/core';
import { CreateStoreComponent } from './create-store/create-store.component';
import { ShopDetailComponent } from './shop-detail/shop-detail.component';

const routes: Routes = [
  {
    path: '',
    component: StoreComComponent,
  },
  {
    path: 'create',
    component: CreateStoreComponent,
  },
  {
    path:':id',
    component : ShopDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreRoutingModule {}
