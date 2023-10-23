import { NgModule } from '@angular/core';

import { StaffPageComponent } from './staff-page.component';
import { RouterModule } from '@angular/router';
import { StaffPageRoutingModule } from './staff-page-routing.module';
import { ItemComponent } from './item/item.component';
import { BillComponent } from './bill/bill.component';
import { WorkScheduleComponent } from './work-schedule/work-schedule.component';
import { CommonModule } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';
import { SharedModule } from '../shared/shared.module';


// import { ItemsModule } from './item/item.module';

@NgModule({
  declarations: [StaffPageComponent,BillComponent, WorkScheduleComponent],
  imports: [RouterModule,CommonModule, StaffPageRoutingModule, ItemComponent,QRCodeModule,SharedModule],
})
export class StaffPageModule {}
