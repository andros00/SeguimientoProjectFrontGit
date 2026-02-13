import { TestBed } from '@angular/core/testing';

import { ActaServiceService } from './acta-service.service';

describe('ActaServiceService', () => {
  let service: ActaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
