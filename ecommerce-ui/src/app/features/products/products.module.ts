import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';

import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';

import { SharedModule } from 'src/app/shared/shared.module';
import { ProductComponent } from './pages/product/product.component';
import { ProductListComponent } from './pages/product-list/product-list.component';



@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent
  ],
  imports: [
    LayoutModule,
    MatCardModule,
    MatGridListModule,
    MatPaginatorModule,
    SharedModule,
    RouterModule
  ]
})
export class ProductsModule { }
