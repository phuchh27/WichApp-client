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
import { StaffListComponent } from './shop-detail/staff-list/staff-list.component';
import { ItemsListComponent } from './shop-detail/items-list/items-list.component';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import {ICategoriesReducer} from '../store/Icategory/iCategory.reducer'

@NgModule({
  declarations: [
    StoreComComponent,
    ListStoreComponent,
    CreateStoreComponent,
    ShopDetailComponent,
    StaffListComponent,
    ItemsListComponent,
  ],
  imports: [
    RouterModule,
    StoreRoutingModule,
    CarouselModule,
    FormsModule,
    SharedModule,
    CommonModule,
    StoreModule.forFeature('ICategories', ICategoriesReducer),
  ],
  exports: [StoreComComponent],
})
export class StoreComModule {}
