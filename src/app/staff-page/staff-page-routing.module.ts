import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { StaffPageComponent } from "./staff-page.component";
import { AuthGuard } from "../auth/auth.guard";
import { BillComponent } from './bill/bill.component';
import { ItemComponent } from './item/item.component';

const routes : Routes =[
    {
        path:'',
        component : StaffPageComponent,
        canActivate : [AuthGuard],
        children:[
            {
                path:'bills',
                component: BillComponent
            },
            {
                path:'items',
                component: ItemComponent
            }
        ],

    },

    

]



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StaffPageRoutingModule { }
