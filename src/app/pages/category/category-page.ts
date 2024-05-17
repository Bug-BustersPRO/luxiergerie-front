import { Component, Input, OnInit, inject } from '@angular/core';
import { Category } from 'src/app/shared/models/category.model';
import { ActivatedRoute } from '@angular/router';
import { Section } from 'src/app/shared/models/section.model';
import { SectionService } from 'src/app/shared/services/section.service';
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

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const sectionId = this.route.snapshot.paramMap.get('id');
    if (sectionId) {
      this.getCategoriesBySection(sectionId);
    }
  }

  getCategoriesBySection(sectionId: string) {
    this.sectionService.getCategoriesBySection(sectionId).subscribe((categories) => {
      this.categories = categories;
    });
  }
}
