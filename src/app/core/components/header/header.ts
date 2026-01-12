import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { StorageService } from '../../../services/storage.service'; // StorageService kullanılmalı

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {

  constructor(
    private storageService: StorageService, 
    private router: Router
  ) {}

  
  get currentUser() {
    return this.storageService.getSession();
  }

  
  get isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  
  get isAdmin(): boolean {
    return this.currentUser?.role === 'ADMIN';
  }

  onLogout() {
    console.log("Kullanıcı oturumu sonlandırılıyor...");
    
   
    this.storageService.clearSession();
    
 
    localStorage.removeItem('isLoggedIn');


    this.router.navigate(['/auth/login']).then(() => {
     
      window.location.reload(); 
    });
  }
}