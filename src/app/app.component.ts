import { Component } from "@angular/core";
import { StoreService } from "./services/store.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private store: StoreService) {
    const { setFoodTypes } = store.actions;
    store.dispatch(
      setFoodTypes([{ id: 1, color: "yellow", name: "banana", price: 4.99 }])
    );
  }
}
