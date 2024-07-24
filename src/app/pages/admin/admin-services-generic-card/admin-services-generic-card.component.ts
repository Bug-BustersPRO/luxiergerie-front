import { Component, Input, OnInit } from '@angular/core'
import { AdminHomeComponent } from '../admin-home/admin-home.component'
import { CommonModule, CurrencyPipe } from '@angular/common'
import { ModalComponent } from 'src/app/shared/components/modal/modal.component'
import { FormsModule } from '@angular/forms'

@Component({
    selector: 'app-admin-services-generic-card',
    templateUrl: './admin-services-generic-card.component.html',
    styleUrls: ['./admin-services-generic-card.component.scss'],
    standalone: true,
    imports: [
        AdminHomeComponent,
        CurrencyPipe,
        CommonModule,
        ModalComponent,
        FormsModule
    ],
})
export class AdminServicesGenericCardComponent {

    @Input() infos!: any
    @Input() image!: any
    public isModalOpen: boolean = false

    openModal() {
        this.isModalOpen = true
    }
}
