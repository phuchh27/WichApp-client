import { NgModule } from '@angular/core';
import { PaymentsComponent } from '../payments/payments.component';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';

@NgModule({
  declarations: [PaymentsComponent],
  imports: [CommonModule, SharedRoutingModule],
  exports: [PaymentsComponent],
})
export class SharedModule {}
