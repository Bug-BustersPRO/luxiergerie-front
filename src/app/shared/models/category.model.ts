import { Accommodation } from "./accommodation.model";
import { Section } from "./section.model";

export class Category {
  public id: string;
  public name: string;
  public description: string;
  public image: Blob;
  public urlImage: string;
  public accommodations: Accommodation[];
  public section: Section;

  constructor(id: string, name: string, description: string, image: Blob, urlImage:string, accommodations: Accommodation[], section: Section) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.urlImage = urlImage;
    this.accommodations = accommodations;
    this.section = section;
  }
}
