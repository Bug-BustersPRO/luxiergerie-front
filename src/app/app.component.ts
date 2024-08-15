import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public title = 'luxiergerie';
  public showNavbar: boolean = true;
  constructor(public router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !event.url.includes('login') && !event.url.includes('config-hotel') && !event.url.includes('admin');
      }
      if (event instanceof NavigationEnd) {
        if (event.url.includes('login') || event.url.includes('config-hotel') || event.url.includes('admin')) {
          document.getElementById('app-container')?.style.setProperty('height', '100%');
          document.body.style.setProperty('height', '');
        } else {
          document.getElementById('app-container')?.style.setProperty('height', '');
        }
      }
    });
  }

}