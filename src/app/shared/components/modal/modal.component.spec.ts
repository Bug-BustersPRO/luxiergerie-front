import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule, HttpClientTestingModule, ModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle title input', () => {
    component.title = 'Test Title';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('Test Title');
  });

  it('should emit closeModalEvent when closeModal is called', () => {
    spyOn(component.closeModalEvent, 'emit');
    component.closeModal();
    expect(component.closeModalEvent.emit).toHaveBeenCalled();
  });

  it('should toggle showModal on toggleModal observable', () => {
    component.toggleModal = of(void 0); // Simulate observable triggering
    component.toggleModal.subscribe(() => {
      component.showModal = !component.showModal;
      fixture.detectChanges();
      expect(component.showModal).toBeFalse(); // Assuming it starts as true
    });
  });

  // Functional test example
  it('should close modal on close button click', () => {
    component.showModal = true;
    fixture.detectChanges();
    const closeButton = fixture.debugElement.query(By.css('.close-button')).nativeElement;
    closeButton.click();
    expect(component.showModal).toBeFalse();
  });
});
