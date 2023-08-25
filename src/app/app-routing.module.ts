import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PaymentsComponent } from './payments/payments.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'ohome',
    loadChildren:()=> import('./owner-home/ohome.module').then(m =>m.OwnerHomeModule)
  },
  {
    path: '',
    loadChildren: () => import('./layouts/intro/intro.module').then(m => m.IntroModule)
  }
  ,{
    path:'payment',
    component:PaymentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
