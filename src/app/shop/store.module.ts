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
import { ICategoriesReducer } from '../store/Icategory/iCategory.reducer';
import { WorkScheduleComponent } from './shop-detail/work-schedule/work-schedule.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HistoryOrdersComponent } from './shop-detail/history-orders/history-orders.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    StoreComComponent,
    ListStoreComponent,
    CreateStoreComponent,
    ShopDetailComponent,
    StaffListComponent,
    ItemsListComponent,
    WorkScheduleComponent,
    HistoryOrdersComponent
    
  ],
  imports: [
    RouterModule,
    StoreRoutingModule,
    CarouselModule,
    FormsModule,
    SharedModule,
    CommonModule,
    StoreModule.forFeature('ICategories', ICategoriesReducer),
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule, MatMenuModule
  ],
  exports: [StoreComComponent],
})
export class StoreComModule {}
