import { NgModule } from '@angular/core';
import { EmployeeManagementComponent } from './employee-management.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployeeManagementRoutingModule } from './employee-management.routing.module';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTooltipModule,TooltipPosition} from '@angular/material/tooltip';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [EmployeeManagementComponent],
  imports: [
    MatExpansionModule,
    CommonModule,
    RouterModule,
    EmployeeManagementRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    SharedModule,
  ],
  exports: [EmployeeManagementComponent],
})
export class EmployeeManagementModule {}
