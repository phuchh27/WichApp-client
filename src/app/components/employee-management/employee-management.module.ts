import { NgModule } from '@angular/core';
import { EmployeeManagementComponent } from './employee-management.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployeeManagementRoutingModule } from './employee-management.routing.module';

@NgModule({
  declarations: [EmployeeManagementComponent],
  imports: [
    MatExpansionModule,
    CommonModule,
    RouterModule,
    EmployeeManagementRoutingModule,
  ],
  exports: [EmployeeManagementComponent],
})
export class EmployeeManagementModule {}
