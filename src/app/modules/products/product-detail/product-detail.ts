import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../../services/storage.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css'],
  standalone: false
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.storageService.getProducts().find(p => p.id === id);
  }

  addToCart() {
    if (!this.product) return;

    const session = this.storageService.getSession();
    if (!session) {
      this.router.navigate(['/auth/login']);
      return;
    }

    if (this.quantity > this.product.stock) {
      alert('Stokta yeterli ürün yok!');
      return;
    }

    const cart = this.storageService.getCart(session.id);
    const existingItem = cart.items.find(i => i.productId === this.product!.id);

    if (existingItem) {
      if (existingItem.quantity + this.quantity > this.product.stock) {
        alert('Sepetteki miktar ile birlikte stok sınırını aşıyorsunuz!');
        return;
      }
      existingItem.quantity += this.quantity;
    } else {
      cart.items.push({
        productId: this.product.id,
        quantity: this.quantity
      });
    }

    this.storageService.saveCart(cart);
    alert('Ürün sepete başarıyla eklendi!');
  }

  increaseQuantity() {
    if (this.product && this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}