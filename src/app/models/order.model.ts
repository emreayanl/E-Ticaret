import { Address } from './address.model';

// 1. ÖNCE PARÇA (Item) TANIMLANIR
// Bu kısım Word dosyasındaki [Source: 39-40] kurallarını sağlar
export interface OrderItem {
    productId: number;
    quantity: number;
    
    // Snapshot Alanları (Kritik İş Kuralı)
    nameSnapshot: string; 
    priceSnapshot: number; 
    imageUrlSnapshot?: string;
}

// 2. SONRA ANA SİPARİŞ (Order) TANIMLANIR
// Bu kısım Word dosyasındaki [Source: 37-38] kurallarını sağlar
export interface Order {
    id: number;
    userId: number;
    
    // Yukarıda tanımladığımız OrderItem'ı burada kullanıyoruz
    items: OrderItem[]; 
    
    // Finansal Detaylar
    subtotal: number;
    discountTotal: number;
    totalPrice: number;
    
    // Diğer Bilgiler
    appliedCouponCode?: string;
    addressSnapshot: Address; // Adres kopyası
    
    paymentMethod: 'CreditCard' | 'CashOnDelivery';
    status: 'Sipariş Alındı' | 'Hazırlanıyor' | 'Kargolandı' | 'Teslim Edildi';
    createdAt: Date;
}