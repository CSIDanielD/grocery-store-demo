import { Injectable } from "@angular/core";
import { foodActions } from "../actions/food.actions";
import { inventoryActions } from "../actions/inventory.actions";
import { supplyActions } from "../actions/supplies.actions";
import { withState } from "../basic-store/actionContext";
import { BasicStore } from "../basic-store/basicStore";
import { GroceryState } from "../store/groceryState";

const context = withState<GroceryState>();
class TestProvider {
  constructor(private dep = 5) {}
  testActionA = context.createReducer((getState, value: number) => {
    const testVal = this.dep;
    return getState();
  });
  testActionB = context.createReducer((getState, str: string) => getState());
}

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
  ...inventoryActions,
  ...new TestProvider() // Nani?!
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

const testStore = new StoreService();
const { testActionA } = testStore.actions;
