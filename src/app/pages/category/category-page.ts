import { Component, OnInit } from '@angular/core';
import { CategoryFacade } from 'src/app/domains/category-facade';
import { SectionFacade } from 'src/app/domains/section-facade';
import { Category } from 'src/app/shared/models/category.model';
@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.html',
  styleUrls: ['./category-page.scss', '../../shared/components/cards-list/cards-list.component.scss'],
})
export class CategoryPage implements OnInit {
  public categories: Category[] = [];

  constructor(private categoryFacade: CategoryFacade, private sectionFacade: SectionFacade) {
    this.getAllCategories();
  }

  ngOnInit(): void {
  }

  getAllCategories() {
    this.categoryFacade.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
    console.log(this.categories);
  }

/*   getAllCategoriesBySection() {
    this.sectionFacade.getCategoriesBySection(1).subscribe((categories) => {
      this.categories = categories;
    }); */
  }
