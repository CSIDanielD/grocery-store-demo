import { TypeScriptEmitter } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { asapScheduler, BehaviorSubject, Observable, scheduled } from "rxjs";
import { delay, map, take } from "rxjs/operators";
import { Selector } from "../basic-store/selector";
import { Food } from "../types/food";
import { Inventory } from "../types/inventory";
import { Item, ItemType } from "../types/item";

interface FakeDatabaseState {
  inventory: Inventory;
  itemTypes: Item[];
}

@Injectable({ providedIn: "root" })
export class FakeBackendService {
  private globalDelay = 500;

  private _fakeDatabase = new BehaviorSubject<FakeDatabaseState>({
    inventory: {
      1: 15,
      2: 50,
      3: 12,
      4: 23,
      7: 40,
      8: 5,
      13: 10
    },
    itemTypes: [
      { id: 1, type: "supply", name: "Toothpaste", price: 4.99 },
      { id: 2, type: "food", name: "Bundle of bananas", price: 2.75 },
      { id: 3, type: "food", name: "1 lb. of apples", price: 5.45 },
      { id: 4, type: "supply", name: "Paper towel roll", price: 1.25 },
      { id: 7, type: "medication", name: "Painkillers", price: 7.99 },
      { id: 8, type: "food", name: "1 lb. of grapes", price: 8.99 },
      { id: 13, type: "food", name: "6 oranges", price: 6.25 }
    ]
  });

  getFoodAndSupplies() {
    const foodAndSupplies = this.selectAsync(s => {
      const types = this.filterItemTypes(
        s.itemTypes,
        i => i.type === "food" || i.type === "supply"
      );

      const inventory = this.filterInventory(
        s.inventory,
        id => types.findIndex(t => t.id === id) > -1
      );

      return {
        inventory: inventory,
        itemTypes: types
      } as FakeDatabaseState;
    });

    return this.toDelayedSingleEmitter(foodAndSupplies);
  }

  getMedicationTypes() {
    const meds = this.selectAsync(s => {
      const types = this.filterItemTypes(
        s.itemTypes,
        i => i.type === "medication"
      );

      const inventory = this.filterInventory(
        s.inventory,
        id => types.findIndex(t => t.id === id) > -1
      );

      return {
        inventory: inventory,
        itemTypes: types
      } as FakeDatabaseState;
    });

    return this.toDelayedSingleEmitter(meds);
  }

  addFoodType(food: Food) {
    const item: Item = {
      id: -1,
      name: food.foodName,
      price: food.foodPrice,
      type: "food"
    };

    this.addItemType(item);
    return this.boolResponse(true);
  }

  /** Private helper methods */

  private _nextId = new BehaviorSubject<number>(34);

  private nextId() {
    this._nextId.next(this._nextId.value + 1);
    return this._nextId.value;
  }

  private toDelayedSingleEmitter<T>(obs: Observable<T>) {
    return obs
      .pipe(take(1)) // Only emit 1 value (similar to http.get)
      .pipe(delay(this.globalDelay)); // artifically delay the time until the value is emitted
  }

  private assignNewId(item: Item) {
    return { ...item, id: this.nextId() };
  }

  private filterItemTypes(items: Item[], pred: (item: Item) => boolean) {
    return items.filter(pred);
  }

  private filterInventory(
    inventory: Inventory,
    pred: (id: number, amount: number) => boolean
  ) {
    const inv = Object.entries(inventory).reduce(
      (inv, entry) => {
        const [id, amount] = entry;

        if (pred(Number.parseInt(id), amount)) {
          inv[id] = amount;
        }

        return inv;
      },
      {} as Inventory
    );

    return inv;
  }

  private select<T>(selector: Selector<FakeDatabaseState, T>) {
    return selector(this._fakeDatabase.value);
  }

  private selectAsync<T>(selector: Selector<FakeDatabaseState, T>) {
    return this._fakeDatabase.asObservable().pipe(map(selector));
  }

  private boolResponse(value: boolean) {
    return this.toDelayedSingleEmitter(scheduled([value], asapScheduler));
  }

  private addItemType(item: Item) {
    const newState = { ...this._fakeDatabase.value };
    newState.itemTypes.push(item);
    this._fakeDatabase.next(newState);
  }

  private removeTypeByPredicate(
    pred: (itemType: Item, index?: number) => boolean
  ) {
    const newState = { ...this._fakeDatabase.value };
    const newTypes = newState.itemTypes.filter((item, index) => {
      return !pred(item, index);
    });

    newState.itemTypes = newTypes;
    this._fakeDatabase.next(newState);
  }
}
