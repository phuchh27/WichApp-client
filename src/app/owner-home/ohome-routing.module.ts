import { RouterModule, Routes } from "@angular/router";
import { OwnerHomeComponent } from "./owner-home.component";
import { NgModule } from "@angular/core";
import { AuthGuard } from "../auth/auth.guard";
import { StoreComComponent } from "../shop/store-com.component";
import { CreateStoreComponent } from "../shop/create-store/create-store.component";
import { HomeComponent } from "./home/home.component";

const routes : Routes =[
    {
        path: '',
        component: OwnerHomeComponent,
        canActivate: [AuthGuard],
        children : [
            {
                path: '',
                component : HomeComponent
            },
            {
                path: 'store',
                loadChildren: () => import('../shop/store.module').then(m => m.StoreComModule)
            },
            {
                path: 'Employee',
                loadChildren: () => import('../components/employee-management/employee-management.module').then(m => m.EmployeeManagementModule)
            },
        ]
    },

    
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class OwnerRoutingModule {}