import {Component, Input, OnInit, inject} from '@angular/core';
import {Category} from 'src/app/shared/models/category.model';
import {ActivatedRoute} from '@angular/router';
import {Section} from 'src/app/shared/models/section.model';
import {SectionService} from 'src/app/shared/services/section.service';
import {CategoryService} from 'src/app/shared/services/category.service';
@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.html',
  styleUrls: ['./category-page.scss'],
})
export class CategoryPage implements OnInit {
  public categories: Category[] = [];
  public category!: Category;
  @Input() section!: Section;
  sectionService = inject(SectionService);

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    const sectionId = this.route.snapshot.paramMap.get('id');
    if (sectionId) {
      this.getCategoriesBySection(sectionId);
    }
  }

  getCategoriesBySection(sectionId: string) {
    this.sectionService.getCategoriesBySection(sectionId).subscribe((categories) => {
      categories.forEach((category: Category) => {
        this.categoryService.getCategoryImageById(category.id).subscribe((categoryImage) => {
          const reader = new FileReader();
          reader.readAsDataURL(categoryImage);
          reader.onloadend = () => {
            category.urlImage = reader.result as string;
          };
          this.categoryService.getById(category.id).subscribe((response) => {
            category.section = response.section;
          });
        });
        this.categories.push(category);
      });
    });
  }
}
