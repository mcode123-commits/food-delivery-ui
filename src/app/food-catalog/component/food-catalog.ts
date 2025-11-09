import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

import { FoodCatalogPage } from '../../common/model/food-catalog-page';
import { Item } from '../../common/model/item';
import { FoodService } from '../service/food-catalog.service';

@Component({
  selector: 'app-food-catalog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './food-catalog.html',
  styleUrls: ['./food-catalog.css'],
})
export class FoodCatalog implements OnInit {
  restaurantId = 0;
  itemResponse: FoodCatalogPage | null = null;
  itemCart: Item[] = [];
  orderSummary: FoodCatalogPage | null = null;

  constructor(
    private route: ActivatedRoute,
    private itemService: FoodService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.restaurantId = +idParam;
        this.getItemsByRestaurant(this.restaurantId);
      }
    });
  }

  getItemsByRestaurant(restaurantId: number): void {
    this.itemService
      .getItemsByRestaurant(restaurantId)
      .subscribe((data: FoodCatalogPage) => {
        console.log('API DATA:', data);
        this.itemResponse = data;
      });
  }

  increment(item: Item): void {
    const currentQty = item.quantity ?? 0;
    item.quantity = currentQty + 1;

    const index = this.itemCart.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    if (index === -1) {
      this.itemCart.push({ ...item });
    } else {
      this.itemCart[index] = { ...item };
    }
  }

  decrement(item: Item): void {
    const currentQty = item.quantity ?? 0;
    if (currentQty === 0) return;

    item.quantity = currentQty - 1;

    const index = this.itemCart.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    if (index !== -1) {
      if (item.quantity === 0) {
        this.itemCart.splice(index, 1);
      } else {
        this.itemCart[index] = { ...item };
      }
    }
  }

  onCheckOut(): void {
    if (!this.itemResponse) return;

    this.orderSummary = {
      itemList: [...this.itemCart],
      restaurant: this.itemResponse.restaurant,
    };

    this.router.navigate(['/app-order-summary'], {
      queryParams: { data: JSON.stringify(this.orderSummary) },
    });
  }

trackByItemId(index: number, item: Item): number {
  return item.id ?? index;
}

}
