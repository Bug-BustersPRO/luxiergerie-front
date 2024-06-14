import { CommonModule, Location } from '@angular/common';
import { Component, Input, OnInit, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent implements OnInit {
  public text: string = '';
  public background: string = '';
  public backgroundPrimary: string = '#BD9E56';
  public backgroundSecondary: string = '#8391AA';
  public goToUrl: any = "";
  public disabled = input<boolean>(false);
  @Input() action: string = 'Confirmer';
  @Input() btnBackground: string = '';
  @Input() txtColor: string = '';

  constructor(private router: Router, private location: Location) { }

  ngOnInit(): void {
    this.isActionned();
  }

  isActionned() {
    switch (this.action) {
      case 'précédent':
        this.text = 'Précédent';
        this.background = this.btnBackground === '' ? this.backgroundSecondary : this.btnBackground;
        this.txtColor = this.txtColor === '' ? '#ffffff' : this.txtColor;
        break;

      case 'suivant':
        this.text = 'Suivant';
        this.background = this.btnBackground === '' ? this.backgroundPrimary : this.btnBackground;
        this.txtColor = this.txtColor === '' ? '#ffffff' : this.txtColor;
        break;

      case 'retour':
        this.text = 'Retour';
        this.background = this.btnBackground === '' ? this.backgroundSecondary : this.btnBackground;
        this.txtColor = this.txtColor === '' ? '#ffffff' : this.txtColor;
        break;

      case 'valider':
        this.text = 'Valider';
        this.background = this.btnBackground === '' ? this.backgroundPrimary : this.btnBackground;
        this.txtColor = this.txtColor === '' ? '#ffffff' : this.txtColor;
        break;

      case 'annuler':
        this.text = 'Annuler';
        this.background = this.btnBackground === '' ? this.backgroundSecondary : this.btnBackground;
        this.txtColor = this.txtColor === '' ? '#ffffff' : this.txtColor;
        break;

      case 'commander':
        this.text = 'Commander';
        this.background = this.btnBackground === '' ? this.backgroundPrimary : this.btnBackground;
        this.txtColor = this.txtColor === '' ? '#ffffff' : this.txtColor;
        break;

      case 'fermer':
        this.text = 'Fermer';
        this.background = this.btnBackground === '' ? this.backgroundSecondary : this.btnBackground;
        this.txtColor = this.txtColor === '' ? '#ffffff' : this.txtColor;
        break;

      case 'réserver':
        this.text = 'Réserver';
        this.background = this.btnBackground === '' ? this.backgroundPrimary : this.btnBackground;
        this.txtColor = this.txtColor === '' ? '#ffffff' : this.txtColor;
        break;

      default:
        this.text = 'Confirmer';
        this.background = this.btnBackground === '' ? this.backgroundPrimary : this.btnBackground;
        this.txtColor = this.txtColor === '' ? '#ffffff' : this.txtColor;
    }
  }

  navigateTo() {
    switch (this.action) {
      case 'confirmer':
        this.goToUrl = this.router.navigate(['/sections'])
        break

      case 'précédent':
        this.goToUrl = this.location.back();
        break;
    }
  }
}
