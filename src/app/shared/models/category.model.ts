import { Accommodation } from './accommodation.model'
import { Section } from './section.model'

export class Category {
  public id: string
  public name: string
  public description: string
  public image: File[]
  public urlImage: string | ArrayBuffer | null
  public accommodations: Accommodation[]
  public section: Section

  constructor(
    id: string,
    name: string,
    description: string,
    image: File[],
    urlImage: string | ArrayBuffer | null,
    accommodations: Accommodation[],
    section: Section
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.image = image
    this.urlImage = urlImage
    this.accommodations = accommodations
    this.section = section
  }

}