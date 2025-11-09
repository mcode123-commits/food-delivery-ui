import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from '../service/order-summary.service';
import { Order } from '../model/order';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-summary.html',
  styleUrls: ['./order-summary.css'],
})
export class OrderSummary implements OnInit {
  orderSummary?: Order;
  obj: any;
  total = 0;
  showDialog = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const data = this.route.snapshot.queryParams['data'];

    if (!data) {
      console.error('No data found in query params');
      return;
    }

    this.obj = JSON.parse(data);
    this.obj.userId = 1;
    this.orderSummary = this.obj;

    const items = this.orderSummary?.itemList || [];
    this.total = items.reduce(
      (accumulator: number, currentValue: any) =>
        accumulator + currentValue.quantity * currentValue.price,
      0
    );
  }

  saveOrder(): void {
    if (!this.orderSummary) {
      console.error('orderSummary is undefined');
      return;
    }

    this.orderService.saveOrder(this.orderSummary).subscribe({
      next: () => {
        this.showDialog = true;
      },
      error: (error) => {
        console.error('Failed to save data:', error);
      },
    });
  }

  closeDialog(): void {
    this.showDialog = false;
    this.router.navigate(['/']);
  }
}
