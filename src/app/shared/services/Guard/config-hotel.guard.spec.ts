import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { configHotelGuard } from './config-hotel.guard';

describe('configHotelGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => configHotelGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
