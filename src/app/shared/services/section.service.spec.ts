import { TestBed } from '@angular/core/testing';

import { SectionService } from './section.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SectionService', () => {
  let service: SectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
