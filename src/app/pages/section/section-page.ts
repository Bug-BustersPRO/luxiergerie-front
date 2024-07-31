import { Component, OnInit, effect, inject } from '@angular/core'
import { Section } from 'src/app/shared/models/section.model'
import { SectionService } from 'src/app/shared/services/section.service'
@Component({
    selector: 'app-section-page',
    templateUrl: './section-page.html',
    styleUrls: ['./section-page.scss', '../../../styles.scss'],
})
export class SectionPage implements OnInit {
    public isModalOpen: boolean = false // to use the modal, we need this variable
    public section!: Section
    public sections: Section[] = []
    public carouselItems: any[] = []
    public sectionService = inject(SectionService)

    constructor() {
        effect(() => {
            const sections = this.sectionService.getAllSectionsSig()
            this.sections = sections

            if (this.sections.length > 0) {
            for (const element of this.sections) {
                this.sectionService
                .getSectionImageById(element.id)
                .subscribe((sectionImage) => {
                    const reader = new FileReader()
                    reader.readAsDataURL(sectionImage)
                    reader.onloadend = () => {
                      element.urlImage = reader.result as string
                    }
                })
            }
          }
        })
    }

    ngOnInit(): void {
        this.sectionService.getSections()
    }

    // this function allows us to open the modal
    openModal() {
        this.isModalOpen = true
    }
}
