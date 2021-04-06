import { withState } from "../basic-store/actionContext";
import { GroceryState } from "../store/groceryState";
import { Supply } from "../types/supply";

function findSupplyById(supplies: Supply[], supplyId: number) {
  const supplyIndex = supplies.findIndex(s => s.id === supplyId);
  if (supplyIndex < 0) {
    throw new Error(`Supply with id '${supplyId}' not found!`);
  }

  return supplyIndex;
}

/** These are all the actions defining how we can update the global Supply state. */
export const supplyActions = withState<GroceryState>().createReducerMap({
  setSupplies: (getState, supplies: Supply[]) => {
    const state = getState();
    state.inventory.supplies = supplies;
    return state;
  },

  addSupply: (getState, supply: Supply) => {
    const state = getState();
    state.inventory.supplies.push(supply);
    return state;
  },

  updateSupply: (getState, supply: Supply) => {
    const state = getState();
    const index = findSupplyById(state.inventory.supplies, supply.id);

    state.inventory.supplies.splice(index, 1, supply);
    return state;
  },

  removeSupply: (getState, supplyId: number) => {
    const state = getState();
    const index = findSupplyById(state.inventory.supplies, supplyId);

    state.inventory.supplies.splice(index, 1);
    return state;
  }
});
