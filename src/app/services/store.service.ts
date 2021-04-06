import { Injectable } from "@angular/core";
import { foodActions } from "../actions/food.actions";
import { inventoryActions } from "../actions/inventory.actions";
import { supplyActions } from "../actions/supplies.actions";
import { withState } from "../basic-store/actionContext";
import { BasicStore } from "../basic-store/basicStore";
import { GroceryState } from "../store/groceryState";

const context = withState<GroceryState>();
class TestProviderA {
  constructor(private dep = 5) {}
  testActionA = context.createReducer((getState, value: number) => {
    const testVal = this.dep;
    return getState();
  });
  testActionB = context.createReducer((getState, str: string) => getState());
}

class TestProviderB {
  constructor(private dep = 5) {}
  testActionC = context.createReducer((getState, value: number) => {
    const testVal = this.dep;
    return getState();
  });
  testActionD = context.createReducer((getState, str: string) => getState());
}

class TestProviderC {
  constructor(private dep = 5) {}
  testActionE = context.createReducer((getState, value: number) => {
    const testVal = this.dep;
    return getState();
  });
  testActionF = context.createReducer((getState, str: string) => getState());
}

// From https://github.com/microsoft/TypeScript/issues/32689#issuecomment-517933876
type Merge<A, B> = ({ [K in keyof A]: K extends keyof B ? B[K] : A[K] } &
  B) extends infer O
  ? { [K in keyof O]: O[K] }
  : never;

type ActionType = Merge<TestProviderA, TestProviderB>; // This works! Holy cow!

const defaultState: GroceryState = {
  inventory: {
    foodItems: {},
    supplyItems: {}
  },
  foodTypes: [],
  supplyTypes: []
};

const actions = {
  ...foodActions,
  ...supplyActions,
  ...inventoryActions,
  ...new TestProviderA() // Nani?!
};

@Injectable({ providedIn: "root" })
export class StoreService extends BasicStore<
  typeof defaultState,
  typeof actions
> {
  constructor() {
    super(defaultState, actions);
  }
}

const testStore = new StoreService();
const { testActionA } = testStore.actions;
