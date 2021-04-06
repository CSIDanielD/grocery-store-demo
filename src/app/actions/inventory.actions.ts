import { withState } from "../basic-store/actionContext";
import { GroceryState } from "../store/groceryState";
import { Inventory } from "../types/inventory";

export const inventoryActions = withState<GroceryState>().createReducerMap({
  setInventory: (getState, inventory: Inventory) => {
    const state = getState();
    state.inventory = inventory;
    return state;
  },

  importInventory: (getState, inventory: Inventory) => {
    const state = getState();

    // Add the provided inventory amounts to the global inventory state.
    state.inventory.foodItems = alterMapObj(
      state.inventory.foodItems,
      inventory.foodItems,
      "import"
    );

    state.inventory.supplyItems = alterMapObj(
      state.inventory.supplyItems,
      inventory.supplyItems,
      "import"
    );

    return state;
  },

  exportInventory: (getState, inventory: Inventory) => {
    const state = getState();

    // Remove the provided inventory amounts from the global inventory state.
    state.inventory.foodItems = alterMapObj(
      state.inventory.foodItems,
      inventory.foodItems,
      "export"
    );

    state.inventory.supplyItems = alterMapObj(
      state.inventory.supplyItems,
      inventory.supplyItems,
      "export"
    );

    return state;
  }
});

function alterMapObj(
  original: { [id: number]: number },
  imported: { [id: number]: number },
  action: "import" | "export"
) {
  return Object.entries(imported).reduce(
    (map, entry) => {
      const [id, amount] = entry;
      map[id] = original[id] || 0;

      if (action === "import") {
        map[id] += amount;
      } else {
        map[id] -= amount;
        map[id] = map[id] < 0 ? 0 : map[id];
      }

      return map;
    },
    {} as {
      [id: number]: number;
    }
  );
}
