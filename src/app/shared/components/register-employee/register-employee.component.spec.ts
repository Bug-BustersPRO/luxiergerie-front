import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEmployeeComponent } from './register-employee.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

describe('RegisterEmployeeComponent', () => {
  let component: RegisterEmployeeComponent;
  let fixture: ComponentFixture<RegisterEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterEmployeeComponent,
        HttpClientTestingModule,
      ToastrModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
