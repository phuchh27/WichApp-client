import { NgModule } from "@angular/core";
import { StoreComComponent } from "./store-com.component";
import { StoreRoutingModule } from "./store-routing.module";
import { CarouselModule } from 'primeng/carousel';
import { ListStoreComponent } from './list-store/list-store.component';
import { CreateStoreComponent } from './create-store/create-store.component';


@NgModule ({
    declarations: [StoreComComponent, ListStoreComponent, CreateStoreComponent],
    imports: [
        StoreRoutingModule,
        CarouselModule
    ],
    exports : [StoreComComponent]

})

export class StoreComModule { }