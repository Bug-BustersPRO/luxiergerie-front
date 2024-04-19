import { Component, Input } from '@angular/core';
import { Section } from '../../models/section.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  constructor() { }
@Input() card!: Section;
isSection: boolean = false;

ngOnInit(): void {
  if (this.card instanceof Section) {
    this.isSection = true;
  }
  console.log(this.card);
}

}
