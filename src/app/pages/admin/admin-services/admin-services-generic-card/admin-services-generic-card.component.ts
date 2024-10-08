import { Component, Input } from '@angular/core'
import { CommonModule, CurrencyPipe } from '@angular/common'
import { ModalComponent } from 'src/app/shared/components/modal/modal.component'
import { FormsModule } from '@angular/forms'
import { AdminHomeComponent } from '../../admin-home/admin-home.component'

@Component({
  selector: 'app-admin-services-generic-card',
  templateUrl: './admin-services-generic-card.component.html',
  styleUrls: ['./admin-services-generic-card.component.scss'],
  standalone: true,
  imports: [AdminHomeComponent, CurrencyPipe, CommonModule, ModalComponent, FormsModule],
})
export class AdminServicesGenericCardComponent {

  @Input() infos!: any
  @Input() image!: any
  public isModalOpen: boolean = false

  openModal() {
    this.isModalOpen = true
  }

}