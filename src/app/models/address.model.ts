// src/app/models/address.model.ts
export interface Address {
    id: number;           // Benzersiz ID [cite: 28]
    userId: number;       // Hangi kullanıcıya ait olduğu [cite: 28]
    title: string;        // Adres başlığı (Örn: Ev, İş) [cite: 28]
    city: string;         // Şehir [cite: 28]
    district: string;     // İlçe [cite: 28]
    fullAddress: string;  // Tam adres metni [cite: 28]
    zipCode: string;      // Posta kodu [cite: 28]
    isDefault: boolean;   // Varsayılan adres mi? [cite: 28]
    createdAt: Date;      // Oluşturulma tarihi [cite: 28]
}