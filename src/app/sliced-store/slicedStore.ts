import { BehaviorSubject } from "rxjs";

export interface ActionProps<P = any> {
  type: string;
  props?: P;
}

export interface ReducerProps<S, P = any> {
  getState: () => S;
  action: ActionProps<P>;
}

export type Reducer<S, P = any> = (getState: () => S, props: P) => S;

export type ReducerMap<S, R extends Reducer<S, any>> = {
  [actionType: string]: R;
};

export class SlicedStore<S> {
  protected _state: BehaviorSubject<S>;
  // protected _reducers: BehaviorSubject<ReducerMap<S>>;
  // protected _dispatcher = new Subject<ActionProps>();

  createSlice<R extends ReducerMap<S, any>>(slice: {
    name: string;
    reducers: R;
  }) {
    return slice;
  }
}

//// TESTING BELOW ////

interface TestState {
  strings: string[];
}

function createReducer<P>(reducer: Reducer<TestState, P>) {
  return reducer;
}

function createMap<R extends ReducerMap<TestState, any>>(map: R) {
  return map;
}

const testStore = new SlicedStore<TestState>();

