import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../services/storage.service';
import { Order } from '../../../models/order.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.html',
  styleUrls: ['./order-list.css'],
  standalone: false
})
export class OrderListComponent implements OnInit {
  myOrders: Order[] = [];

  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const session = this.storageService.getSession();

    if (session) {
      const allOrders: Order[] = this.storageService.getOrders();
      
      this.myOrders = allOrders
        .filter(order => order.userId === session.id)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
}