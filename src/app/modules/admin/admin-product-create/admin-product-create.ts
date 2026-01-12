import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../services/storage.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-admin-product-create',
  templateUrl: './admin-product-create.html',
  styleUrls: ['./admin-product-create.css'],
  standalone: false
})
export class AdminProductCreateComponent {
  product: Product = {
    id: 0,
    name: '',
    price: 0,
    category: 'Elektronik',
    description: '',
    imageUrl: '',
    stock: 0,
    brand: '',
    createdAt: new Date()
  };

  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

  saveProduct() {
    this.storageService.addProduct(this.product);
    alert('Ürün başarıyla eklendi!');
    this.router.navigate(['/admin/products']);
  }
}