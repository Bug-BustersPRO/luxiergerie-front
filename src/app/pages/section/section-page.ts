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

  constructor(private sectionFacade: SectionFacade) {}

  ngOnInit(): void {
    this.sectionFacade.getAllSections().subscribe((sections) => {
      this.sections = sections;
    });

  }
}
