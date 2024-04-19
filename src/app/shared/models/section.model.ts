
import { Category } from "./category.model";

export class Section {
  public id: string;
  public name: string;
  public image: string;
  public categories: Category[];

  constructor(id: string, name: string, image: string, categories: Category[]) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.categories = categories;
  }

}
