import { TestBed } from '@angular/core/testing';
import { ConfigHotelGuard } from './config-hotel.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ConfigHotelGuard', () => {
  let guard: ConfigHotelGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    guard = TestBed.inject(ConfigHotelGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
