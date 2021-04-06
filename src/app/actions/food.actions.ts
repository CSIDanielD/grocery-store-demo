import { withState } from "../basic-store/actionContext";
import { GroceryState } from "../store/groceryState";
import { Food } from "../types/food";

function findFoodById(foods: Food[], foodId: number) {
  const foodIndex = foods.findIndex(f => f.id === foodId);
  if (foodIndex < 0) {
    throw new Error(`Food with id '${foodId}' not found!`);
  }
  return foodIndex;
}

/** These are all the actions defining how we can update the global Food state. */
export const foodActions = withState<GroceryState>().createReducerMap({
  setFoods: (getState, foods: Food[]) => {
    const state = getState();
    state.inventory.foods = foods;
    return state;
  },

  addFood: (getState, food: Food) => {
    const state = getState();
    state.inventory.foods.push(food);
    return state;
  },

  updateFood: (getState, food: Food) => {
    const state = getState();
    const foodIndex = findFoodById(state.inventory.foods, food.id);

    // Update the food at the found index to the provided food obj.
    state.inventory.foods.splice(foodIndex, 1, food);
    return state;
  },

  removeFood: (getState, foodId: number) => {
    const state = getState();
    const foodIndex = findFoodById(state.inventory.foods, foodId);

    // Delete the food at the found index.
    state.inventory.foods.splice(foodIndex, 1);
    return state;
  }
});
