import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AuthRoutingModule } from "./auth-routing.module";
import { RouterModule } from "@angular/router";
import { SplitterModule } from 'primeng/splitter';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
    declarations: [AuthComponent,SignInComponent,SignUpComponent],
    imports:[
        RouterModule,
        CommonModule,
        FormsModule,
        AuthRoutingModule,
        SplitterModule,
        TooltipModule
        
    ]
})
export class AuthModule {}