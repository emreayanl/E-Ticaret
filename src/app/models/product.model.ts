// src/app/models/product.model.ts

export interface Product {
    id: number;           // [cite: 30] Benzersiz ürün ID
    name: string;         //[cite_start]// [cite: 30] Ürün adı
    description: string;  //[cite_start]// [cite: 30] Ürün açıklaması
    
   // [cite_start]// [cite: 189] Validasyon: Fiyat 0’dan küçük olamaz
    price: number;        
    
    category: string;    // [cite_start]// [cite: 30, 86] Filtreleme için kullanılacak kategori
    brand: string;        //[cite_start]// [cite: 30, 84] Marka (Arama ve filtreleme için)
    imageUrl: string;     //[cite_start]// [cite: 30] Ürün görseli
    
   // [cite_start]// [cite: 188] Validasyon: Stok 0’dan küçük olamaz
    //[cite_start]// [cite: 196] İş Kuralı: Stok 0 ise sepete eklenemez
    stock: number;        
    
    //[cite_start]// [cite: 91] Sıralama: "Yeni eklenenler" için kullanılacak
    createdAt: Date | string; // (JSON dönüşümlerinde string gelebilir, ikisini de desteklemesi güvenlidir)
}