import { Injectable } from "@angular/core";
import { withState } from "../basic-store/actionContext";
import { GroceryState } from "../store/groceryState";
import { Food } from "../types/food";

@Injectable({ providedIn: "root" })
export class FoodService {
  private _foods: Food[] = [
    { id: 1, color: "yellow", name: "banana", price: 4.99 }
  ];

  private _findFoodById(foods: Food[], foodId: number) {
    const foodIndex = foods.findIndex(f => f.id === foodId);
    if (foodIndex < 0) {
      throw new Error(`Food with id '${foodId}' not found!`);
    }
    return foodIndex;
  }

  actions = withState<GroceryState>().createReducerMap({
    getFoods: getState => {
      const state = getState();
      state.foods = this._foods;
      return state;
    },

    addFood: (getState, payload: { food: Food }) => {
      const state = getState();
      state.foods.push(payload.food);
      return state;
    },

    updateFood: (getState, payload: { food: Food }) => {
      const state = getState();
      const foodIndex = this._findFoodById(state.foods, payload.food.id);

      // Update the food at the found index to the provided food obj.
      state.foods.splice(foodIndex, 1, payload.food);
      return state;
    },

    removeFood: (getState, foodId: number) => {
      const state = getState();
      const foodIndex = this._findFoodById(state.foods, foodId);

      // Delete the food at the found index.
      state.foods.splice(foodIndex, 1);
      return state;
    }
  });
}
