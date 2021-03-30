import { ActionProps } from "./action";

export interface ReducerProps<S, A extends ActionProps> {
  getState: () => S;
  action: A;
}

export type Reducer<S, A extends ActionProps = any> =
  | ((props: ReducerProps<S, A>) => S)
  | ((props: ReducerProps<S, A>) => Promise<S>);

export type ReducerMap<S> = { [actionType: string]: Reducer<S> };
