export class Hotel {
  public id: string;
  public name: string;
  public image: File[];
  public colors: string[];

  constructor(id: string, name: string, image: File[], colors: string[]) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.colors = colors;
  }
}