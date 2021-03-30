import { ActionProps } from "./action";

export function actionTypeBuilder(sliceName: string) {
  return function(actionType: string) {
    return sliceName ? `${sliceName}/${actionType}` : actionType;
  };
}
