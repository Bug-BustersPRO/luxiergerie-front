import { TestBed } from '@angular/core/testing';
import { AuthGuardService } from './auth-room.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthGuardService', () => {
  let service: AuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a function for authRoom', () => {
    const result = service.authRoom();
    expect(result).toBeInstanceOf(Function);
  });

  it('should return a function for authEmployee', () => {
    const result = service.authEmployee();
    expect(result).toBeInstanceOf(Function);
  });
});
