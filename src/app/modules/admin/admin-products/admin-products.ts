import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../models/product.model';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.html',
  styleUrls: ['./admin-products.css'],
  standalone: false
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.products = this.storageService.getProducts();
  }

  onDelete(id: number) {
    if (confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
      this.storageService.deleteProduct(id);
      this.refreshList();
    }
  }

  onEdit(id: number) {
    this.router.navigate(['/admin/products/edit', id]);
  }
}