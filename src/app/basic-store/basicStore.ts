import { BehaviorSubject, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Action } from "./action";
import { withState } from "./actionContext";
import { ReducerMap } from "./reducer";
import { Selector } from "./selector";
import {
  InferActionCreatorMapFromActionReducerMap,
  InferActionReducerMapFromReducerMap
} from "./typeInferences";

export class BasicStore<S, R extends ReducerMap<S, any>> {
  protected _state: BehaviorSubject<S>;
  protected _actionReducers: BehaviorSubject<
    InferActionReducerMapFromReducerMap<R>
  >;
  protected _dispatcher = new Subject<Action<any>>();

  get actions() {
    const actionCreators = Object.entries(this._actionReducers.value).reduce(
      (map, entry) => {
        const [actionType, actionReducer] = entry;
        map[actionType] = actionReducer.actionCreator;
        return map;
      },
      {} as { [actionType: string]: any }
    );

    return actionCreators as InferActionCreatorMapFromActionReducerMap<
      InferActionReducerMapFromReducerMap<R>
    >;
  }

  select<T>(selector: Selector<S, T>) {
    return selector({ ...this._state.value });
  }

  selectAsync<T>(selector: Selector<S, T>) {
    return this._state.asObservable().pipe(map(selector));
  }

  // TODO: Type check could probably be changed to only allow actions that are in _actionReducers
  dispatch<A extends Action<any>>(action: A) {
    if (!this._actionReducers[action.type]) {
      throw new Error(`No action registered with type '${action.type}'!`);
    }

    this._dispatcher.next(action);
  }

  protected _commitAction<A extends Action<any>>(action: A) {
    console.log("Action dispatched:", action);
  }

  constructor(initialState: S, reducers: R) {
    this._state = new BehaviorSubject(initialState);
    this._actionReducers = new BehaviorSubject(
      withState<S>().createActionReducerMap(reducers)
    );

    // Automatically commit actions to mutate the state
    this._dispatcher.subscribe(action => this._commitAction(action));
  }
}
