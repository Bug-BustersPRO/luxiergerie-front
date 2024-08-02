import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminServiceFormComponent } from './admin-service-form.component';

describe('AdminServiceFormComponent', () => {
  let component: AdminServiceFormComponent;
  let fixture: ComponentFixture<AdminServiceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminServiceFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdminServiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});