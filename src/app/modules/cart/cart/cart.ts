import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../services/storage.service'; 
import { CartItem } from '../../../models/cart-item.model';
import { Product } from '../../../models/product.model';


interface DisplayCartItem {
  product: Product;
  quantity: number;
  totalPrice: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
  standalone: false
})
export class CartComponent implements OnInit {
  displayItems: DisplayCartItem[] = []; 
  cartTotal: number = 0;
  totalItemsCount: number = 0;

  constructor(
    private storageService: StorageService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    
    const session = this.storageService.getSession();
    if (!session) {
      this.router.navigate(['/auth/login']);
      return;
    }

    
    const cart = this.storageService.getCart(session.id); 
    const allProducts = this.storageService.getProducts();

    
    this.displayItems = [];
    let tempTotal = 0;
    let tempCount = 0;

    cart.items.forEach(cartItem => {
      const product = allProducts.find(p => p.id === cartItem.productId);
      
      if (product) {
        const lineTotal = product.price * cartItem.quantity;
        tempTotal += lineTotal;
        tempCount += cartItem.quantity;

        this.displayItems.push({
          product: product,
          quantity: cartItem.quantity,
          totalPrice: lineTotal
        });
      }
    });

    this.cartTotal = tempTotal;
    this.totalItemsCount = tempCount;
  }

 
  updateQuantity(productId: number, change: number) {
    const session = this.storageService.getSession();
    if (!session) return;

    let cart = this.storageService.getCart(session.id);
    const itemIndex = cart.items.findIndex(i => i.productId === productId);
    const product = this.displayItems.find(i => i.product.id === productId)?.product;

    if (itemIndex > -1 && product) {
      const newQuantity = cart.items[itemIndex].quantity + change;

     
      if (newQuantity < 1) return;

     
      if (newQuantity > product.stock) {
        alert(`Stok yetersiz! Maksimum alabileceğiniz adet: ${product.stock}`);
        return;
      }

      cart.items[itemIndex].quantity = newQuantity;
      this.storageService.saveCart(cart); 
      this.loadCart(); 
    }
  }

  
  removeItem(productId: number) {
    const session = this.storageService.getSession();
    if (!session) return;

    let cart = this.storageService.getCart(session.id);
    cart.items = cart.items.filter(item => item.productId !== productId);
    
    this.storageService.saveCart(cart);
    this.loadCart();
  }

  
  clearCart() {
    const session = this.storageService.getSession();
    if (!session) return;

    const cart = { userId: session.id, items: [] };
    this.storageService.saveCart(cart);
    this.loadCart();
  }

  
  goToCheckout() {
    if (this.displayItems.length === 0) {
      alert('Sepetiniz boş!');
      return;
    }
   
    this.router.navigate(['/checkout']);
  }
}