import { Component, OnInit } from '@angular/core';
import { SectionFacade } from 'src/app/domains/section-facade';
import { CardsListComponent } from 'src/app/shared/components/cards-list/cards-list.component';
import { Section } from 'src/app/shared/models/section.model';
@Component({
  selector: 'app-section-page',
  templateUrl: './section-page.html',
  styleUrls: ['./section-page.scss', '../../shared/components/cards-list/cards-list.component.scss'],
})

export class SectionPage implements OnInit {
  public sections: Section[] = [];
  public carouselItems: any[] = [];

  constructor(private sectionFacade: SectionFacade) {
    this.getAllSections();
  }

  ngOnInit(): void {
  }

  getAllSections() {
    this.sectionFacade.getAllSections().subscribe((sections) => {
      this.sections = sections;
      this.carouselItems = [];
      this.sections[0].image = 'assets/beach.jpg'
      this.sections[1].image = 'assets/hotel.jpg'
      for (let i = 0; i < this.sections.length; i++) {
        this.carouselItems.push({
          title: this.sections[i].title,
          description: this.sections[i].description,
          image: this.sections[i].image
        });
      }
    });
  }
}
