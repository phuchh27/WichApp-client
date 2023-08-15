import { RouterModule, Routes } from "@angular/router";
import { OwnerHomeComponent } from "./owner-home.component";
import { NgModule } from "@angular/core";
import { AuthGuard } from "../auth/auth.guard";
import { StoreComComponent } from "../store-com/store-com.component";
import { CreateStoreComponent } from "../store-com/create-store/create-store.component";

const routes : Routes =[
    {
        path: '',
        component: OwnerHomeComponent,
        canActivate: [AuthGuard],
        children : [
            {
                path: 'store',
                loadChildren: () => import('../store-com/store.module').then(m => m.StoreComModule)
            }

        ]
    },

    
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class OwnerRoutingModule {}