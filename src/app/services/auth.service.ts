import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User | null = null;
  isLoggedIn: boolean = false;

  constructor(
    private storageService: StorageService,
    private router: Router
  ) {
    const session = this.storageService.getSession();
    if (session) {
      this.currentUser = session;
      this.isLoggedIn = true;
    }
  }

  login(user: User) {
    this.currentUser = user;
    this.isLoggedIn = true;
    this.storageService.saveSession(user);
    this.router.navigate(['/products']);
  }

  logout() {
    this.storageService.clearSession();
    this.currentUser = null;
    this.isLoggedIn = false;
    this.router.navigate(['/auth/login']);
  }

  register(user: User) {
    const users = this.storageService.getUsers();
    users.push(user);
    this.storageService.saveUsers(users);
  }
}