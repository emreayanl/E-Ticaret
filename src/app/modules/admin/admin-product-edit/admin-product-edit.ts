import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../../services/storage.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-admin-product-edit',
  templateUrl: './admin-product-edit.html',
  styleUrls: ['./admin-product-edit.css'],
  standalone: false
})
export class AdminProductEditComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.storageService.getProductById(id);

    if (!this.product) {
      this.router.navigate(['/admin/products']);
    }
  }

  updateProduct() {
    if (this.product) {
      this.storageService.updateProduct(this.product);
      alert('Ürün başarıyla güncellendi!');
      this.router.navigate(['/admin/products']);
    }
  }
}