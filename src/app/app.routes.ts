import { Routes } from '@angular/router';
import { RestaurantCatalog } from './restaurant-catalog/component/restaurant-catalog';
import { FoodCatalog } from './food-catalog/component/food-catalog';


export const routes: Routes = [
  {
    path: '',
    component: RestaurantCatalog,
  },
  {
    path: 'app-food-catalog/:id',
    component: FoodCatalog,
  },
];
