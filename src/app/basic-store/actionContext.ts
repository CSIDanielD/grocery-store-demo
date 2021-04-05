import { Action, ActionCreator } from "./action";
import {
  InferActionReducerFromReducer,
  InferActionReducerMapFromReducerMap
} from "./actionReducer";
import { ReducerMap } from "./reducer";

export interface ActionContext<State> {
  readonly createReducerMap: <M extends ReducerMap<State, any>>(map: M) => M;
  readonly createActionCreator: <P = any>(type: string) => ActionCreator<P>;
  readonly createActionReducerMap: <M extends ReducerMap<State, Action>>(
    reducerMap: M
  ) => InferActionReducerMapFromReducerMap<M>;
}

// Create a "Context" for ActionReducer creation methods.
// This is a Curry function used to inject the provided State type into its returned methods
// to allow Typescript's type inference to work correctly. Typescript doesn't support partial
// type inference (you either provide all generic params or none), so this is the way around that.
export function withState<State>(): ActionContext<State> {
  function createReducerMap<M extends ReducerMap<State, any>>(map: M): M {
    return map;
  }

  function createActionCreator<P = any>(type: string): ActionCreator<P> {
    return (payload: P) => {
      return { type: type, payload: payload };
    };
  }

  // TODO: Change this so that the Reducer takes a payload type instead of an action.
  // This will let us annotate the payload like "payload: number" to get the payload we need in the reducer.
  function createActionReducerMap<M extends ReducerMap<State, Action<any>>>(
    reducerMap: M
  ): InferActionReducerMapFromReducerMap<M> {
    const actionReducerMap = Object.entries(reducerMap).reduce(
      (map, entry) => {
        const [actionType, reducer] = entry;

        const actionReducer: InferActionReducerFromReducer<typeof reducer> = {
          actionCreator: createActionCreator(actionType),
          reducer: reducer
        };

        map[actionType] = actionReducer;

        return map;
      },
      {} as { [actionType: string]: any }
    );

    return actionReducerMap as InferActionReducerMapFromReducerMap<M>;
  }

  return {
    createReducerMap: createReducerMap,
    createActionCreator: createActionCreator,
    createActionReducerMap: createActionReducerMap
  };
}
