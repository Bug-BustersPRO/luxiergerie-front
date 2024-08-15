export class Hotel {
  public id: string;
  public name: string;
  public image: File[];
  public backgroundImage: File[];
  public colors: string[];

  constructor(id: string, name: string, image: File[], colors: string[], backgroundImage: File[]) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.colors = colors;
    this.backgroundImage = backgroundImage;
  }

}