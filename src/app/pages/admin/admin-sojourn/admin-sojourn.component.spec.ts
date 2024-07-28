import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSojournComponent } from './admin-sojourn.component';

describe('AdminRoomComponent', () => {
  let component: AdminSojournComponent;
  let fixture: ComponentFixture<AdminSojournComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSojournComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSojournComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
