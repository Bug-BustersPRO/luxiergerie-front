import { Component, Input } from '@angular/core';
import { Section } from '../../models/section.model';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss']
})
export class CardsListComponent {

constructor() { }

@Input() cards!: Section[];
}
