import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../../services/storage.service';
import { Order } from '../../../models/order.model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.html',
  styleUrls: ['./order-detail.css'],
  standalone: false
})
export class OrderDetailComponent implements OnInit {
  order: Order | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const session = this.storageService.getSession();

    if (!session) {
      this.router.navigate(['/auth/login']);
      return;
    }

    const orders = this.storageService.getOrders(session.id);
    this.order = orders.find(o => o.id === id);

    if (!this.order) {
      this.router.navigate(['/orders']);
    }
  }
}