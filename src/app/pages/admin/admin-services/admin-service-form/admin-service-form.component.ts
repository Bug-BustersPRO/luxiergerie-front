import { CommonModule } from '@angular/common';
import { Component, effect, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { Category } from 'src/app/shared/models/category.model';
import { Section } from 'src/app/shared/models/section.model';
import { AccommodationService } from 'src/app/shared/services/accommodation.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { SectionService } from 'src/app/shared/services/section.service';

@Component({
  selector: 'app-admin-service-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ButtonComponent],
  templateUrl: './admin-service-form.component.html',
  styleUrl: './admin-service-form.component.scss',
})
export class AdminServiceFormComponent {
  @ViewChild('genericForm') genericForm!: NgForm;
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  @Input() isFileError!: boolean;
  public filesExtension = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/gif',
  ];
  public errorMessage!: string;
  public fileName!: string;
  public newImage: File[] = [] as File[];
  public sectionsForNewCategory: Section[] = [];
  public categoriesForNewAccommodation: Category[] = [];

  @Input() infos: any;
  @Input() imageUrl: string | ArrayBuffer | null = null;
  @Input() typeForChoice!: string;
  @Input() typeForDisplay: string = '';
  @Input() openModalForCreation!: boolean;
  @Input() isACategory!: boolean;
  @Input() isAnAccommodation!: boolean;

  @Output() closeModal = new EventEmitter<void>();
  @Output() isFileErrorOutput = new EventEmitter<boolean>(this.isFileError);

  constructor(
    private sectionService: SectionService,
    private categoryService: CategoryService,
    private accommodationService: AccommodationService,
    private toaster: ToastrService
  ) {
    effect(() => {
      this.getAllSections();
      this.getAllCategories();
    })
  }

  getAllSections() {
    this.sectionsForNewCategory = this.sectionService.getAllSectionsSig();
  }

  getAllCategories() {
    this.categoriesForNewAccommodation = this.categoryService.getAllCategoriesSig();
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.genericForm.value.name);
    formData.append('description', this.genericForm.value.description);
    formData.append('image', this.newImage[0]);

    const handleResponse = (serviceMethod: any, successMessage: string, errorMessage: string) => {
      serviceMethod.subscribe(
        () => {
          this.closeModal.emit();
          this.imageUrl = '';
          this.newImage = [];
          this.toaster.success(successMessage);
        },
        (error: any) => {
          console.log(error);
          this.toaster.error(errorMessage);
        }
      );
    };

    if (this.typeForChoice === 'newSection') {
      formData.append('title', this.genericForm.value.title);
      handleResponse(
        this.sectionService.createSection(formData),
        'Section créée avec succès',
        'Erreur lors de la création de la section'
      );
    } else if (this.typeForChoice === 'newCategory') {
      formData.append('section', this.genericForm.value.section);
      handleResponse(
        this.categoryService.createCategory(formData, this.genericForm.value.section),
        'Catégorie créée avec succès',
        'Erreur lors de la création de la catégorie'
      );
    } else if (this.typeForChoice === 'newAccommodation') {
      formData.append('price', this.genericForm.value.price);
      formData.append('isReservable', this.genericForm.value.isReservable?.toString() || 'false');
      formData.append('category', this.genericForm.value.category);
      handleResponse(
        this.accommodationService.createAccommodation(formData, this.genericForm.value.category),
        'Produit/service créé avec succès',
        'Erreur lors de la création du produit/service'
      );
    } else if (this.typeForChoice === 'updateSection') {
      formData.append('title', this.genericForm.value.title);
      handleResponse(
        this.sectionService.updateSection(formData, this.infos.id),
        'Section modifiée avec succès',
        'Erreur lors de la modification de la section'
      );
    } else if (this.typeForChoice === 'updateCategory') {
      formData.append('section', this.genericForm.value.section);
      handleResponse(
        this.categoryService.updateCategory(formData, this.genericForm.value.section, this.infos.id),
        'Catégorie modifiée avec succès',
        'Erreur lors de la modification de la catégorie'
      );
    } else if (this.typeForChoice === 'updateAccommodation') {
      formData.append('price', this.genericForm.value.price);
      formData.append('isReservable', this.genericForm.value.isReservable?.toString() || 'false');
      formData.append('category', this.genericForm.value.category);
      handleResponse(
        this.accommodationService.updateAccommodation(formData, this.genericForm.value.category, this.infos.id),
        'Produit/service modifié avec succès',
        'Erreur lors de la modification du produit/service'
      );
    }
    return null;
  }

  selectFile(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    console.log(input.files);

    if (input.files && input.files.length > 0) {
      if (input.files[0].size > 1000000) {
        this.isFileError = true;
        this.errorMessage = 'La taille du fichier doit être inférieure à 1 Mo';
        this.isFileErrorOutput.emit();
        return
      }
      if (!this.filesExtension.includes(input.files[0].type)) {
        this.isFileError = true
        this.errorMessage = 'Le format du fichier doit être de type: png, jpg, jpeg ou gif';
        this.isFileErrorOutput.emit();
        return
      }
      if (input.files) {
        const file = input.files[0];
        this.isFileError = false;
        if (file.name) {
          this.fileName = file.name;
          this.newImage.push(file);
        } else {
          this.fileName = this.infos.image;
          this.newImage.push(file);
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageUrl = reader.result;
        }
        reader.readAsDataURL(file);
      }
    }
  }

}