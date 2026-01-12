import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../../services/storage.service'; 
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.html', 
  styleUrls: ['./register.css'],
  standalone: false
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private router: Router
  ) {
    
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      username: ['', Validators.required], 
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]], 
      phone: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      
     
      const users = this.storageService.getUsers();

     
      const isUserExists = users.find(u => u.email === formValue.email || u.username === formValue.username);

      if (isUserExists) {
        alert('Bu kullanıcı adı veya e-posta adresi zaten kullanımda!');
        return;
      }

      
      const newUser: User = {
        id: Date.now(),
        fullName: formValue.fullName,
        username: formValue.username,
        email: formValue.email,
        password: formValue.password,
        phone: formValue.phone,
        role: 'USER', 
        createdAt: new Date()
      };

      users.push(newUser);
      this.storageService.saveUsers(users);

      alert('Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz.');
      this.router.navigate(['/auth/login']);

    } else {
    
      alert('Lütfen tüm alanları eksiksiz ve doğru doldurun.');
      
      this.registerForm.markAllAsTouched();
    }
  }
}