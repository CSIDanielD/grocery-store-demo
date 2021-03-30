import { BehaviorSubject, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { ActionProps } from "./action";
import { actionTypeBuilder } from "./actionTypeBuilder";
import { ReducerProps, ReducerMap, Reducer } from "./reducer";
import { Selector } from "./selector";
import { SliceBuilderProps } from "./slice";

export class BasicStore<S> {
  protected _state: BehaviorSubject<S>;
  protected _reducers: BehaviorSubject<ReducerMap<S>>;
  protected _dispatcher = new Subject<ActionProps>();

  select<T>(selector: Selector<S, T>) {
    return selector({ ...this._state.value });
  }

  selectAsync<T>(selector: Selector<S, T>) {
    return this._state.asObservable().pipe(map(selector));
  }

  /** A helper method to create actions and reducers quickly, with less boilerplate. */
  createSlice(slice: SliceBuilderProps<S>) {
    // Get the list of actions from the keys of the reducer map.
    const actionKeys = Object.keys(slice.reducers);
    const createActionType = actionTypeBuilder(slice.name);

    const actions = actionKeys.reduce((map, action) => {
      const type = createActionType(action);

      return map;
    }, {});
  }

  registerReducer(
    actionType: string,
    reducer: Reducer<S>,
    replaceExisting = false
  ) {
    const reducers = { ...this._reducers.value };
    if (!replaceExisting && reducers[actionType]) {
      throw new Error(`Reducer already registered for action '${actionType}'!`);
    }

    reducers[actionType] = reducer;
    this._reducers.next(reducers);
  }

  dispatchAction<A extends ActionProps>(action: A) {
    this._dispatcher.next(action);
  }

  protected async _commitAction<A extends ActionProps>(action: A) {
    const props: ReducerProps<S, A> = {
      getState: () => {
        return this.select(s => s);
      },
      action: action
    };

    const reducer = this._reducers.value[action.type];
    if (!reducer) {
      throw new Error(`No reducer for action '${action.type}'!`);
    }

    const evaluatedState = new Promise<S>((resolve, reject) => {
      return resolve(reducer(props));
    });

    const newState = await evaluatedState;
    this._state.next({ ...newState });
  }

  constructor(initialState: S, reducers?: ReducerMap<S>) {
    this._state = new BehaviorSubject(initialState);
    this._reducers = new BehaviorSubject(reducers || {});

    // Automatically commit actions to update the state.
    this._dispatcher.subscribe(a => this._commitAction(a));
  }
}
