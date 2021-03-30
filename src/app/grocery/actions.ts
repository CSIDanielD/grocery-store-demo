import { actionCreator } from "../basic-store/actionCreator";

/** Action to get all the food and supplies. Doesn't take any props. */
export const getInventory = actionCreator("getInventory");

/** Action to get all the food items with the provided name. */
export const getFoodsWithName = actionCreator<{ name: string }>(
  "getFoodsWithName"
);
