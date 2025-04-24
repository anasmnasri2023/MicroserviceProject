import { TestBed } from '@angular/core/testing';

import { RentBikeService } from './rent-bike.service';

describe('RentBikeService', () => {
  let service: RentBikeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentBikeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
