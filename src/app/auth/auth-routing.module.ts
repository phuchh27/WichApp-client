import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { NgModule } from "@angular/core";
import { SignUpComponent } from "./sign-up/sign-up.component";

const routes : Routes = [
    
    {
        path: '',
    component : AuthComponent,
    },
    {
        path:'signup',
        component : SignUpComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AuthRoutingModule {}