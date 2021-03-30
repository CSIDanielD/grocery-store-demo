import { ActionProps } from "./action";

export type ActionCreator<P = any> = (props: P) => ActionProps<P>;

/** Produces an action creator with the given prop type (P). */
export function actionCreator<P>(type: string): ActionCreator<P> {
  return (props: P) => {
    return { type: type, props: props };
  };
}
