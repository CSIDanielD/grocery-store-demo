import { Food } from "./food";
import { Supply } from "./supply";

export interface Shipment {
  id: number;
  foods: Food[];
  supplies: Supply[];
}
