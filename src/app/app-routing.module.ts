import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PaymentsComponent } from './payments/payments.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'ohome',
    data: { role:'owner'},
    loadChildren:()=> import('./owner-home/ohome.module').then(m =>m.OwnerHomeModule)
  },
  {
    path:'staff-page',
    data: { role: 'staff' },
    loadChildren: () => import('./staff-page/staff-page.module').then(m => m.StaffPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./layouts/intro/intro.module').then(m => m.IntroModule)
  }
  ,{
    path:'payment',
    component:PaymentsComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
