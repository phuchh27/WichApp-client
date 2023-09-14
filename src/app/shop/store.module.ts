import { NgModule } from '@angular/core';
import { StoreComComponent } from './store-com.component';
import { StoreRoutingModule } from './store-routing.module';
import { CarouselModule } from 'primeng/carousel';
import { ListStoreComponent } from './list-store/list-store.component';
import { CreateStoreComponent } from './create-store/create-store.component';
import { FormsModule } from '@angular/forms';
import { ShopDetailComponent } from './shop-detail/shop-detail.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    StoreComComponent,
    ListStoreComponent,
    CreateStoreComponent,
    ShopDetailComponent,
  ],
  imports: [
    RouterModule,
    StoreRoutingModule,
    CarouselModule,
    FormsModule,
    SharedModule,
  ],
  exports: [StoreComComponent],
})
export class StoreComModule {}
