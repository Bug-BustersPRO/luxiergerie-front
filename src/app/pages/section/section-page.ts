import { Component, OnInit, effect, inject } from '@angular/core';
import { Section } from 'src/app/shared/models/section.model';
import { SectionService } from 'src/app/shared/services/section.service';
@Component({
  selector: 'app-section-page',
  templateUrl: './section-page.html',
  styleUrls: [
    './section-page.scss',
    '../../shared/components/cards-list/cards-list.component.scss',
  ],
})
export class SectionPage implements OnInit {
  public sections: Section[] = [];
  public carouselItems: any[] = [];
  public sectionService = inject(SectionService);

  constructor() {
    effect(() => {
      const sections = this.sectionService.getAllSections$();
      this.sections = sections;
      if (this.sections.length > 0) {
        this.carouselItems = [];
        this.sections[0].image = 'assets/beach.jpg';
        this.sections[1].image = 'assets/hotel.jpg';
        for (const element of this.sections) {
          this.carouselItems.push({
            title: element.title,
            description: element.description,
            image: element.image,
          });
        }
      }
    });
  }

  ngOnInit(): void {
    this.sectionService.getSections();
  }
}
