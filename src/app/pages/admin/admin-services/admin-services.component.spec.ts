import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminAccomodationsComponent } from './admin-services.component';

describe('AdminAccomodationsComponent', () => {
  let component: AdminAccomodationsComponent;
  let fixture: ComponentFixture<AdminAccomodationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAccomodationsComponent]
    });
    fixture = TestBed.createComponent(AdminAccomodationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});