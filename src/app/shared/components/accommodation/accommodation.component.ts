import { Component, Input, OnInit } from '@angular/core';
import { Accommodation } from '../../models/accommodation.model';

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.scss']
})
export class AccommodationComponent implements OnInit {

  @Input() accommodation!: Accommodation;

  constructor() { }

  ngOnInit() {
    this.accommodation.quantity = 0;
  }

}