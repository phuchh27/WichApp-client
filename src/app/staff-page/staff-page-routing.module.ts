import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { StaffPageComponent } from "./staff-page.component";
import { AuthGuard } from "../auth/auth.guard";

const routes : Routes =[
    {
        path:'',
        component : StaffPageComponent,
        canActivate : [AuthGuard],
        children:[]
    }
]



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StaffPageRoutingModule { }
