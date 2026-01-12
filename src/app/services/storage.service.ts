  import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Product } from '../models/product.model';
import { Cart } from '../models/cart.model';
import { Order } from '../models/order.model';
import { Address } from '../models/address.model';
import { Coupon } from '../models/coupon.model';
import { MOCK_USERS, MOCK_COUPONS ,MOCK_PRODUCTS } from '../data/mock-data'; 
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  addUser: any;

  constructor() {
    this.seedDatabase();
  }

  getUsers(): User[] {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  }

  saveUsers(users: User[]) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  saveSession(user: User) {
    localStorage.setItem('session', JSON.stringify(user));
  }

  getSession(): User | null {
    const session = localStorage.getItem('session');
    return session ? JSON.parse(session) : null;
  }

  clearSession() {
    localStorage.removeItem('session');
  }

  getProducts(): Product[] {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
  }

  saveProducts(products: Product[]) {
    localStorage.setItem('products', JSON.stringify(products));
  }

  getProductById(id: number): Product | undefined {
    const products = this.getProducts();
    return products.find(p => p.id === id);
  }

  addProduct(product: Product): void {
    const products = this.getProducts();
    const maxId = products.length > 0 ? Math.max(...products.map(p => p.id)) : 0;
    product.id = maxId + 1;
    product.createdAt = new Date();
    products.push(product);
    this.saveProducts(products);
  }

  updateProduct(updatedProduct: Product): void {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      products[index] = updatedProduct;
      this.saveProducts(products);
    }
  }

  deleteProduct(id: number): void {
    let products = this.getProducts();
    products = products.filter(p => p.id !== id);
    this.saveProducts(products);
  }

  updateStock(productId: number, quantity: number): void {
    const products = this.getProducts();
    const product = products.find(p => p.id === productId);
    if (product) {
      product.stock -= quantity;
      this.saveProducts(products);
    }
  }

  getCart(userId: number): Cart {
    const allCarts: Cart[] = JSON.parse(localStorage.getItem('carts') || '[]');
    let userCart = allCarts.find(c => c.userId === userId);
    
    if (!userCart) {
      userCart = { userId: userId, items: [] };
      allCarts.push(userCart);
      localStorage.setItem('carts', JSON.stringify(allCarts));
    }
    return userCart;
  }

  saveCart(cart: Cart) {
    let allCarts: Cart[] = JSON.parse(localStorage.getItem('carts') || '[]');
    const index = allCarts.findIndex(c => c.userId === cart.userId);
    
    if (index > -1) {
      allCarts[index] = cart;
    } else {
      allCarts.push(cart);
    }
    localStorage.setItem('carts', JSON.stringify(allCarts));
  }

  getOrders(userId?: number): Order[] {
    const savedOrders = localStorage.getItem('orders');
    let orders: Order[] = savedOrders ? JSON.parse(savedOrders) : [];
    
    if (userId) {
      return orders.filter(o => o.userId === userId);
    }
    return orders;
  }

  saveOrder(userId: number, order: Order) {
    const orders = this.getOrders();
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
  }

  getAddresses(): Address[] {
    const addresses = localStorage.getItem('addresses');
    return addresses ? JSON.parse(addresses) : [];
  }

  saveAddresses(addresses: Address[]) {
    localStorage.setItem('addresses', JSON.stringify(addresses));
  }

  getCoupons(): Coupon[] {
    const coupons = localStorage.getItem('coupons');
    return coupons ? JSON.parse(coupons) : [];
  }

  private seedDatabase() {
    if (!localStorage.getItem('products')) {
      const initialProducts: Product[] = [
        ...MOCK_PRODUCTS
  
      ];
      localStorage.setItem('products', JSON.stringify(initialProducts));
    }

    if (!localStorage.getItem('users')) {
      const initialUsers: User[] = [
        ...MOCK_USERS
      ];
      localStorage.setItem('users', JSON.stringify(initialUsers));
    }

    if (!localStorage.getItem('coupons')) {
      const initialCoupons: Coupon[] = [
        ...MOCK_COUPONS
      ];
      localStorage.setItem('coupons', JSON.stringify(initialCoupons));
    }
  }
}