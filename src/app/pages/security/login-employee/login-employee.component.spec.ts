import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { LoginEmployeeComponent } from './login-employee.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HotelService } from 'src/app/shared/services/hotel.service';

describe('LoginEmployeeComponent', () => {
  let component: LoginEmployeeComponent;
  let fixture: ComponentFixture<LoginEmployeeComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let toastr: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {

    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    TestBed.configureTestingModule({
      declarations: [LoginEmployeeComponent],
      imports: [HttpClientTestingModule,
        ToastrModule.forRoot(),
        FormsModule,
        ButtonComponent
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ToastrService, useValue: toastrSpy },
        HotelService
      ]
    });
    fixture = TestBed.createComponent(LoginEmployeeComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    toastr = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initial state', () => {
    expect(component.serialNumber).toBeUndefined();
    expect(component.password).toBeUndefined();
    expect(component.isNotLoggedIn).toBeFalse();
    expect(component.canValidate).toBeFalse();
  });

  describe('canValidate', () => {
    it('should return false if serialNumber or password is missing', () => {
      component.serialNumber == null;
      component.password = 'password';
      expect(component.canValidate).toBeFalse();

      component.serialNumber == '';
      component.password = 'password';
      expect(component.canValidate).toBeFalse();

      component.serialNumber = '123';
      component.password = '';
      expect(component.canValidate).toBeFalse();
    });

    it('should return true if both serialNumber and password are present', () => {
      component.serialNumber = '123';
      component.password = 'password';
      expect(component.canValidate).toBeTrue();
    });
  });

  describe('login', () => {
    it('should navigate to /admin and show success message on successful login', () => {
      const response = new HttpResponse({ status: 200 });
      authService.login.and.returnValue(of(response));

      component.serialNumber = '12345';
      component.password = 'password';
      component.login();

      expect(authService.login).toHaveBeenCalledWith({ serialNumber: '12345', password: 'password' });
      expect(router.navigate).toHaveBeenCalledWith(['/admin']);
      expect(toastr.success).toHaveBeenCalledWith('Connexion réussie');
    });

    it('should show error message and set isNotLoggedIn to true on failed login', () => {
      const errorResponse = new HttpResponse({ status: 401 });
      authService.login.and.returnValue(throwError(() => errorResponse));

      component.serialNumber = '12345';
      component.password = 'wrongpassword';
      component.login();

      expect(authService.login).toHaveBeenCalledWith({ serialNumber: '12345', password: 'wrongpassword' });
      expect(toastr.error).toHaveBeenCalledWith('Erreur de connexion');
      expect(component.isNotLoggedIn).toBeTrue();
    });
  });

});
