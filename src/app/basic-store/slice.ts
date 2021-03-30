import { ReducerMap } from "./reducer";

export interface SliceBuilderProps<S> {
  /** The name of the slice. */
  name: string;

  /** A map of actions to their reducer method. The keys of the map will be returned as an array of action creators. */
  reducers: ReducerMap<S>;

  /** A map of actions to their extra reducer method(s). The keys of this map aren't used to create actionCreators.  */
  extraReducers?: ReducerMap<S>;
}
