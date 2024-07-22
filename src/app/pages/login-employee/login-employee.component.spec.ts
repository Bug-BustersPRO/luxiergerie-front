import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginEmployeeComponent } from './login-employee.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginEmployeeComponent', () => {
  let component: LoginEmployeeComponent;
  let fixture: ComponentFixture<LoginEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginEmployeeComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(LoginEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
