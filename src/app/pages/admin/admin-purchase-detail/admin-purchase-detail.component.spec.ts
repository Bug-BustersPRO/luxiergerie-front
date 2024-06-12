import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPurchaseDetailComponent } from './admin-purchase-detail.component';

describe('AdminPurchaseDetailComponent', () => {
  let component: AdminPurchaseDetailComponent;
  let fixture: ComponentFixture<AdminPurchaseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPurchaseDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminPurchaseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
