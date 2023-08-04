import { NgModule } from "@angular/core";
import { OwnerHomeComponent } from "./owner-home.component";
import { RouterModule } from "@angular/router";
import { OwnerRoutingModule } from "./ohome-routing.module";
import { SideBarModule } from "../navbar/navbar.module";

@NgModule({
    declarations: [OwnerHomeComponent],
    imports:[
        RouterModule,
        OwnerRoutingModule,
        SideBarModule,
    ]
})
export class OwnerHomeModule { }