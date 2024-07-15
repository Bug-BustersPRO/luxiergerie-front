import { Component, Input } from '@angular/core';
import { Category } from '../../models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  @Input() category!: Category;

  constructor(private router: Router) { }

  navigateToAccommodations() {
    this.router.navigate([`categories/${this.category.id}/accommodations`])
  }

}
