import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigHotelComponent } from './config-hotel.component';
import { HotelService } from 'src/app/shared/services/hotel.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

describe('ConfigHotelComponent', () => {
  let component: ConfigHotelComponent;
  let fixture: ComponentFixture<ConfigHotelComponent>;
  let hotelService: jasmine.SpyObj<HotelService>;

  beforeEach(async () => {
    const hotelServiceSpy = jasmine.createSpyObj('HotelService', ['getHotel', 'getHotelImage', 'getBackgroundHotelImage', 'createHotel', 'updateHotel']);
    const cdRefSpy = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    const mockBlob = new Blob(['mock image content'], { type: 'image/png' });

    await TestBed.configureTestingModule({
      declarations: [ ],
      imports: [CommonModule, FormsModule, ConfigHotelComponent, ButtonComponent],
      providers: [
        { provide: HotelService, useValue: hotelServiceSpy },
        { provide: ChangeDetectorRef, useValue: cdRefSpy },
        { provide: ToastrService, useValue: toastrSpy },
      ]
    }).compileComponents();

    hotelService = TestBed.inject(HotelService) as jasmine.SpyObj<HotelService>;
    hotelService.getHotelImage.and.returnValue(of(mockBlob));
    hotelService.getBackgroundHotelImage.and.returnValue(of(mockBlob));
    hotelService.getHotel.and.returnValue(of([{ id: 1, name: 'Test Hotel', colors: ['#fff', '#000', '#ccc'], image: 'image.png', backgroundImage: 'bg.png' }]));

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize hotel properties on ngOnInit', () => {
    spyOn(component, 'getCurrentHotelConfig');
    component.ngOnInit();
    expect(component.hotel.name).toBe('');
    expect(component.hotel.image).toEqual([]);
    expect(component.hotel.colors).toEqual([]);
    expect(component.hotel.backgroundImage).toEqual([]);
    expect(component.getCurrentHotelConfig).toHaveBeenCalled();
  });

  it('should call getHotelImage and getBackgroundHotelImage in getCurrentHotelConfig', () => {
    hotelService.getHotel.and.returnValue(of([{ id: 1, name: 'Test Hotel', colors: ['#000', '#111', '#222'], image: 'image.png', backgroundImage: 'bg.png' }]));
    spyOn(component, 'getHotelImage');
    spyOn(component, 'getBackgroundHotelImage');

    component.isCreateHotel = false;
    component.getCurrentHotelConfig();

    expect(component.getHotelImage).toHaveBeenCalled();
    expect(component.getBackgroundHotelImage).toHaveBeenCalled();
    expect(hotelService.getHotel).toHaveBeenCalled();
  });

  it('should handle file selection for hotel image', () => {
    const file = new File([''], 'test.png', { type: 'image/png' });
    const event = { target: { files: [file] } } as unknown as Event;

    component.onFileSelected(event);

    expect(component.isFileError).toBeFalse();
    expect(component.fileName).toBe('test.png');
    expect(component.hotel.image).toEqual([file]);
  });

  it('should handle file selection for background image', () => {
    const file = new File([''], 'bg.png', { type: 'image/png' });
    const event = { target: { files: [file] } } as unknown as Event;

    component.onBackgroundFileSelected(event);

    expect(component.isFileError).toBeFalse();
    expect(component.backgroundFileName).toBe('bg.png');
    expect(component.hotel.backgroundImage).toEqual([file]);
  });

  it('should handle color selection', () => {
    const event = { target: { value: '#123456' } } as unknown as Event;

    component.onColorSelectedFirst(event);
    expect(component.firstSelectedColor).toBe('#123456');
    expect(component.hotel.colors[0]).toBe('#123456');

    component.onColorSelectedSecond(event);
    expect(component.secondSelectedColor).toBe('#123456');
    expect(component.hotel.colors[1]).toBe('#123456');

    component.onColorSelectedThird(event);
    expect(component.thirdSelectedColor).toBe('#123456');
    expect(component.hotel.colors[2]).toBe('#123456');
  });

  it('should navigate to different steps', () => {
    component.goToStep('name');
    expect(component.currentStep).toBe('name');

    component.goToStep('image');
    expect(component.currentStep).toBe('image');

    component.goToStep('colors');
    expect(component.currentStep).toBe('colors');

    component.goToStep('backgroundImage');
    expect(component.currentStep).toBe('backgroundImage');

    component.goToStep('confirmation');
    expect(component.currentStep).toBe('confirmation');
  });
});
