import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule } from './shared/components';
import {  ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationService } from './core/services/authentication.service';
import { AuthModule } from './features/auth/auth.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductsModule } from './features/products/products.module';
import { JwtInterceptor } from './core/interceptors/options.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { CartModule } from './features/cart/cart.module';
import { CoreModule } from './core/core.module';
import { appInitializer } from './shared/services/appInitializer';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    ProductsModule,
    CartModule,
    CoreModule
  ],
  providers: [
    ScreenService,
    AppInfoService,
    AuthenticationService,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: appInitializer,
    //   multi: true,
    //   deps: [AuthenticationService],
    // },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
