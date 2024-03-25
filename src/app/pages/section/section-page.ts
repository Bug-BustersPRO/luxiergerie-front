import { Component, OnInit } from '@angular/core';
import { Section } from 'src/app/shared/models/section.model';
import { SectionService } from 'src/app/shared/services/section-service';

@Component({
  selector: 'app-section-page',
  templateUrl: './section-page.html',
  styleUrls: ['./section-page.scss'],
})
export class SectionPage implements OnInit {
  public sections: Section[] = [];

  constructor(private sectionService: SectionService) {}

  ngOnInit(): void {
    this.showSections();
  }

  showSections() {
    this.sectionService.getSections().subscribe((sections) => {
      this.sections = sections;
      console.log('sections', this.sections);
      const categories = this.sections.map((section) => section.categories);
      console.log('categories', categories);

    });

  }
}
