import { AfterContentInit, AfterViewInit, Component, effect, OnChanges, OnDestroy, OnInit } from '@angular/core'
import { AdminServicesGenericCardComponent } from '../admin-services-generic-card/admin-services-generic-card.component'
import { Section } from 'src/app/shared/models/section.model'
import { Category } from 'src/app/shared/models/category.model'
import { Accommodation } from 'src/app/shared/models/accommodation.model'
import { ModalComponent } from '../../../shared/components/modal/modal.component'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { AdminServiceFormComponent } from './admin-services-form/admin-service-form/admin-service-form.component'
import { SectionService } from 'src/app/shared/services/section.service'
import { CategoryService } from 'src/app/shared/services/category.service'
import { AccommodationService } from 'src/app/shared/services/accommodation.service'
import { ToastrService } from 'ngx-toastr'

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
    public isACategory: boolean = false
    public isAnAccommodation: boolean = false
    public reset: boolean = false
    public infos: any = []
    public typeForChoice: string = ''
    public typeForDisplay: string = ''
    public image: any
    public imageUrl: string | ArrayBuffer | null = null
    public isModalOpen: boolean = false
    public openModalForCreation: boolean = false
    public selectedSectionId: string | null = null
    public selectedCategoryId: string | null = null
    public isFileError!: boolean

    constructor(
        private sectionService: SectionService,
        private categoryService: CategoryService,
        private accommodationService: AccommodationService,
        private toaster: ToastrService
    ) {
        this.sectionService.getSections()  
        this.categoryService.getAll()
        this.accommodationService.getAll()
        effect(() => {
            this.getSections()
        })
    }

     getSections() {        
        this.sectionsWithImage = this.sectionService.getAllSectionsSig()
        
        this.sectionsWithImage.forEach((section: Section) => {
        this.sectionService
            .getSectionImageById(section.id)
            .subscribe((sectionImage) => {
                const reader = new FileReader()
                reader.readAsDataURL(sectionImage)
                reader.onloadend = () => {
                    section.urlImage = reader.result as string
                }
            })            
        })
     }

    getCategoriesBySection(id: any) {
        this.categoriesWithImage = []
        this.selectedSectionId = id

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
                            this.categoryService
                                .getById(category.id)
                                .subscribe((response) => {
                                    category.section = response.section
                                })
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
        this.selectedCategoryId = id

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
                            this.accommodationService
                                .getById(accommodation.id)
                                .subscribe((response) => {
                                    this.categoryService
                                        .getById(response.category)
                                        .subscribe((response) => {
                                            accommodation.category = response
                                        })
                                })
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
                this.infos = object
                this.imageUrl = this.infos.urlImage
                this.isACategory = true
                this.typeForDisplay = 'catégorie'
                break
            case 'updateAccommodation':
                this.infos = object
                this.imageUrl = this.infos.urlImage
                this.isAnAccommodation = true
                this.typeForDisplay = 'produit'
                break
            case 'newSection':
                this.openModalForCreation = true
                this.resetInfos()
                this.typeForDisplay = 'une section'
                break
            case 'newCategory':
                this.openModalForCreation = true
                this.isACategory = true
                this.resetInfos()
                this.typeForDisplay = 'une catégorie'
                break
            case 'newAccommodation':
                this.openModalForCreation = true
                this.isAnAccommodation = true
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
        this.isACategory = false
        this.isAnAccommodation = false
        this.openModalForCreation = false
        this.resetInfos()
    }

    closeModal() {
        this.isModalOpen = false
        this.openModalForCreation = false
        this.isACategory = false
        this.isAnAccommodation = false
        this.resetInfos()
    }

    resetInfos() {       
        this.isFileError = false        
        this.reset = true
        this.sectionsWithImage = []
        this.categoriesWithImage = []
        this.accommodationsWithImages = []
        this.infos = []
        this.image = ''
        this.imageUrl = ''        
        this.selectedSectionId = null
        this.selectedCategoryId = null
        this.sectionService.getSections()
    }

    deleteSection(sectionID: any) {
        this.sectionService.deleteSection(sectionID).subscribe(
            () => {
                this.resetInfos()
                this.toaster.success('La section a bien été supprimée')
            },
            (error) => {
                console.log(error)
                this.toaster.error(
                    'Une erreur est survenue lors de la suppression de la section'
                )
            }
        )
    }

    deleteCategory(categoryID: any) {
        this.categoryService.deleteCategory(categoryID).subscribe(
            () => {
                this.resetInfos()
                this.toaster.success('La catégorie a bien été supprimée')
            },
            (error) => {
                console.log(error)
                this.toaster.error(
                    'Une erreur est survenue lors de la suppression de la catégorie'
                )
            }
        )
    }

    deleteAccommodation(accommodationID: any) {
        this.accommodationService
            .deleteAccommodation(accommodationID)
            .subscribe(
                () => {
                    this.resetInfos()
                    this.toaster.success(
                        'Le produit/service a bien été supprimé'
                    )
                },
                (error) => {
                    console.log(error)
                    this.toaster.error(
                        'Une erreur est survenue lors de la suppression du produit/service'
                    )
                }
            )
    }
}
