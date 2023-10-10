import { RouterModule, Routes } from '@angular/router';
import { StoreComComponent } from './store-com.component';
import { NgModule } from '@angular/core';
import { CreateStoreComponent } from './create-store/create-store.component';
import { ShopDetailComponent } from './shop-detail/shop-detail.component';
import { StaffListComponent } from './shop-detail/staff-list/staff-list.component';
import { ItemsListComponent } from './shop-detail/items-list/items-list.component';
import { WorkScheduleComponent } from './shop-detail/work-schedule/work-schedule.component';

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
    component : ShopDetailComponent,
    children : [
      {
        path: 'staffs',
        component : StaffListComponent
      },
      {
        path: 'items',
        component : ItemsListComponent
      },
      {
        path:'workschedule',
        component: WorkScheduleComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreRoutingModule {}
