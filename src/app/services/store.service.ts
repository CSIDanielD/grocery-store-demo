import { Injectable } from "@angular/core";
import { foodActions } from "../actions/food.actions";
import { inventoryActions } from "../actions/inventory.actions";
import { shipmentActions } from "../actions/shipment.actions";
import { supplyActions } from "../actions/supplies.actions";
import { BasicStore } from "../basic-store/basicStore";
import { GroceryState } from "../store/groceryState";

const defaultState: GroceryState = {
  inventory: {
    foods: [],
    supplies: []
  }
};

const actions = {
  ...foodActions,
  ...supplyActions,
  ...shipmentActions,
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

const x = new StoreService();
const { updateFood, importShipment } = x.actions;
