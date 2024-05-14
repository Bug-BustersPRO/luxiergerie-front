import { Component, Input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Section } from '../../models/section.model';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent {

  @Input() section!: Section;
  link: string = '';

  constructor() { }

  ngOnInit(): void {
    this.link = `${this.section.id}/categories`;
  }
}
