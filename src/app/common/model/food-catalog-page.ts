import { Item } from './item';
import { Restaurant } from './restaurant';

export interface FoodCatalogPage {
  itemList: Item[];
  restaurant: Restaurant;
}