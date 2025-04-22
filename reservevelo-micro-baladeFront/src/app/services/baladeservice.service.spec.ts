import { TestBed } from '@angular/core/testing';

import { BaladeserviceService } from './baladeservice.service';

describe('BaladeserviceService', () => {
  let service: BaladeserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaladeserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
