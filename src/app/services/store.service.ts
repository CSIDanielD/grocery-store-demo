import { Injectable } from "@angular/core";
import { foodActions } from "../actions/food.actions";
import { inventoryActions } from "../actions/inventory.actions";
import { supplyActions } from "../actions/supplies.actions";
import { BasicStore } from "../basic-store/basicStore";
import { GroceryState } from "../store/groceryState";

const defaultState: GroceryState = {
  inventory: {
    foodItems: {},
    supplyItems: {}
  },
  foodTypes: [],
  supplyTypes: []
};

const actions = {
  ...foodActions,
  ...supplyActions,
  ...inventoryActions
};

@Injectable({ providedIn: "root" })
export class StoreService extends BasicStore<
  typeof defaultState,
  typeof actions
> {
  constructor() {
    super(defaultState, actions);
  }
}