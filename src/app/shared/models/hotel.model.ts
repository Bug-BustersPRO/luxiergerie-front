export class Hotel {
  public id: string;
  public name: string;
  public images: File[];
  public colors: string[];

  constructor(id: string, name: string, images: File[], colors: string[]) {
    this.id = id;
    this.name = name;
    this.images = images;
    this.colors = colors;
  }
}