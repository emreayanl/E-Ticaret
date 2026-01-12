import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminProductsComponent } from './admin-products/admin-products';
import { AdminProductCreateComponent } from './admin-product-create/admin-product-create';
import { AdminProductEditComponent } from './admin-product-edit/admin-product-edit';

@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminProductCreateComponent,
    AdminProductEditComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }