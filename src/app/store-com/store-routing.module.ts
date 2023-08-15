import { RouterModule, Routes } from "@angular/router";
import { StoreComComponent } from "./store-com.component";
import { NgModule } from "@angular/core";
import { CreateStoreComponent } from "./create-store/create-store.component";

const routes : Routes=[
    {
        path:'',
        component: StoreComComponent
    },
    {
        path:'create',
        component : CreateStoreComponent
    }
    
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class StoreRoutingModule {}