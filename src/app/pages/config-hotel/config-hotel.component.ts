import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { Hotel } from 'src/app/shared/models/hotel.model';
import { HotelService } from 'src/app/shared/services/hotel.service';

@Component({
  selector: 'app-config-hotel',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './config-hotel.component.html',
  styleUrl: './config-hotel.component.scss'
})
export class ConfigHotelComponent implements OnInit {

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  public steps: string[] = ['name', 'image', 'colors', 'confirmation'];
  public currentStep: string = 'name';
  public hotel: Hotel = { id: '', name: '', image: [], colors: [] }
  public fileName!: string;
  public imageUrl: string | ArrayBuffer | null = null;
  public firstSelectedColor: string = '#000000';
  public secondSelectedColor: string = '#000000';
  public thirdSelectedColor: string = '#000000';
  public recommandedColors: any =
    [
      { name: 'Option 1', value: ['#F8F8F8', '#D4AF37', '#2C3E50'] },
      { name: 'Option 2', value: ['#F5F5DC', '#FFFFFF', '#2ECC71'] },
      { name: 'Option 3', value: ['#34495E', '#ECF0F1', '#AED6F1'] },
    ]
  public isFileError: boolean = false;
  public filesExtension = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
  public errorMessage!: string;

  constructor(private cdRef: ChangeDetectorRef, private hotelService: HotelService, private router: Router) {
  }

  ngOnInit(): void {
    this.hotel.name = '';
    this.hotel.image = [];
    this.hotel.colors = [];
  }

  goToImage(): void {
    this.currentStep = 'image';
  }

  goToTitle(): void {
    this.currentStep = 'name';
  }

  goToColors(): void {
    this.currentStep = 'colors';
  }

  goToConfirmation(): void {
    this.currentStep = 'confirmation';
    this.hotel.colors[0] = this.firstSelectedColor;
    this.hotel.colors[1] = this.secondSelectedColor;
    this.hotel.colors[2] = this.thirdSelectedColor;
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
        this.errorMessage = 'Le format du fichier doit être de type: png, jpg, jpeg ou gif';
        this.isFileError = true;
        return;
      }

      const file = input.files[0];
      this.isFileError = false;
      this.fileName = file.name;
      this.hotel.image.push(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = reader.result;
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

  createHotel(): Observable<any> {
    const formData = new FormData();
    formData.append('name', this.hotel.name);
    if (this.hotel.image) {
      formData.append('image', this.hotel.image[0]);
    }
    this.hotel.colors.forEach((color) => {
      formData.append(`colors`, color);
    });

    return this.hotelService.createHotel(formData);
  }

  submitHotel() {
    this.createHotel().subscribe(
      {
        next: response => {
          this.router.navigate(['/sections']);
        },
        error: error => {
          console.error('Erreur lors de la création de l\'hôtel :', error);
        }
      }
    );
  }
}
