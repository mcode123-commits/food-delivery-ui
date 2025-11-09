import { Routes } from '@angular/router';
import { RestaurantCatalog } from './restaurant-catalog/component/restaurant-catalog';
import { FoodCatalog } from './food-catalog/component/food-catalog';
import { OrderSummary } from './order-summary/component/order-summary';


export const routes: Routes = [
  {
    path: '',
    component: RestaurantCatalog,
  },
  {
    path: 'app-food-catalog/:id',
    component: FoodCatalog,
  },
    {
    path: 'app-order-summary',
    component: OrderSummary,
  },
];