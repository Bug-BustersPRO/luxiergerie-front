import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { Hotel } from 'src/app/shared/models/hotel.model';
import { HotelService } from 'src/app/shared/services/hotel.service';

@Component({
  selector: 'app-config-hotel',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './config-hotel.component.html',
  styleUrl: './config-hotel.component.scss',
})
export class ConfigHotelComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  @Input() isCreateHotel: boolean = true;
  public steps: string[] = ['name', 'image', 'backgroundImage', 'colors', 'confirmation'];
  public currentStep: string = 'name';
  public hotel: Hotel = {
    id: '',
    name: '',
    image: [],
    colors: [],
    backgroundImage: [],
  };
  public fileName!: string;
  public backgroundFileName!: string;
  public imageUrl: string | ArrayBuffer | null = null;
  public backgroundImageUrl: string | ArrayBuffer | null = null;
  public firstSelectedColor: string = '#000000';
  public secondSelectedColor: string = '#000000';
  public thirdSelectedColor: string = '#000000';
  public recommandedColors: any = [
    { name: 'Option 1', value: ['#F8F8F8', '#D4AF37', '#2C3E50'] },
    { name: 'Option 2', value: ['#F5F5DC', '#FFFFFF', '#2ECC71'] },
    { name: 'Option 3', value: ['#34495E', '#ECF0F1', '#AED6F1'] },
  ];
  public isFileError: boolean = false;
  public filesExtension = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
  public errorMessage!: string;

  constructor(
    private cdRef: ChangeDetectorRef,
    private hotelService: HotelService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.hotel.name = '';
    this.hotel.image = [];
    this.hotel.colors = [];
    this.hotel.backgroundImage = [];
    this.getCurrentHotelConfig();
  }

  getCurrentHotelConfig(): void {
    if (!this.isCreateHotel) {
      this.getHotelImage();
      this.getBackgroundHotelImage();
      this.hotelService.getHotel().subscribe({
        next: (response) => {
          this.hotel.id = response[0].id;
          this.hotel.name = response[0].name;
          this.hotel.colors = response[0].colors;
          this.hotel.image.push(response[0].image);
          this.hotel.backgroundImage.push(response[0].backgroundImage);
          this.firstSelectedColor = this.hotel.colors[0];
          this.secondSelectedColor = this.hotel.colors[1];
          this.thirdSelectedColor = this.hotel.colors[2];
        },
        error: (error) => {
          console.error("Erreur lors de la récupération de l'hôtel :", error);
        },
      });
    }
    this.cdRef.detectChanges();
  }

  getHotelImage(): void {
    this.hotelService.getHotelImage().subscribe({
      next: (response) => {
        const reader = new FileReader();
        reader.readAsDataURL(response);
        reader.onloadend = () => {
          this.imageUrl = reader.result as string;
        };
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getBackgroundHotelImage(): void {
    this.hotelService.getBackgroundHotelImage().subscribe({
      next: (response) => {
        const reader = new FileReader();
        reader.readAsDataURL(response);
        reader.onloadend = () => {
          this.backgroundImageUrl = reader.result as string;
        };
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  goToStep(step: string): void {
    switch (step) {
      case 'name':
        this.currentStep = 'name';
        break;
      case 'image':
        this.currentStep = 'image';
        break;
      case 'title':
        this.currentStep = 'name';
        break;
      case 'colors':
        this.currentStep = 'colors';
        break;
      case 'backgroundImage':
        this.currentStep = 'backgroundImage';
        break;
      case 'confirmation':
        this.currentStep = 'confirmation';
        this.hotel.colors[0] = this.firstSelectedColor;
        this.hotel.colors[1] = this.secondSelectedColor;
        this.hotel.colors[2] = this.thirdSelectedColor;
        break;
      default:
        break;
    }
  }

  selectFile(): void {
    this.hotel.colors = [];
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      if (input.files[0].size > 1000000) {
        this.isFileError = true;
        this.errorMessage = 'La taille du fichier doit être inférieure à 1 Mo';
        return;
      }
      if (!this.filesExtension.includes(input.files[0].type)) {
        this.errorMessage =
          'Le format du fichier doit être de type: png, jpg, jpeg ou gif';
        this.isFileError = true;
        return;
      }

      const file = input.files[0];
      this.isFileError = false;
      this.fileName = file.name;
      this.hotel.image = [];
      this.hotel.image.push(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
    this.cdRef.detectChanges();
  }

  selectBackgroundFile(): void {
    this.fileInput.nativeElement.click();
  }

  onBackgroundFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      if (input.files[0].size > 1000000) {
        this.isFileError = true;
        this.errorMessage = 'La taille du fichier doit être inférieure à 1 Mo';
        return;
      }
      if (!this.filesExtension.includes(input.files[0].type)) {
        this.errorMessage =
          'Le format du fichier doit être de type: png, jpg, jpeg ou gif';
        this.isFileError = true;
        return;
      }

      const file = input.files[0];
      this.isFileError = false;
      this.backgroundFileName = file.name;
      this.hotel.backgroundImage = [];
      this.hotel.backgroundImage.push(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        this.backgroundImageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
    this.cdRef.detectChanges();
  }

  onColorSelectedFirst(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.firstSelectedColor = input.value;
    this.hotel.colors[0] = input.value;
  }

  onColorSelectedSecond(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.secondSelectedColor = input.value;
    this.hotel.colors[1] = input.value;
  }

  onColorSelectedThird(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.thirdSelectedColor = input.value;
    this.hotel.colors[2] = input.value;
  }

  setRecommandedColors(index: number): void {
    this.firstSelectedColor = this.recommandedColors[index].value[0];
    this.secondSelectedColor = this.recommandedColors[index].value[1];
    this.thirdSelectedColor = this.recommandedColors[index].value[2];
    this.hotel.colors[0] = this.firstSelectedColor;
    this.hotel.colors[1] = this.secondSelectedColor;
    this.hotel.colors[2] = this.thirdSelectedColor;
  }

  createUpdateHotel(): Observable<Hotel> {
    const formData = new FormData();
    formData.append('name', this.hotel.name);
    if (this.hotel.image) {
      formData.append('image', this.hotel.image[0]);
    }
    if (this.hotel.backgroundImage) {
      formData.append('backgroundImage', this.hotel.backgroundImage[0]);
    }
    this.hotel.colors.forEach((color) => {
      formData.append('colors', color);
    });

    if (this.isCreateHotel) {
      return this.hotelService.createHotel(formData);
    } else {
      return this.hotelService.updateHotel(formData, this.hotel.id);
    }
  }

  submitHotel() {
    this.createUpdateHotel().subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/admin']);
        this.hotelService.emitHotelUpdate(this.hotel);
        this.toastr.success('Hôtel configuré avec succès');
        this.cdRef.detectChanges();
      },
      error: (error) => {
        if (this.isCreateHotel === true) {
          console.error("Erreur lors de la création de l'hôtel :", error);
          this.toastr.error("Erreur lors de la création de l'hôtel");
        } else {
          console.error("Erreur lors de la mise à jour de l'hôtel :", error);
          this.toastr.error("Erreur lors de la mise à jour de l'hôtel");
        }
      },
    });
    this.cdRef.detectChanges();
  }
}