import { Food } from "./food";
import { Supply } from "./supply";

export interface Inventory {
  foods: Food[];
  supplies: Supply[];
}
