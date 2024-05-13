import { Component, OnInit } from '@angular/core';
import { SectionFacade } from 'src/app/domains/section-facade';
import { CardsListComponent } from 'src/app/shared/components/cards-list/cards-list.component';
import { Category } from 'src/app/shared/models/category.model';
import { Section } from 'src/app/shared/models/section.model';
import { Router} from '@angular/router';
@Component({
  selector: 'app-section-page',
  templateUrl: './section-page.html',
  styleUrls: ['./section-page.scss', '../../shared/components/cards-list/cards-list.component.scss'],
})

export class SectionPage implements OnInit {
  public sections: Section[] = [];
  public categories: Category[] = [];
 public typeList = 'categories';

  constructor(private sectionFacade: SectionFacade, private router: Router) {
    this.getAllSections();
  }

  ngOnInit(): void {
  }

  getAllSections() {
    this.sectionFacade.getAllSections().subscribe((sections) => {
      this.sections = sections;
    });
  }
}
