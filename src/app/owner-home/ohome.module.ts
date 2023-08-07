import { NgModule } from "@angular/core";
import { OwnerHomeComponent } from "./owner-home.component";
import { RouterModule } from "@angular/router";
import { OwnerRoutingModule } from "./ohome-routing.module";
import { SideBarModule } from "../navbar/navbar.module";
import { StoreComModule } from "../store-com/store.module";

@NgModule({
    declarations: [OwnerHomeComponent],
    imports:[
        RouterModule,
        OwnerRoutingModule,
        SideBarModule,
        StoreComModule,
    ]
})
export class OwnerHomeModule { }