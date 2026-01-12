import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart/cart';

@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    RouterModule
  ]
})
export class CartModule { }