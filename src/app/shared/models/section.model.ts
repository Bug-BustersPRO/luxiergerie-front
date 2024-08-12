import { Category } from "./category.model";

export class Section {
  public id: string;
  public name: string;
  public urlImage: string;
  public image: File[];
  public description: string;
  public title: string;
  public categories: Category[];

  constructor(
    id: string,
    name: string,
    urlImage: string,
    image: File[],
    description: string,
    title: string,
    categories: Category[]) {
    this.id = id;
    this.name = name;
    this.urlImage = urlImage;
    this.image = image;
    this.description = description;
    this.title = title;
    this.categories = categories;
  }

}