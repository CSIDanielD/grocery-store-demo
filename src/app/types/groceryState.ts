import { Food } from "./food";
import { Supply } from "./supply";

export interface GroceryState {
  foods: Food[];
  supplies: Supply[];
}
