// src/app/models/cart.model.ts

// CartItem: Sadece ürün ID ve adet tutulur
export interface CartItem {
  productId: number;
  quantity: number;
}

// Cart: Kullanıcıya özel sepet
export interface Cart {
  userId: number;
  items: CartItem[];
}