import { Category } from "./category.model";

export class Item {
  id!: number;
  name!: string;
  price!: number;
  description!: string;
  image!: string;
  category!: Category;
}
