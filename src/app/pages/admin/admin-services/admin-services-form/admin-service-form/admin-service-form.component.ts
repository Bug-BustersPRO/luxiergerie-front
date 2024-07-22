import { CommonModule } from '@angular/common'
import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from '@angular/core'
import { FormsModule, NgForm } from '@angular/forms'
import { Category } from 'src/app/shared/models/category.model'
import { Section } from 'src/app/shared/models/section.model'
import { AccommodationService } from 'src/app/shared/services/accommodation.service'
import { CategoryService } from 'src/app/shared/services/category.service'
import { SectionService } from 'src/app/shared/services/section.service'

@Component({
    selector: 'app-admin-service-form',
    standalone: true,
    imports: [FormsModule, CommonModule],
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

    @Input() infos: any
    @Input() imageUrl: string | ArrayBuffer | null = null
    @Input() typeForChoice!: string
    @Input() typeForDisplay: string = ''
    @Input() openModalForCreation!: boolean
    @Output() closeModal = new EventEmitter<void>()

    constructor(private sectionService: SectionService, private categoryService: CategoryService, private accommodationService: AccommodationService) {}

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
                    this.openModalForCreation = false
                    this.closeModal.emit()
                    this.imageUrl = ''
                    this.newImage = []
                    this.sectionService.getAllSectionsSig()
                },
                (error) => {
                    console.log(error)
                }
            )
        }
        if (this.typeForChoice === 'newCategory') {
            //this.createCategory()
        }
        if (this.typeForChoice === 'newAccommodation') {
            // this.createAccommodation()
        }
        if (this.typeForChoice === 'updateSection') {
            const formData = new FormData()
            formData.append('name', this.genericForm.value.name)
            formData.append('description', this.genericForm.value.description)
            formData.append('title', this.genericForm.value.title)
            formData.append('image', this.newImage[0])

            this.sectionService.updateSection(formData, this.infos.id).subscribe(
                (response) => {
                    formData
                    this.openModalForCreation = false
                    this.closeModal.emit()
                    this.newImage = []
                },
                (error) => {
                    console.log(error)
                }
            )
        }
        if (this.typeForChoice === 'updateCategory') {
            this.categoryService.updateCategory(this.infos as Category).subscribe(
                (response) => {
                    this.closeModal.emit()
                },
                (error) => {
                    console.log(error)
                }
            )
        }
        if (this.typeForChoice === 'updateAccommodation') {
            this.accommodationService.updateAccommodation(this.infos).subscribe(
                (response) => {
                    this.closeModal.emit()
                },
                (error) => {
                    console.log(error)
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
