import { Injectable } from "@angular/core";
import { foodActions } from "../actions/food.actions";
import { withState } from "../basic-store/actionContext";
import { BasicStore } from "../basic-store/basicStore";
import { GroceryState } from "../store/groceryState";

const defaultState: GroceryState = {
  foods: [],
  supplies: []
};

// const actions = withState<GroceryState>().createReducerMap({
//   testAction: (getState, id: number) => getState()
// });

const actions = { ...foodActions };

@Injectable({ providedIn: "root" })
export class StoreService extends BasicStore<
  typeof defaultState,
  typeof actions
> {
  constructor() {
    super(defaultState, actions);
  }
}
