import { TestBed } from '@angular/core/testing';
import { HotelService } from './hotel.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HotelService', () => {
  let service: HotelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(HotelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});