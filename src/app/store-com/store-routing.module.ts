import { RouterModule, Routes } from "@angular/router";
import { StoreComComponent } from "./store-com.component";
import { NgModule } from "@angular/core";

const routes : Routes=[
    {
        path:'',
        component: StoreComComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class StoreRoutingModule {}