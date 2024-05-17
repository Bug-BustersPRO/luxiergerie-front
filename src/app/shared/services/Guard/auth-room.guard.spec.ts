import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authRoomGuard } from './auth-room.guard';

describe('authRoomGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authRoomGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
