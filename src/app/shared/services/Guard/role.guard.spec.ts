import { TestBed } from '@angular/core/testing';
import { RoleGuard } from './role.guard';

describe('roleGuard', () => {
  let guard = RoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

});