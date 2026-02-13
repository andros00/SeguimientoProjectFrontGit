import { TestBed } from '@angular/core/testing';

import { AdministrativeCenterService } from './administrative-center.service';

describe('AdministrativeCenterService', () => {
  let service: AdministrativeCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdministrativeCenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
