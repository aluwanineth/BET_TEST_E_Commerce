import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule,
  ]
})
export class AuthModule { }
