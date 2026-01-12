// src/app/constants/mock-data.ts
import { User } from '../models/user.model';
import { Product } from '../models/product.model';
import { Coupon } from '../models/coupon.model';

export const MOCK_USERS: User[] = [
  { id: 1, username: 'admin', password: '123', email: 'admin@shop.com', role: 'ADMIN', fullName: 'Süper Admin', phone: 5551112233, createdAt: new Date() }, // 
  { id: 2, username: 'emre', password: '123', email: 'emre@test.com', role: 'USER', fullName: 'Emre Kullanıcı', phone: 5554445566, createdAt: new Date() }, // 
  { id: 3, username: 'ahmet', password: '123', email: 'ahmet@test.com', role: 'USER', fullName: 'Ahmet Müşteri', phone: 5559998877, createdAt: new Date() } // 
];

export const MOCK_COUPONS: Coupon[] = [
  { id: 1, code: 'WELCOME10', type: 'Percent', value: 10, minTotal: 100, isActive: true }, // [cite: 57]
  { id: 2, code: 'SAVE50', type: 'Fixed', value: 50, minTotal: 300, isActive: true },      // [cite: 58]
  { id: 3, code: 'OFF20', type: 'Percent', value: 20, minTotal: 500, isActive: true }      // [cite: 59]
];

export const MOCK_PRODUCTS: Product[] = [
  // 15 adet ürün (Word dosyası kriteri: 15-20 ürün) 
  { id: 1, name: 'Laptop Pro X', description: 'Yüksek performans', price: 25000, category: 'Elektronik', brand: 'TechMaster', stock: 10, imageUrl: 'assets/img/laptop.jpg', createdAt: new Date() },
  { id: 2, name: 'Akıllı Telefon Z', description: 'Kamera teknolojisi', price: 15000, category: 'Elektronik', brand: 'PhoneX', stock: 20, imageUrl: 'assets/img/phone.jpg', createdAt: new Date() },
  { id: 3, name: 'Kulaklık', description: 'Gürültü engelleyici', price: 1500, category: 'Elektronik', brand: 'SoundMax', stock: 50, imageUrl: 'assets/img/audio.jpg', createdAt: new Date() },
  { id: 4, name: '4K Monitör', description: '27 inç ultra net', price: 4500, category: 'Elektronik', brand: 'ViewPro', stock: 15, imageUrl: 'assets/img/monitor.jpg', createdAt: new Date() },
  { id: 5, name: 'Klavye', description: 'RGB oyuncu', price: 1200, category: 'Elektronik', brand: 'GameKey', stock: 30, imageUrl: 'assets/img/kb.jpg', createdAt: new Date() },
  { id: 6, name: 'Kot Pantolon', description: 'Mavi kot', price: 600, category: 'Giyim', brand: 'BlueJeans', stock: 100, imageUrl: 'assets/img/jeans.jpg', createdAt: new Date() },
  { id: 7, name: 'Deri Ceket', description: 'Siyah deri', price: 2500, category: 'Giyim', brand: 'LeatherCo', stock: 5, imageUrl: 'assets/img/jacket.jpg', createdAt: new Date() },
  { id: 8, name: 'Spor Ayakkabı', description: 'Koşu için', price: 1800, category: 'Giyim', brand: 'RunFast', stock: 25, imageUrl: 'assets/img/shoes.jpg', createdAt: new Date() },
  { id: 9, name: 'T-Shirt', description: 'Beyaz pamuk', price: 200, category: 'Giyim', brand: 'CottonSoft', stock: 200, imageUrl: 'assets/img/tshirt.jpg', createdAt: new Date() },
  { id: 10, name: 'Mont', description: 'Su geçirmez', price: 3000, category: 'Giyim', brand: 'WinterSafe', stock: 8, imageUrl: 'assets/img/coat.jpg', createdAt: new Date() },
  { id: 11, name: 'Kahve Makinesi', description: 'Filtre kahve', price: 1200, category: 'Ev', brand: 'HomeBarista', stock: 12, imageUrl: 'assets/img/coffee.jpg', createdAt: new Date() },
  { id: 12, name: 'Blender', description: 'Mutfak seti', price: 900, category: 'Ev', brand: 'MixMaster', stock: 20, imageUrl: 'assets/img/blender.jpg', createdAt: new Date() },
  { id: 13, name: 'Masa', description: 'Minimalist', price: 2200, category: 'Ev', brand: 'WoodWorks', stock: 5, imageUrl: 'assets/img/desk.jpg', createdAt: new Date() },
  { id: 14, name: 'Kitaplık', description: 'Metal kitaplık', price: 1500, category: 'Ev', brand: 'ShelfCo', stock: 7, imageUrl: 'assets/img/shelf.jpg', createdAt: new Date() },
  { id: 15, name: 'Ampul', description: 'Akıllı ampul', price: 300, category: 'Ev', brand: 'SmartLight', stock: 50, imageUrl: 'assets/img/bulb.jpg', createdAt: new Date() }
];