import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { PaymentsComponent } from './payments/payments.component';

const routes: Routes = [
  {
    path: 'payment',
    component: PaymentsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedRoutingModule {}
