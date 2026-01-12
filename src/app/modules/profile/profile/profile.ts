import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { StorageService } from '../../../services/storage.service';
import { User } from '../../../models/user.model';
import { Address } from '../../../models/address.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
  standalone: false
  
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  addresses: Address[] = [];
  addressForm: FormGroup;
  showAddressForm: boolean = false;
  

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private fb: FormBuilder
  ) {
    this.addressForm = this.fb.group({
      title: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      fullAddress: ['', Validators.required],
      zipCode: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.user = this.authService.currentUser;
    if (this.user) {
      this.loadAddresses();
    }
  }

  loadAddresses() {
    const allAddresses = this.storageService.getAddresses();
    if (this.user) {
      this.addresses = allAddresses.filter(addr => addr.userId === this.user!.id);
    }
  }

  toggleAddressForm() {
    this.showAddressForm = !this.showAddressForm;
  }

  addAddress() {
    if (this.addressForm.invalid || !this.user) {
      alert('Lütfen tüm alanları doldurun!');
      return;
    }

    const newAddress: Address = {
      id: Date.now(),
      userId: this.user.id,
      title: this.addressForm.value.title,
      city: this.addressForm.value.city,
      district: this.addressForm.value.district,
      fullAddress: this.addressForm.value.fullAddress,
      zipCode: this.addressForm.value.zipCode,
      isDefault: this.addresses.length === 0,
      createdAt: new Date()
    };

    const allAddresses = this.storageService.getAddresses();
    allAddresses.push(newAddress);
    this.storageService.saveAddresses(allAddresses);

    this.addressForm.reset();
    this.showAddressForm = false;
    this.loadAddresses();
  }

  deleteAddress(id: number) {
    if (confirm('Bu adresi silmek istediğinize emin misiniz?')) {
      let allAddresses = this.storageService.getAddresses();
      allAddresses = allAddresses.filter(a => a.id !== id);
      this.storageService.saveAddresses(allAddresses);
      this.loadAddresses();
    }
  }

  setDefault(id: number) {
    if (!this.user) return;

    const allAddresses = this.storageService.getAddresses();
    
    allAddresses.forEach(addr => {
      if (addr.userId === this.user!.id) {
        addr.isDefault = (addr.id === id);
      }
    });

    this.storageService.saveAddresses(allAddresses);
    this.loadAddresses();
  }
}