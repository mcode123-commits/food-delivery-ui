import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from '../../common/models/restaurant';
import { RestaurantService } from '../service/restaurant-catalog.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-restaurant-catalog',
  imports: [CommonModule],
  templateUrl: './restaurant-catalog.html',
  styleUrl: './restaurant-catalog.css',
})
export class RestaurantCatalog implements OnInit {
  public restaurantList?: Restaurant[];
  ngOnInit() {
    this.getAllRestaurants();
  }
  constructor(private router: Router, private restaurantService: RestaurantService) {}

  getAllRestaurants() {
    this.restaurantService.getAllRestaurants().subscribe((data: Restaurant[]) => {
      console.log('RESTAURANTS FROM API:', data);
      this.restaurantList = data;
    });
  }

  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomImage(): string {
    const imageCount = 8;
    const randomIndex = this.getRandomNumber(1, imageCount);
    return `${randomIndex}.png`;
  }

  onButtonClick(id: number) {
    this.router.navigate(['/restaurant-catalog', id]);
  }
}
