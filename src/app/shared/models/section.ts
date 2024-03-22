export class Section {
  id: string;
  name: string;
  image: string;
  categories: any[];

  constructor(id: string, name: string, image: string, categories: any[]) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.categories = categories;
  }

}
