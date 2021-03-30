import { Injectable } from "@angular/core";
import { BasicStore } from "../basic-store/basicStore";
import { GroceryState } from "../types/groceryState";

@Injectable({ providedIn: "root" })
export class StoreService extends BasicStore<GroceryState> {
  static readonly defaultState: GroceryState = {
    foods: [],
    supplies: []
  };

  constructor() {
    super(StoreService.defaultState);
  }
}
