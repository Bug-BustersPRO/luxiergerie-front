import { Component } from '@angular/core';
import { SectionFacade } from 'src/app/domains/section-facade';
import { Section } from 'src/app/shared/models/section.model';
import { Router} from '@angular/router';
@Component({
  selector: 'app-section-page',
  templateUrl: './section-page.html',
  styleUrls: ['./section-page.scss', '../../../styles.scss'],
})

export class SectionPage {
  public isModalOpen: boolean = false; // to use the modal, we need this variable
  public sections: Section[] = [];
  public section!: Section;
  public carouselItems: any[] = [];

  constructor(private sectionFacade: SectionFacade, private router: Router) {
    this.getAllSections();
  }

  getAllSections() {
    this.sectionFacade.getAllSections().subscribe((sections) => {
      this.sections = sections;
      this.carouselItems = [];
      this.sections[0].urlImage = 'assets/beach.jpg'
      this.sections[1].urlImage = 'assets/hotel.jpg'
      for (let i = 0; i < this.sections.length; i++) {
        this.carouselItems.push({
          name: this.sections[i].name,
          description: this.sections[i].description,
          image: this.sections[i].urlImage
        });
      }
    });
  }

  // this function allows us to open the modal
  openModal() {
    this.isModalOpen = true;
  }

}
