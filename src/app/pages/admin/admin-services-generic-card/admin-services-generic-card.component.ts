import { Component, Input, OnInit } from '@angular/core'
import { AdminHomeComponent } from '../admin-home/admin-home.component'
import { Accommodation } from 'src/app/shared/models/accommodation.model'
import { Section } from 'src/app/shared/models/section.model'
import { Category } from 'src/app/shared/models/category.model'
import { CommonModule, CurrencyPipe } from '@angular/common'
import { ModalComponent } from 'src/app/shared/components/modal/modal.component'
import { FormsModule } from '@angular/forms'
import { CoreService } from 'src/app/shared/services/core.service'

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
