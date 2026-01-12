import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../services/storage.service';
import { Address } from '../../../models/address.model';
import { Order, OrderItem } from '../../../models/order.model';
import { Coupon } from '../../../models/coupon.model';
import { Product } from '../../../models/product.model';

interface DisplayItem {
  product: Product;
  quantity: number;
  totalPrice: number;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.html', 
  styleUrls: ['./checkout.css'],
  standalone: false
})
export class CheckoutComponent implements OnInit {
  displayItems: DisplayItem[] = [];
  addresses: Address[] = [];
  
  selectedAddressId: number | null = null;
  paymentMethod: 'CreditCard' | 'CashOnDelivery' = 'CreditCard';
  
  subTotal: number = 0;
  discount: number = 0;
  totalPrice: number = 0;

  couponCode: string = '';
  appliedCoupon: Coupon | null = null;
  couponMessage: string = '';
  couponMessageType: 'success' | 'error' = 'error';

  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const session = this.storageService.getSession();
    if (!session) {
      this.router.navigate(['/auth/login']);
      return;
    }

    this.loadCartItems(session.id);
    this.loadAddresses(session.id);
  }


  selectAddress(id: number) {
    this.selectedAddressId = id;
  }
  

  private loadCartItems(userId: number) {
    const cart = this.storageService.getCart(userId);
   
    const allProducts = this.storageService.getProducts(); 

    this.displayItems = [];
    
    if (!cart || cart.items.length === 0) {
      
      this.router.navigate(['/products']);
      return;
    }

    cart.items.forEach(cartItem => {
      const product = allProducts.find(p => p.id === cartItem.productId);
      if (product) {
        this.displayItems.push({
          product: product,
          quantity: cartItem.quantity,
          totalPrice: product.price * cartItem.quantity
        });
      }
    });

    this.calculateTotals();
  }

  private loadAddresses(userId: number) {
    const allAddresses = this.storageService.getAddresses();
    this.addresses = allAddresses.filter(a => a.userId === userId);

    
    const defaultAddr = this.addresses.find(a => a.isDefault);
    if (defaultAddr) {
      this.selectedAddressId = defaultAddr.id;
    }
  }

  calculateTotals() {
    this.subTotal = this.displayItems.reduce((sum, item) => sum + item.totalPrice, 0);

    this.discount = 0;
    if (this.appliedCoupon) {
      if (this.appliedCoupon.type === 'Percent') {
        this.discount = (this.subTotal * this.appliedCoupon.value) / 100;
      } else {
        this.discount = this.appliedCoupon.value;
      }
    }

   
    if (this.discount > this.subTotal) {
      this.discount = this.subTotal;
    }

    this.totalPrice = this.subTotal - this.discount;
  }

  applyCoupon() {
    if (!this.couponCode) return;

    const allCoupons = this.storageService.getCoupons(); 
    const foundCoupon = allCoupons.find(c => c.code === this.couponCode.toUpperCase().trim());

    if (!foundCoupon) {
      this.couponMessage = 'Geçersiz kupon kodu.';
      this.couponMessageType = 'error';
      this.appliedCoupon = null;
      this.calculateTotals();
      return;
    }

    if (!foundCoupon.isActive) {
      this.couponMessage = 'Bu kupon artık aktif değil.';
      this.couponMessageType = 'error';
      this.appliedCoupon = null;
      this.calculateTotals();
      return;
    }

    if (this.subTotal < foundCoupon.minTotal) {
      this.couponMessage = `Bu kuponu kullanmak için sepet tutarı en az ${foundCoupon.minTotal} TL olmalıdır.`;
      this.couponMessageType = 'error';
      this.appliedCoupon = null;
      this.calculateTotals();
      return;
    }

    this.appliedCoupon = foundCoupon;
    this.couponMessage = 'Kupon başarıyla uygulandı!';
    this.couponMessageType = 'success';
    this.calculateTotals();
  }

  completeOrder() {
    if (!this.selectedAddressId) {
      alert('Lütfen teslimat adresi seçiniz.');
      return;
    }

    const session = this.storageService.getSession();
    if (!session) return;

    const selectedAddress = this.addresses.find(a => a.id === this.selectedAddressId);
    if (!selectedAddress) return;

    const orderItems: OrderItem[] = this.displayItems.map(item => ({
      productId: item.product.id,
      quantity: item.quantity,
      nameSnapshot: item.product.name,
      priceSnapshot: item.product.price,
    
    }));

    const newOrder: Order = {
      id: Date.now(),
      userId: session.id,
      items: orderItems,
      subtotal: this.subTotal,
      discountTotal: this.discount,
      totalPrice: this.totalPrice,
      appliedCouponCode: this.appliedCoupon?.code,
      addressSnapshot: { ...selectedAddress },
      paymentMethod: this.paymentMethod,
      status: 'Sipariş Alındı',
      createdAt: new Date()
    };

    
    orderItems.forEach(item => {
    
      
      if(this.storageService['updateStock']) {
         this.storageService.updateStock(item.productId, item.quantity);
      }
    });

    this.storageService.saveOrder(session.id, newOrder);

    this.storageService.saveCart({ userId: session.id, items: [] });

    alert('Siparişiniz başarıyla oluşturuldu!');
    this.router.navigate(['/orders']);
  }
}