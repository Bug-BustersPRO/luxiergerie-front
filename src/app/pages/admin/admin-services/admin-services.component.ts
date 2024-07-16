import { Component, Input, OnInit } from '@angular/core'
import { AdminServicesGenericCardComponent } from '../admin-services-generic-card/admin-services-generic-card.component'
import { CoreService } from 'src/app/shared/services/core.service'
import { Section } from 'src/app/shared/models/section.model'
import { Category } from 'src/app/shared/models/category.model'
import { Accommodation } from 'src/app/shared/models/accommodation.model'
import { ModalComponent } from '../../../shared/components/modal/modal.component'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'

@Component({
    selector: 'app-admin-services',
    templateUrl: './admin-services.component.html',
    styleUrls: ['./admin-services.component.scss'],
    standalone: true,
    imports: [
        AdminServicesGenericCardComponent,
        ModalComponent,
        FormsModule,
        CommonModule
    ],
})
export class AdminAccomodationsComponent {
    public sections: Section[] = []
    public categories: Category[] = []
    public accommodations: Accommodation[] = []
    public reset: boolean = false
    public infos: any = []
    public image: any

    public isModalOpen: boolean = false
    public openModalSection: boolean = false
    public openModalCategory: boolean = false
    public openModalAccommodation: boolean = false
    public typeSection: string = 'typeSection'
    public typeCategory: string = 'typeCategory'
    public typeAccommodation: string = 'typeAccommodation'

    constructor(private coreService: CoreService) {
        this.getSections()
    }

    getSections() {
        this.coreService.getSections().subscribe((sections: Section[]) => {
            this.sections = sections
        })
    }

    getCategoriesBySection(sectionID: string) {
      this.coreService.getCategoriesBySection(sectionID).subscribe(async (categories: Category[]) => {
          const promises = categories.map(category => {
              return new Promise<void>((resolve) => {
                  const reader = new FileReader();
                  const img = new Blob([category.image], { type: 'image/jpg' });
                  reader.readAsDataURL(img);
                  reader.onloadend = () => {
                      category.urlImage= reader.result as string;
                      console.log('categories', category.image);
                      resolve();
                  };
              });
          });
  
          await Promise.all(promises);
  
          this.categories = categories;
  
          if (this.reset) {
              this.accommodations = [];
              this.reset = false;
          }
      });
  }

    getAccommodationsByCategory(categoryID: string) {
        this.coreService
            .getAccommodationsByCategory(categoryID)
            .subscribe((accommodations: Accommodation[]) => {
                this.accommodations = accommodations
            })
        this.reset = true
    }

    openModal(object: any, type: string) {
        this.isModalOpen = true
        if (type === this.typeSection) {
            this.openModalSection = true
        }
        if (type === this.typeCategory) {
            this.openModalCategory = true
            console.log('openModalCategory', this.openModalCategory)
        }
        if (type === this.typeAccommodation) {
            this.openModalAccommodation = true
        }
        this.infos = object
    }

    updateInfos() {
        if (this.openModalSection == true) {
            this.coreService.updateSection(this.infos).subscribe(
                (response) => {
                    this.openModalSection = false
                },
                (error) => {
                    console.log(error)
                }
            )
        }
        if (this.openModalCategory == true) {
            console.log('updateInfos', this.infos)

            this.coreService.updateCategory(this.infos as Category).subscribe(
                (response) => {
                    this.openModalCategory = false
                },
                (error) => {
                    console.log(error)
                }
            )
        }
        if (this.openModalAccommodation == true) {
            this.coreService.updateAccommodation(this.infos).subscribe(
                (response) => {
                    this.openModalAccommodation = false
                },
                (error) => {
                    console.log(error)
                }
            )
        }
        this.isModalOpen = false
    }

    deleteSection(sectionID: any) {
        this.coreService.deleteSection(sectionID).subscribe(
            (response) => {
                this.getSections()
            },
            (error) => {
                console.log(error)
            }
        )
    }

    deleteCategory(categoryID: any) {
        this.coreService.deleteCategory(categoryID).subscribe(
            (response) => {
                this.getCategoriesBySection(this.infos.section_id)
            },
            (error) => {
                console.log(error)
            }
        )
    }

    deleteAccommodation(accommodationID: any) {
        this.coreService.deleteAccommodation(accommodationID).subscribe(
            (response) => {
                this.getAccommodationsByCategory(this.infos.category_id)
            },
            (error) => {
                console.log(error)
            }
        )
    }

    getHotelImage(id: any): void {
        this.coreService.getCategoryImage(id).subscribe({
            next: (response) => {
                const reader = new FileReader()
                reader.readAsDataURL(response)
                reader.onloadend = () => {
                    this.image = reader.result as string
                    console.log(this.image)
                    console.log(response)
                }
            },
            error: (error) => {
                console.error(error)
            },
        })
    }
}
