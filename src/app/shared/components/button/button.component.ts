import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent implements OnInit {
  ngOnInit(): void {
    this.isActionned();
  }
//availableAction: string[] = ["Confirmer","Précédent","Annuler","Suivant","Commander", "Fermer","Retour", "Réserver"]

  text: string ="";
  background: string ="";
  @Input() action : string = "Confirmer";

  isActionned() {
   switch (this.action) {
    case 'précédent' : 
      this.text = "Précédent";
      this.background = "#8391AA";
      break

    case 'annuler' :
      this.text = "Annuler";
      this.background = "#8391AA";
      break
     // au lieu de reprendre this.text partout prend action et algo uppercase 1ere lettre
    case 'suivant' :
      this.text = "Suivant";
      this.background = "#BD9E56";
      break
     
    case 'commander' :
      this.text = "Commander";
      this.background = "#BD9E56";
      break

    case 'fermer' :
      this.text = "Fermer";
      this.background = "#8391AA";
      break
      
    case 'retour' :
      this.text = "Retour";
      this.background = "#8391AA";
      break  

    case 'réserver' :
      this.text = "Réserver";
      this.background = "#BD9E56";
      break  

     default: 
      this.text = "Confirmer";
      this.background = "#BD9E56";

   }
}
}
