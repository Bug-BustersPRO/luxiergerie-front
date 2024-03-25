import { Component, OnInit } from '@angular/core';
import { SectionFacade } from 'src/app/domains/section-facade';
import { Section } from 'src/app/shared/models/section.model';
@Component({
  selector: 'app-section-page',
  templateUrl: './section-page.html',
  styleUrls: ['./section-page.scss'],
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
