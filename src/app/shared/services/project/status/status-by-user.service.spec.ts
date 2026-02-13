import { TestBed } from '@angular/core/testing';

import { StatusByUserService } from './status-by-user.service';

describe('StatusByUserService', () => {
  let service: StatusByUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusByUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
