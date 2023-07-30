import { NgModule } from "@angular/core";
import { OwnerHomeComponent } from "./owner-home.component";
import { RouterModule } from "@angular/router";
import { OwnerRoutingModule } from "./ohome-routing.module";

@NgModule({
    declarations: [OwnerHomeComponent],
    imports:[
        RouterModule,
        OwnerRoutingModule,
    ]
})
export class OwnerHomeModule { }