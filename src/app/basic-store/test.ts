import { GroceryState } from "../store/groceryState";
import { withState } from "./actionContext";
import { ReducerMap } from "./reducer";

const context = withState<GroceryState>();
class TestProviderA {
  constructor(private dep = 5) {}
  testActionA = context.createReducer((getState, valueA: number) => {
    const testVal = this.dep;
    return getState();
  });
  testActionB = context.createReducer((getState, strB: string) => getState());
}

class TestProviderB {
  constructor(private dep = 5) {}
  testActionC = context.createReducer((getState, valueC: number) => {
    const testVal = this.dep;
    return getState();
  });
  testActionD = context.createReducer((getState, strD: string) => getState());
}

class TestProviderC {
  // ActionProviders can have their own fields, but they need to be protected or private. Otherwise, it'll break the providerMaps.
  private randomOneOffField: { val: string } = { val: "test" };
  constructor(private dep = 5) {}
  testActionE = context.createReducer((getState, valueE: number) => {
    const testVal = this.dep;
    return getState();
  });
  testActionF = context.createReducer((getState, strF: string) => getState());
}

function createProviderContext<Provider extends ReducerMap<any, any>>(
  provider: Provider
) {
  function mergeProvider<NewProvider extends ReducerMap<any, any>>(
    newProvider: NewProvider
  ) {
    return createProviderContext({ ...provider, ...newProvider });
  }

  return { provider: provider, mergeProvider: mergeProvider };
}

// Works! This is how we can fluently create ActionProviders
const providerMap = createProviderContext({ ...new TestProviderA() })
  .mergeProvider({ ...new TestProviderB() })
  .mergeProvider({ ...new TestProviderC() }); // You'll need to use the spread operator to extract only the public fields from the provider

const testARMap = context.createActionReducerMap(providerMap.provider);
testARMap.testActionE.actionCreator(5); // I literally can't believe this works so well.
