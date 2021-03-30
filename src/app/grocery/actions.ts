import { Injectable } from "@angular/core";
import { ActionProps } from "../basic-store/action";
import { actionCreator } from "../basic-store/actionCreator";
import { BasicStore } from "../basic-store/basicStore";
import { Reducer } from "../basic-store/reducer";
import { StoreService } from "../services/store.service";
import { GroceryState } from "../types/groceryState";

// Create some kind of action container to

class ActionContext<S> {
  constructor(private store: BasicStore<S>) {}
  reducerFor<A extends ActionProps>(action: A, reducerFn: Reducer<S, A>) {
    this.store.registerReducer(action.type, reducerFn);
  }
}

interface GetFoodsWithNameProps {
  name: string;
}

@Injectable({ providedIn: "root" })
class GroceryActions {
  constructor(private store: StoreService) {}

  // Actions

  /** Action to get all the food and supplies. Doesn't take any props. */
  static readonly getInventory = actionCreator("getInventory");

  /** Action to get all the food items with the provided name. */
  static readonly getFoodsWithName = actionCreator<{ name: string }>(
    "getFoodsWithName"
  );

  // Reducers

  static readonly reducer: Reducer<GroceryState> = props => {
    return props.getState();
  };
}

// // This is how you'd create an action to get all bananas.
const getBananas = GroceryActions.getFoodsWithName({ name: "Banana" });
