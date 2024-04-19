import { Category } from "./category.model";

export class Section {
  public id: string;
  public name: string;
  public image: string;
  public description: string;
  public title: string;
  public categories: Category[];

  constructor(id: string, name: string, image: string, description: string, title:string, categories: Category[]) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.description = description;
    this.title = title;
    this.categories = categories;
  }

}
