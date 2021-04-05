import { Food } from "../types/food";
import { Supply } from "../types/supply";

export interface GroceryState {
  foods: Food[];
  supplies: Supply[];
}
