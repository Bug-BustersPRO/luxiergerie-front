import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAccomodationCardComponent } from './admin-accomodation-card.component';

describe('AdminAccomodationCardComponent', () => {
  let component: AdminAccomodationCardComponent;
  let fixture: ComponentFixture<AdminAccomodationCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAccomodationCardComponent]
    });
    fixture = TestBed.createComponent(AdminAccomodationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
