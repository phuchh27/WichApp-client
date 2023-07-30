import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimeModule } from './primeNg.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from './header/header.component';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from '../app/auth/store/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core.module';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    PrimeModule,
    BrowserAnimationsModule,
    ButtonModule,
    MegaMenuModule,
    MenubarModule,
    InputTextModule,
    StoreModule.forRoot(),
    EffectsModule.forRoot([AuthEffects]),
    CoreModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
