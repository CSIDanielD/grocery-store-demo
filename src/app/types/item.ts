export interface Item {
  id: number;
  name: string;
  type: ItemType;
  price: number;
}

export type ItemType = "food" | "supply" | "medication";
