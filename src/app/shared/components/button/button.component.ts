import { CommonModule, Location } from '@angular/common';
import { Component, Input, OnInit, inject, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent implements OnInit {

  ngOnInit(): void {
    this.isActionned();
  }

  text: string = '';
  background: string = '';
  backgroundPrimary: string = '#BD9E56';
  backgroundSecondary: string = '#8391AA';
  goToUrl: any = "";
  disabled = input<boolean>(false);
   
  @Input() action: string = 'Confirmer';

  router = inject(Router);
  location = inject(Location);

  isActionned() {
    switch (this.action) {
      case 'précédent':
        this.text = 'Précédent';
        this.background = this.backgroundSecondary;
        break;

      case 'annuler':
        this.text = 'Annuler';
        this.background = this.backgroundSecondary;
        break;

      case 'commander':
        this.text = 'Commander';
        this.background = this.backgroundPrimary;
        break;

      case 'fermer':
        this.text = 'Fermer';
        this.background = this.backgroundSecondary;
        break;

      case 'réserver':
        this.text = 'Réserver';
        this.background = this.backgroundPrimary;
        break;

      default:
        this.text = 'Confirmer';
        this.background = this.backgroundPrimary; 
    }
  }

  navigateTo() {
  switch (this.action) {
    case 'confirmer' :
      this.goToUrl = this.router.navigate(['/sections'])
      break

     case 'précédent':
    this.goToUrl = this.location.back();
        break; 
  }
}
}
