export interface User {
    id: number;
    email: string;
    phone: number;
    password?: string;     // Giriş yaparken lazım ama session'da şart değil
    fullName: string;
    username?: string;     // StorageService seed datasında kullandık
    role: 'ADMIN' | 'USER'; // Rol yönetimi için
    createdAt: Date;
}