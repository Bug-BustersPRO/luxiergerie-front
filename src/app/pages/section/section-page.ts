import { Component } from '@angular/core';
import { SectionFacade } from 'src/app/domains/section-facade';
import { Section } from 'src/app/shared/models/section.model';
@Component({
  selector: 'app-section-page',
  templateUrl: './section-page.html',
  styleUrls: ['./section-page.scss'],
})
export class SectionPage {
  public isModalOpen: boolean = false; // to use the modal, we need this variable
  public sections: Section[] = [];

  constructor(private sectionFacade: SectionFacade) {
    this.getAllSections();
  }

  getAllSections() {
    this.sectionFacade.getAllSections().subscribe((sections) => {
      this.sections = sections;
    });
  }

  // this function allows us to open the modal
  openModal() {
    this.isModalOpen = true;
  }

}
