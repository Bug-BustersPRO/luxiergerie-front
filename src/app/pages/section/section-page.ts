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
  public images: string[] = []; // to remove, it's a test for carousel

  constructor(private sectionFacade: SectionFacade) {
    this.getAllSections();
  }

  ngOnInit(): void {
    this.images.push('assets/beach.jpg', 'assets/hotel.jpg', 'assets/towel.jpg');// to remove, it's a test for carousel
  }

  getAllSections() {
    this.sectionFacade.getAllSections().subscribe((sections) => {
      this.sections = sections;
    });
  }

}
