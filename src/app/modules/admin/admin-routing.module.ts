import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProductsComponent } from './admin-products/admin-products';
import { AdminProductCreateComponent } from './admin-product-create/admin-product-create';
import { AdminProductEditComponent } from './admin-product-edit/admin-product-edit';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'products', component: AdminProductsComponent },
      { path: 'products/create', component: AdminProductCreateComponent },
      { path: 'products/edit/:id', component: AdminProductEditComponent },
      { path: '', redirectTo: 'products', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }