import { Category } from "./category.model";

export class Store {
  id!: number;
  name!: string;
  about!: string;
  logo!: string;
  style!: string;
  phone!: string;
  email!: string;
  address!: string;
  facebook!: string;
  background!: string;
  categories!: Category[];
  colorMode!: string;
}
