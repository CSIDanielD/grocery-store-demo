import { withState } from "../basic-store/actionContext";
import { GroceryState } from "../store/groceryState";
import { Food } from "../types/food";

function findFoodById(foodTypes: Food[], foodId: number) {
  const foodIndex = foodTypes.findIndex(f => f.id === foodId);
  if (foodIndex < 0) {
    throw new Error(`Food with id '${foodId}' not found!`);
  }
  return foodIndex;
}

/** These are all the actions defining how we can update the global Food state. */
export const foodActions = withState<GroceryState>().createReducerMap({
  setFoodTypes: (getState, foodTypes: Food[]) => {
    const state = getState();
    state.foodTypes = foodTypes;
    return state;
  },

  addFoodType: (getState, foodType: Food) => {
    const state = getState();
    state.foodTypes.push(foodType);
    return state;
  },

  updateFoodType: (getState, foodType: Food) => {
    const state = getState();
    const foodIndex = findFoodById(state.foodTypes, foodType.id);

    // Update the food at the found index to the provided food obj.
    state.foodTypes.splice(foodIndex, 1, foodType);
    return state;
  },

  removeFoodType: (getState, foodTypeId: number) => {
    const state = getState();
    const foodIndex = findFoodById(state.foodTypes, foodTypeId);

    // Delete the food at the found index.
    state.foodTypes.splice(foodIndex, 1);
    return state;
  }
});
