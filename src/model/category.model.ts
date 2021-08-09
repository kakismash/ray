import { Item } from "./item.model";
import { Store } from "./store.model";

export class Category {
  id!: number;
  name!: string;
  items!: Item[];
  image!: string;
  store!: Store;
}
