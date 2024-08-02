import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSojournComponent } from './add-sojourn.component';

describe('AddSojournComponent', () => {
  let component: AddSojournComponent;
  let fixture: ComponentFixture<AddSojournComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSojournComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSojournComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
