import { TestBed } from '@angular/core/testing';

import { BikeService } from './bike.service';

describe('BikeService', () => {
  let service: BikeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BikeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
