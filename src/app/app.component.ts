import { Component, OnInit } from '@angular/core';
import { SectionFacade } from './3-domains/section-facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private sectionFacade: SectionFacade) {}
  title = 'luxiergerie';

  ngOnInit() {
    this.sectionFacade.getSections().subscribe();
  }
}
