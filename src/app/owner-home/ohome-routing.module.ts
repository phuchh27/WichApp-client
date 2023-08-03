import { RouterModule, Routes } from "@angular/router";
import { OwnerHomeComponent } from "./owner-home.component";
import { NgModule } from "@angular/core";
import { AuthGuard } from "../auth/auth.guard";

const routes : Routes =[
    {
        path: '',
        component: OwnerHomeComponent,
        //canActivate: [AuthGuard],
    },
    
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class OwnerRoutingModule {}