export interface Inventory {
  foodItems: { [foodTypeId: number]: number };
  supplyItems: { [supplyTypeId: number]: number };
}
