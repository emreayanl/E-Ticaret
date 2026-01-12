import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../models/product.model';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css'],
  standalone: false
})
export class ProductListComponent implements OnInit {
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];

  searchTerm: string = '';
  selectedCategory: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  onlyInStock: boolean = false;
  sortOrder: string = 'newest';

  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.allProducts = this.storageService.getProducts();
    this.extractCategories();
    this.applyFilters();
  }

  extractCategories() {
    const uniqueCategories = new Set(this.allProducts.map(p => p.category));
    this.categories = Array.from(uniqueCategories);
  }

  onSortChange(event: any) {
    this.sortOrder = event.target.value;
    this.applyFilters();
  }

  applyFilters() {
    let temp = [...this.allProducts];

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      temp = temp.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.brand.toLowerCase().includes(term)
      );
    }

    if (this.selectedCategory) {
      temp = temp.filter(p => p.category === this.selectedCategory);
    }

    if (this.minPrice !== null) {
      temp = temp.filter(p => p.price >= this.minPrice!);
    }

    if (this.maxPrice !== null) {
      temp = temp.filter(p => p.price <= this.maxPrice!);
    }

    if (this.onlyInStock) {
      temp = temp.filter(p => p.stock > 0);
    }

    if (this.sortOrder === 'price-asc') {
      temp.sort((a, b) => a.price - b.price);
    } else if (this.sortOrder === 'price-desc') {
      temp.sort((a, b) => b.price - a.price);
    } else if (this.sortOrder === 'newest') {
      temp.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    this.filteredProducts = temp;
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.onlyInStock = false;
    this.sortOrder = 'newest';
    this.applyFilters();
  }

  goToDetail(id: number) {
    this.router.navigate(['/products', id]);
  }
}