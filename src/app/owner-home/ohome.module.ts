import { NgModule } from "@angular/core";
import { OwnerHomeComponent } from "./owner-home.component";
import { RouterModule } from "@angular/router";
import { OwnerRoutingModule } from "./ohome-routing.module";
import { SideBarModule } from "../navbar/navbar.module";
import { StoreComModule } from "../shop/store.module";
import { StoreComComponent } from "../shop/store-com.component";
import { CreateStoreComponent } from "../shop/create-store/create-store.component";
import { HomeComponent } from './home/home.component';

@NgModule({
    declarations: [OwnerHomeComponent, HomeComponent],
    imports:[
        RouterModule,
        OwnerRoutingModule,
        SideBarModule,
        StoreComModule,
    ]
})
export class OwnerHomeModule { }