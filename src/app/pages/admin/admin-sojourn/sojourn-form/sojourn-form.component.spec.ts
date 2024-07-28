import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SojournFormComponent } from './sojourn-form.component';

describe('AddSojournComponent', () => {
  let component: SojournFormComponent;
  let fixture: ComponentFixture<SojournFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SojournFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SojournFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
