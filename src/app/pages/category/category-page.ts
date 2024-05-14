import { Component, Input, OnInit } from '@angular/core';
import { CategoryFacade } from 'src/app/domains/category-facade';
import { Category } from 'src/app/shared/models/category.model';
import { ActivatedRoute } from '@angular/router';
import { Section } from 'src/app/shared/models/section.model';
@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.html',
  styleUrls: ['./category-page.scss', '../../../styles.scss'],
})
export class CategoryPage implements OnInit {
  public categories: Category[] = [];
  public category!: Category;
  @Input() section!: Section;

  constructor(private categoryFacade: CategoryFacade, private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    const sectionId = this.route.snapshot.paramMap.get('id');
    if (sectionId) {
      this.getCategoriesBySection(sectionId);

    }
  }

  getCategoriesBySection(sectionId: string) {
    this.categoryFacade.getCategoriesBySection(sectionId).subscribe((categories) => {
      this.categories = categories;
    });
  }

  }
