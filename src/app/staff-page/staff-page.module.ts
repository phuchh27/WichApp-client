import { NgModule } from '@angular/core';

import { StaffPageComponent } from './staff-page.component';
import { RouterModule } from '@angular/router';
import { StaffPageRoutingModule } from './staff-page-routing.module';

@NgModule({
  declarations: [StaffPageComponent],
  imports: [RouterModule, StaffPageRoutingModule],
})
export class StaffPageModule {}
