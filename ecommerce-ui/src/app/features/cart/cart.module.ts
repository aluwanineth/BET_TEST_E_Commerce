import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';

import { SharedModule } from 'src/app/shared/shared.module';
import { SummaryComponent } from './summary/summary.component';
import { EmptyComponent } from './empty/empty.component';

@NgModule({
  declarations: [SummaryComponent,  EmptyComponent],
  imports: [
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CartModule { }
