import { withState } from "../basic-store/actionContext";
import { GroceryState } from "../store/groceryState";
import { Inventory } from "../types/inventory";

export const inventoryActions = withState<GroceryState>().createReducerMap({
  setInventory: (getState, inventory: Inventory) => {
    const state = getState();
    state.inventory = inventory;
    return state;
  }
});
