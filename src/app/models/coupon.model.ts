// src/app/models/coupon.model.ts

export type CouponType = 'Percent' | 'Fixed'; // [cite: 36]

export interface Coupon {
    code: string;        // [cite: 35] Örn: WELCOME10
    type: CouponType;    // [cite: 35] Yüzde veya Sabit
    value: number;       // [cite: 35] İndirim değeri
    minTotal: number;    // [cite: 36] Alt limit şartı
    isActive: boolean;   // [cite: 36] Aktiflik durumu
    id: number;         // [cite: 35] Benzersiz kimlik
}