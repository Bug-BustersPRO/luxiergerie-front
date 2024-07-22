import {
    ChangeDetectorRef,
    Component,
    effect,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core'
import { AdminServicesGenericCardComponent } from '../admin-services-generic-card/admin-services-generic-card.component'
import { Section } from 'src/app/shared/models/section.model'
import { Category } from 'src/app/shared/models/category.model'
import { Accommodation } from 'src/app/shared/models/accommodation.model'
import { ModalComponent } from '../../../shared/components/modal/modal.component'
import { FormsModule, NgForm } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { AdminServiceFormComponent } from './admin-services-form/admin-service-form/admin-service-form.component'
import { SectionService } from 'src/app/shared/services/section.service'
import { CategoryService } from 'src/app/shared/services/category.service'
import { AccommodationService } from 'src/app/shared/services/accommodation.service'

@Component({
    selector: 'app-admin-services',
    templateUrl: './admin-services.component.html',
    styleUrls: ['./admin-services.component.scss'],
    standalone: true,
    imports: [
        AdminServicesGenericCardComponent,
        ModalComponent,
        FormsModule,
        CommonModule,
        AdminServiceFormComponent,
    ],
})
export class AdminAccomodationsComponent {
    public sectionsWithImage: Section[] = []
    public categoriesWithImage: Category[] = []
    public accommodationsWithImages: Accommodation[] = []
    public reset: boolean = false
    public infos: any = []
    public typeForChoice: string = ''
    public typeForDisplay: string = ''
    public image: any
    public imageUrl: string | ArrayBuffer | null = null
    public isModalOpen: boolean = false
    public openModalForCreation: boolean = false

    constructor(
        private sectionService: SectionService,
        private categoryService: CategoryService,
        private accommodationService: AccommodationService,
        private cdRef: ChangeDetectorRef
    ) {
        this.sectionService.getSections()
        this.categoryService.getAll()
        this.accommodationService.getAll()
        effect(() => {
            this.getSections()
        })
    }

    getSections() {
        const sections = this.sectionService.getAllSectionsSig()
        sections.forEach((section: Section) => {
            this.sectionService
                .getSectionImageById(section.id)
                .subscribe((sectionImage) => {
                    const reader = new FileReader()
                    reader.readAsDataURL(sectionImage)
                    reader.onloadend = () => {
                        section.urlImage = reader.result as string
                    }
                })
            this.sectionsWithImage.push(section)
        })
    }

    getCategoriesBySection(id: any) {
        this.categoriesWithImage = []
        this.categoryService
            .getCategoriesBySection(id)
            .subscribe((categories: Category[]) => {
                categories.forEach((category: Category) => {
                    this.categoryService
                        .getCategoryImageById(category.id)
                        .subscribe((categoryImage) => {
                            const reader = new FileReader()
                            reader.readAsDataURL(categoryImage)
                            reader.onloadend = () => {
                                category.urlImage = reader.result as string
                            }
                        })
                    this.categoriesWithImage.push(category)
                })
            })
        if (this.reset) {
            this.accommodationsWithImages = []
            this.reset = false
        }
    }

    getAccommodationsByCategory(id: string) {
        this.accommodationsWithImages = []

        this.accommodationService
            .getAccommodationsByCategory(id)
            .subscribe((accommodations: Accommodation[]) => {
                accommodations.forEach((accommodation: Accommodation) => {
                    this.accommodationService
                        .getAccomodationImageById(accommodation.id)
                        .subscribe((accommodationImage) => {
                            const reader = new FileReader()
                            reader.readAsDataURL(accommodationImage)
                            reader.onloadend = () => {
                                accommodation.urlImage = reader.result as string
                            }
                        })
                    this.accommodationsWithImages.push(accommodation)
                })
            })
        this.reset = true
    }

    openModal(type: string, object: any) {
        this.isModalOpen = true
        switch (type) {
            case 'updateSection':
                this.infos = object
                this.imageUrl = this.infos.urlImage
                this.typeForDisplay = 'section'
                break
            case 'updateCategory':
                // this.infos = infos;
                this.typeForDisplay = 'catégorie'
                break
            case 'updateAccommodation':
                //this.infos = infos;
                this.typeForDisplay = 'produit'
                break
            case 'newSection':
                this.openModalForCreation = true
                this.resetInfos()
                this.typeForDisplay = 'une section'
                break
            case 'newCategorie':
                this.openModalForCreation = true
                this.resetInfos()
                this.typeForDisplay = 'une catégorie'
                break
            case 'newAccommodation':
                this.openModalForCreation = true
                this.resetInfos()
                this.typeForDisplay = 'un produit'
                break
            default:
                break
        }
        this.typeForChoice = type
    }

    closeModalOnSubmit() {
        this.isModalOpen = false
        this.resetInfos()
      
    }

    closeModal() {
        this.isModalOpen = false
        this.openModalForCreation = false
        this.resetInfos()
    }

    resetInfos() {
        this.reset = true
        this.sectionsWithImage = []
        this.categoriesWithImage = []
        this.infos = []
        this.image = ''
        this.imageUrl = ''
        this.sectionService.getSections()
    }

    deleteSection(sectionID: any) {
        this.sectionService.deleteSection(sectionID).subscribe(
            (response) => {
                this.resetInfos()
            },
            (error) => {
                console.log(error)
            }
        )
    }

    deleteCategory(categoryID: any) {
        this.categoryService.deleteCategory(categoryID).subscribe(
            (response) => {
                this.getCategoriesBySection(this.infos.section_id)
            },
            (error) => {
                console.log(error)
            }
        )
    }

    deleteAccommodation(accommodationID: any) {
        this.accommodationService
            .deleteAccommodation(accommodationID)
            .subscribe(
                (response) => {
                    this.getAccommodationsByCategory(this.infos.category_id)
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    // createSection(form: any) {
    //     this.coreService.createSection(form).subscribe(
    //         (response) => {
    //             this.getSections()
    //             this.openModalNewSection = false
    //         },
    //         (error) => {
    //             console.log(error)
    //         }
    //     )
    // }

    // createCategory(){
    //     this.coreService.createCategory(this.infos).subscribe(
    //         (response) => {
    //             this.getCategoriesBySection(this.infos.section_id)
    //             this.openModalNewCategory = false
    //         },
    //         (error) => {
    //             console.log(error)
    //         }
    //     )
    // }

    // createAccommodation(){
    //     this.coreService.createAccommodation(this.infos).subscribe(
    //         (response) => {
    //             this.getAccommodationsByCategory(this.infos.category_id)
    //             this.openModalNewAccommodation = false
    //         },
    //         (error) => {
    //             console.log(error)
    //         }
    //     )
    // }
}
