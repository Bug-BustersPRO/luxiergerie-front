import { Component } from '@angular/core';
import { SectionFacade } from 'src/app/domains/section-facade';
import { Section } from 'src/app/shared/models/section.model';
@Component({
  selector: 'app-section-page',
  templateUrl: './section-page.html',
  styleUrls: ['./section-page.scss', '../../shared/components/cards-list/cards-list.component.scss'],
})

export class SectionPage {
  public sections: Section[] = [];
  public carouselItems: any[] = [];

  constructor(private sectionFacade: SectionFacade) {
    this.getAllSections();
  }

  getAllSections() {
    this.sectionFacade.getAllSections().subscribe((sections) => {
      this.sections = sections;
      this.carouselItems = [];
      this.sections[0].image = 'assets/beach.jpg'
      this.sections[1].image = 'assets/hotel.jpg'
      for (const element of this.sections) {
        this.carouselItems.push({
          title: element.title,
          description: element.description,
          image: element.image
        });
      }
    });
  }
}
