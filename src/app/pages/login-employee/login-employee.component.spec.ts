import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginEmployeeComponent } from './login-employee.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';

describe('LoginEmployeeComponent', () => {
  let component: LoginEmployeeComponent;
  let fixture: ComponentFixture<LoginEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginEmployeeComponent],
      imports: [HttpClientTestingModule,
        ToastrModule.forRoot(),
        FormsModule,
        ButtonComponent
      ]
    });
    fixture = TestBed.createComponent(LoginEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
