import { Component, OnInit } from '@angular/core';
import { CategoryFacade } from 'src/app/domains/category-facade';
import { SectionFacade } from 'src/app/domains/section-facade';
import { Category } from 'src/app/shared/models/category.model';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.html',
  styleUrls: ['./category-page.scss', '../../shared/components/cards-list/cards-list.component.scss'],
})
export class CategoryPage implements OnInit {
  public categories: Category[] = [];
  public category!: Category;
  public typeList = 'accommodations';

  constructor(private route: ActivatedRoute, private categoryFacade: CategoryFacade, private sectionFacade: SectionFacade, private router:Router) {
    const sectionId = this.getSectionId();
    this.getCategoriesBySection(sectionId);
  }

  ngOnInit(): void {

  }

  getSectionId(): string {
    const url = this.route.snapshot.url;
    const sectionUrlSegment = url.find(segment => segment.path === 'sections');
    if (sectionUrlSegment) {
      const idUrlSegment = url[1].path;
      if (idUrlSegment) {
        return idUrlSegment;
      }
    }
    return url[0].path;
  }

  getCategoriesBySection(id: string) {
    this.categories = [];
    this.sectionFacade.getCategoriesBySection(id).subscribe((categories) => {
      this.categories = categories;
    });
  }
  }
