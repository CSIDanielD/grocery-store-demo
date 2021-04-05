import { createActionContext } from "../basic-store/actionContext";
import { BasicStore } from "../basic-store/basicStore";
import { Food } from "../types/food";
import { Supply } from "../types/supply";

export interface GroceryState {
  foods: Food[];
  supplies: Supply[];
}

export const defaultState: GroceryState = {
  foods: [],
  supplies: []
};

const supplyActions = createActionContext<GroceryState>(
  "supplyActions"
).createReducerMap({
  addSupply: (getState, payload: { supply: Supply }) => {
    const state = getState();
    state.supplies.push(payload.supply);
    return state;
  }
});

const foodActions = createActionContext<GroceryState>(
  "foodActions"
).createReducerMap({
  addFood: (getState, payload: { food: Food }) => {
    const state = getState();
    state.foods.push(payload.food);
    return state;
  }
});

// Here's how to combine the actions objects into a single object that has all actions (an intersection type).
// You MUST precede all actions with the spread operator (...) for their properties to properly map to the object 
const allActions = {
  ...supplyActions,
  ...foodActions
};

const testStore = new BasicStore(defaultState, allActions);
const { addSupply, addFood } = testStore.actions;
const addPaperTowel = addSupply({
  supply: {
    id: 5,
    name: "Paper Towel",
    price: 7.99
  }
});

testStore.dispatch(addPaperTowel);
