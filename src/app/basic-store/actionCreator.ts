import { ActionProps } from "./action";

export type ActionCreator<P = any> = (props: P) => ActionProps<P>;

/** Produces an action creator with the given prop type (P). */
export function actionCreator<P>(type: string): ActionCreator<P> {
  const actionCreator = (props: P) => {
    return { type: type, props: props };
  };

  // Overload the default toString to provide the action type when called.
  actionCreator.toString = () => `${type}`;

  return actionCreator;
}
