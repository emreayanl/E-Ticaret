// src/app/models/cart-item.model.ts
export interface CartItem {
    productId: number; // Ürün referans ID [cite: 34]
    quantity: number;  // Seçilen adet [cite: 34]
}

export interface Cart {
    userId: number;       // Sepetin sahibi olan kullanıcı [cite: 32]
    items: CartItem[];    // Sepetteki ürün listesi [cite: 32]
}