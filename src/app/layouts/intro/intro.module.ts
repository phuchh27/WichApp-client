import { NgModule } from "@angular/core";
import { IntroComponent } from "./intro.component";
import { IntroRoutingModule } from "./intro-routing.module";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [IntroComponent],
    imports: [IntroRoutingModule],
})


export class IntroModule { }