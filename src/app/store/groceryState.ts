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

const testActions = createActionContext<GroceryState>(
  "testActions"
).createReducerMap({
  addSupply: (getState, payload: { supply: Supply }) => {
    const state = getState();
    state.supplies.push(payload.supply);
    return state;
  }
});

const testStore = new BasicStore(defaultState, testActions);
const { addSupply } = testStore.actions;
const addPaperTowel = addSupply({
  supply: {
    id: 5,
    name: "Paper Towel",
    price: 7.99
  }
});

testStore.dispatch(addPaperTowel);
