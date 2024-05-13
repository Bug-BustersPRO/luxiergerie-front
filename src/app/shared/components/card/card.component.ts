import { Component, Input } from '@angular/core';
import { Section } from '../../models/section.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

constructor() {}
@Input() card!: any;
@Input() type!: string;
@Input() typeList!: string;
link!: string;


ngOnInit(): void {
  this.link = `${this.card.id}/${this.typeList}`
}

}
