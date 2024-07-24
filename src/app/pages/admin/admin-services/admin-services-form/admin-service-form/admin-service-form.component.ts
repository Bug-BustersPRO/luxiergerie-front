import { CommonModule } from '@angular/common'
import {
    Component,
    effect,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from '@angular/core'
import { FormsModule, NgForm } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { Category } from 'src/app/shared/models/category.model'
import { Section } from 'src/app/shared/models/section.model'
import { AccommodationService } from 'src/app/shared/services/accommodation.service'
import { CategoryService } from 'src/app/shared/services/category.service'
import { SectionService } from 'src/app/shared/services/section.service'

@Component({
    selector: 'app-admin-service-form',
    standalone: true,
    imports: [FormsModule, CommonModule, ButtonComponent],
    templateUrl: './admin-service-form.component.html',
    styleUrl: './admin-service-form.component.scss',
})
export class AdminServiceFormComponent {
    @ViewChild('genericForm') genericForm!: NgForm
    @ViewChild('fileInput', { static: false }) fileInput!: ElementRef
    public isFileError: boolean = false
    public filesExtension = [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/gif',
    ]
    public errorMessage!: string
    public fileName!: string
    public newImage: File[] = [] as File[]
    public sectionsForNewCategory: Section[] = []
    public categoriesForNewAccommodation: Category[] = []

    @Input() infos: any
    @Input() imageUrl: string | ArrayBuffer | null = null
    @Input() typeForChoice!: string
    @Input() typeForDisplay: string = ''
    @Input() openModalForCreation!: boolean
    @Input() isACategory!: boolean
    @Input() isAnAccommodation!: boolean

    @Output() closeModal = new EventEmitter<void>()

    constructor(
        private sectionService: SectionService,
        private categoryService: CategoryService,
        private accommodationService: AccommodationService,
        private toaster: ToastrService
    ) {
        effect(() => {
            this.getAllSections()
            this.getAllCategories()
        })        
    }

    getAllSections() {
        this.sectionsForNewCategory = this.sectionService.getAllSectionsSig()
    }

    getAllCategories() {
        this.categoriesForNewAccommodation =
            this.categoryService.getAllCategoriesSig()
    }

    onSubmit() {
        if (this.typeForChoice === 'newSection') {
            const formData = new FormData()
            formData.append('name', this.genericForm.value.name)
            formData.append('description', this.genericForm.value.description)
            formData.append('title', this.genericForm.value.title)
            formData.append('image', this.newImage[0])
            this.sectionService.createSection(formData).subscribe(
                (response) => {
                    formData
                    this.closeModal.emit()
                    this.imageUrl = ''
                    this.newImage = []
                    this.sectionService.getAllSectionsSig()
                    this.toaster.success('Section créée avec succès')
                },
                (error) => {
                    console.log(error)
                    this.toaster.error('Erreur lors de la création de la section')
                }
            )
        }
        if (this.typeForChoice === 'newCategory') {
            const formData = new FormData()
            formData.append('name', this.genericForm.value.name)
            formData.append('description', this.genericForm.value.description)
            formData.append('image', this.newImage[0])
            formData.append('section', this.genericForm.value.section)
            const sectionId = this.genericForm.value.section

            this.categoryService.createCategory(formData, sectionId).subscribe(
                (response) => {
                    formData
                    this.closeModal.emit()
                    this.imageUrl = ''
                    this.newImage = []
                    this.categoryService.getAll()
                    this.toaster.success('Catégorie créée avec succès')
                },
                (error) => {
                    console.log(error)
                    this.toaster.error('Erreur lors de la création de la catégorie')
                }
            )
        }
        if (this.typeForChoice === 'newAccommodation') {
            const formData = new FormData()
            formData.append('name', this.genericForm.value.name)
            formData.append('description', this.genericForm.value.description)
            formData.append('image', this.newImage[0])
            formData.append('price', this.genericForm.value.price)
            if (typeof this.genericForm.value.isReservable === 'undefined') {
                formData.append('isReservable', 'false')
            } else {
                formData.append(
                    'isReservable',
                    this.genericForm.value.isReservable.toString()
                )
            }
            formData.append('category', this.genericForm.value.category)
            const categoryId = this.genericForm.value.category

            this.accommodationService
                .createAccommodation(formData, categoryId)
                .subscribe(
                    (response) => {
                        formData
                        this.closeModal.emit()
                        this.imageUrl = ''
                        this.newImage = []
                        this.accommodationService.getAll()
                        this.toaster.success('Produit/service créé avec succès')
                    },
                    (error) => {
                        console.log(error)
                        this.toaster.error('Erreur lors de la création du produit/service')
                    }
                )
        }
        if (this.typeForChoice === 'updateSection') {
            const formData = new FormData()
            formData.append('name', this.genericForm.value.name)
            formData.append('description', this.genericForm.value.description)
            formData.append('title', this.genericForm.value.title)
            formData.append('image', this.newImage[0])

            this.sectionService
                .updateSection(formData, this.infos.id)
                .subscribe(
                    (response) => {
                        formData
                        this.openModalForCreation = false
                        this.closeModal.emit()
                        this.newImage = []
                        this.toaster.success('Section modifiée avec succès')
                    },
                    (error) => {
                        console.log(error)
                        this.toaster.error('Erreur lors de la modification de la section')
                    }
                )
        }
        if (this.typeForChoice === 'updateCategory') {
            const formData = new FormData()
            formData.append('name', this.genericForm.value.name)
            formData.append('description', this.genericForm.value.description)
            formData.append('image', this.newImage[0])
            formData.append('section', this.genericForm.value.section)
            const sectionId = this.genericForm.value.section

            this.categoryService
                .updateCategory(formData, sectionId, this.infos.id)
                .subscribe(
                    (response) => {
                        formData
                        this.openModalForCreation = false
                        this.closeModal.emit()
                        this.newImage = []
                        this.categoryService.getAll()
                        this.toaster.success('Catégorie modifiée avec succès')
                    },
                    (error) => {
                        console.log(error)
                        this.toaster.error('Erreur lors de la modification de la catégorie')
                    }
                )
        }
        if (this.typeForChoice === 'updateAccommodation') {
            const formData = new FormData()
            formData.append('name', this.genericForm.value.name)
            formData.append('description', this.genericForm.value.description)
            formData.append('image', this.newImage[0])
            formData.append('price', this.genericForm.value.price)
            if (this.genericForm.value.isReservable === 'undefined') {
                formData.append('isReservable', 'false')
            } else {
                formData.append(
                    'isReservable',
                    this.genericForm.value.isReservable
                )
            }

            formData.append('category', this.genericForm.value.category)
            const categoryId = this.genericForm.value.category

            this.accommodationService
                .updateAccommodation(formData, categoryId, this.infos.id)
                .subscribe(
                    (response) => {
                        formData
                        this.openModalForCreation = false
                        this.closeModal.emit()
                        this.newImage = []
                        this.categoryService.getAll()
                        this.toaster.success('Produit/service modifié avec succès')
                    },
                    (error) => {
                        console.log(error)
                        this.toaster.error('Erreur lors de la modification du produit/service')
                    }
                )
        }
        return null
    }

    selectFile(): void {
        this.fileInput.nativeElement.click()
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement

        if (input.files && input.files.length > 0) {
            if (input.files[0].size > 1000000) {
                this.isFileError = true
                this.errorMessage =
                    'La taille du fichier doit être inférieure à 1 Mo'
                return
            }
            if (!this.filesExtension.includes(input.files[0].type)) {
                this.errorMessage =
                    'Le format du fichier doit être de type: png, jpg, jpeg ou gif'
                this.isFileError = true
                return
            }
            if (input.files) {
                const file = input.files[0]
                this.isFileError = false
                if (file.name) {
                    this.fileName = file.name
                    this.newImage.push(file)
                } else {
                    this.fileName = this.infos.image
                    this.newImage.push(file)
                }

                const reader = new FileReader()
                reader.onload = (e) => {
                    this.imageUrl = reader.result
                }
                reader.readAsDataURL(file)
            }
        }
    }
}
