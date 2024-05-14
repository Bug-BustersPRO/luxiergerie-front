import { Component, Input } from '@angular/core';
import { Section } from '../../models/section.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent {

  @Input() section!: Section;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToCategories() {
    this.router.navigate([`sections/${this.section.id}/categories`]);
  }
}
