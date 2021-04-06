import { withState } from "../basic-store/actionContext";
import { GroceryState } from "../store/groceryState";
import { Supply } from "../types/supply";

function findSupplyTypeById(supplyTypes: Supply[], supplyId: number) {
  const supplyIndex = supplyTypes.findIndex(s => s.id === supplyId);
  if (supplyIndex < 0) {
    throw new Error(`Supply with id '${supplyId}' not found!`);
  }

  return supplyIndex;
}

/** These are all the actions defining how we can update the global Supply state. */
export const supplyActions = withState<GroceryState>().createReducerMap({
  setSupplyTypes: (getState, supplyTypes: Supply[]) => {
    const state = getState();
    state.supplyTypes = supplyTypes;
    return state;
  },

  addSupplyType: (getState, supplyType: Supply) => {
    const state = getState();
    state.supplyTypes.push(supplyType);
    return state;
  },

  updateSupplyType: (getState, supplyType: Supply) => {
    const state = getState();
    const index = findSupplyTypeById(state.supplyTypes, supplyType.id);

    state.supplyTypes.splice(index, 1, supplyType);
    return state;
  },

  removeSupplyType: (getState, supplyTypeId: number) => {
    const state = getState();
    const index = findSupplyTypeById(state.supplyTypes, supplyTypeId);

    state.supplyTypes.splice(index, 1);
    return state;
  }
});
