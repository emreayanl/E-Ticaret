import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { StorageService } from '../../services/storage.service'; // Merkezi servis [cite: 41]
import { User } from '../../models/user.model';
export const authGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);

 
  const session = storageService.getSession();

  if (session) {
   
    return true; 
  } else {
    
    
    return router.parseUrl('/auth/login');
  }
};