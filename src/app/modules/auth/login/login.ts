import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../services/storage.service'; // Merkezi servis kullanımı 

@Component({
  selector: 'app-login',
  templateUrl: './login.html', 
  styleUrls: ['./login.css'],
  standalone: false
})
export class LoginComponent {
 
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private storageService: StorageService 
  ) {}

  onLogin() {
   
    if (!this.email || !this.password) {
      alert('Lütfen e-posta ve şifre alanlarını doldurunuz.');
      return;
    }

   
    const users = this.storageService.getUsers();

    const user = users.find(u => u.email === this.email && u.password === this.password);

    if (user) {
     
      
      this.storageService.saveSession(user);
      
      console.log(`${user.role} girişi yapıldı:`, user.fullName);

      
      if (user.role === 'ADMIN') {
        this.router.navigate(['/admin/products']);
      } else {
        this.router.navigate(['/products']); 
      }

    } else {
      
      alert('E-posta adresi veya şifre hatalı!');
    }
  }
}