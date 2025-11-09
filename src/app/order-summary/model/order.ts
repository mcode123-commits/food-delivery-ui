import { Item } from "../../common/model/item";
import { Restaurant } from "../../common/model/restaurant";

export interface Order {
    userId?: number;
    itemList?: Item[];
    restaurant?: Restaurant;
}