import { withState } from "../basic-store/actionContext";
import { GroceryState } from "./groceryState";

export const actions = withState<GroceryState>().createReducerMap({});
