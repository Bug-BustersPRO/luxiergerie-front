import { TestBed } from '@angular/core/testing';
import { ConfigHotelGuard } from './config-hotel.guard';

describe('ConfigHotelGuard', () => {
  let guard: ConfigHotelGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ConfigHotelGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});