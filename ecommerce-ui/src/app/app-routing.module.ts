import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { AuthGuardService } from './core/services/authGuard.service';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { SignupComponent } from './features/auth/pages/signup/signup.component';
import { ProductListComponent } from './features/products/pages/product-list/product-list.component';
import { ProductComponent } from './features/products/pages/product/product.component';
import { SummaryComponent } from './features/cart/summary/summary.component';
import { EmptyCartGuard } from './guards/empty-cart.guard';
import { EmptyComponent } from './features/cart/empty/empty.component';

const routes: Routes = [
  {
    path: 'product',
    component: ProductListComponent,
    canActivate: [ AuthGuardService ]
  },
  { path: 'product/:id',
    component: ProductComponent,
    canActivate: [ AuthGuardService ] },
  {
    path: 'login-form',
    component: LoginComponent,
  },
  {
    path: 'create-account',
    component: SignupComponent,
  },
  { path: 'cart',
    component: SummaryComponent,
    canActivate: [EmptyCartGuard]
  },
  { path: 'empty',
    component: EmptyComponent
  },
  {
    path: '**',
    redirectTo: 'product'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), DxDataGridModule, DxFormModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    ProfileComponent,
    TasksComponent
  ]
})
export class AppRoutingModule { }
