import { Action } from "./action";

export type Reducer<S, A extends Action> =
  | ((getState: () => S, action: A) => S)
  | ((getState: () => S, action: A) => Promise<S>);

export type ReducerMap<S = any, A extends Action = Action<any>> = {
  [actionType: string]: Reducer<S, A>;
};
