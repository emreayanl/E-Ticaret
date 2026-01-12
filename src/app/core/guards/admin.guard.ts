import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { StorageService } from '../../services/storage.service'; // StorageService merkezi kaynak 

export const adminGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);

 
  const currentUser = storageService.getSession();

 
  if (currentUser && currentUser.role === 'ADMIN') {
    return true; 
  }

 
  alert('Bu alana sadece yöneticiler erişebilir!');
  
 
  return router.parseUrl('/products'); 
};