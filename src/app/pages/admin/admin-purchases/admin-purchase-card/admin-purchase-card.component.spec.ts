import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPurchaseCardComponent } from './admin-purchase-card.component';

describe('AdminOrderCardComponent', () => {
  let component: AdminPurchaseCardComponent;
  let fixture: ComponentFixture<AdminPurchaseCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPurchaseCardComponent]
    });
    fixture = TestBed.createComponent(AdminPurchaseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
