import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimeModule } from './primeNg.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from './layouts/header/header.component';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from '../app/auth/store/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core.module';
import { reducers } from './store/app.reducer';
import { FooterComponent } from './layouts/footer/footer.component';
import { CategoryEffects } from './store/category/cactegory.effects';
import { StoreEffects } from './store/store/srore.effects';
import { PaymentsComponent } from './payments/payments.component';
import { SharedModule } from './shared/shared.module';
import { StaffEffects } from './store/staff/staff.effects';
import { PaymentEffects } from './store/payment/payment.effects';
import { ItemEffects } from './store/item/item.effects';
import { ICategoriesEffects } from './store/Icategory/iCategory.effects';
import { QRCodeModule } from 'angularx-qrcode';
import { BillEffects } from './store/bill/bill.effects';

import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PaymentsComponent,
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
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      AuthEffects,
      CategoryEffects,
      StoreEffects,
      StaffEffects,
      PaymentEffects,
      ItemEffects,
      ICategoriesEffects,
      QRCodeModule,
      BillEffects,
    ]),
    CoreModule,
    SharedModule,
    SocialLoginModule,
  ],

  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '50348836962-oa6k09cpohca4qvncnqh9m6k5h0k2uqd.apps.googleusercontent.com'
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
