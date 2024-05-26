import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Hotel } from 'src/app/shared/models/hotel.model';

@Component({
  selector: 'app-config-hotel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './config-hotel.component.html',
  styleUrl: './config-hotel.component.scss'
})
export class ConfigHotelComponent implements OnInit{
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  public steps: string[] = ['name', 'image', 'colors', 'confirmation'];
  public currentStep: string = 'name';
  public hotel: Hotel = {id: '', name: '', image: [], colors: []}
  public fileName!: string;
  public firstSelectedColor: string = '#000000';
  public secondSelectedColor: string = '#000000';
  public thirdSelectedColor: string = '#000000';

  constructor(private cdRef: ChangeDetectorRef) {

   }

  ngOnInit(): void {
    this.hotel.name = '';
    this.hotel.colors = [];
    this.hotel.image = [];
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
  }

  selectFile(): void {
    this.hotel.colors = [];
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileName = file.name;
      this.hotel.image.push(file);
      console.log(this.hotel);
      console.log('Selected file:', file);
    }
    this.cdRef.detectChanges();
  }

  onColorSelectedFirst(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.firstSelectedColor = input.value;
    this.hotel.colors[0] = input.value;
    console.log(this.hotel);
  }

  onColorSelectedSecond(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.secondSelectedColor = input.value;
    this.hotel.colors[1] = input.value;
    console.log(this.hotel);
  }

  onColorSelectedThird(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.thirdSelectedColor = input.value;
    this.hotel.colors[2] = input.value;
    console.log(this.hotel);
  }
}
