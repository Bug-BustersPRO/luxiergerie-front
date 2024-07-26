import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminServicesGenericCardComponent } from './admin-services-generic-card.component';

describe('AdminServicesGenericCardComponent', () => {
  let component: AdminServicesGenericCardComponent;
  let fixture: ComponentFixture<AdminServicesGenericCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminServicesGenericCardComponent]
    });
    fixture = TestBed.createComponent(AdminServicesGenericCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
