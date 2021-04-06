import { withState } from "../basic-store/actionContext";
import { GroceryState } from "../store/groceryState";
import { Shipment } from "../types/shipment";

export const shipmentActions = withState<GroceryState>().createReducerMap({
  importShipment: (getState, shipment: Shipment) => {
    const state = getState();

    // Add the food and supplies from this shipment to the inventory
    state.inventory.foods = [...state.inventory.foods, ...shipment.foods];
    state.inventory.supplies = [
      ...state.inventory.supplies,
      ...shipment.supplies
    ];

    return state;
  },

  exportShipment: (getState, shipment: Shipment) => {
    const state = getState();

    // Remove the food and supplies listed in this shipment from the inventory
    state.inventory.foods = removeElementsById(
      state.inventory.foods,
      shipment.foods
    );

    state.inventory.supplies = removeElementsById(
      state.inventory.supplies,
      shipment.supplies
    );

    return state;
  }
});

function removeElementsById<T extends { id: number }>(
  arr: T[],
  idsToRemove: T[]
) {
  return arr.reduce(
    (reducedArr, elem) => {
      let found = false;
      for (const removeElem of idsToRemove) {
        if (elem.id === removeElem.id) {
          found = true;
          break;
        }

        if (!found) {
          reducedArr[elem.id] = elem;
        }

        return reducedArr;
      }
    },
    [] as T[]
  );
}
