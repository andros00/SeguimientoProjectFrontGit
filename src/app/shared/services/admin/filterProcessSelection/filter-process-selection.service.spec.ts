import { TestBed } from '@angular/core/testing';

import { FilterProcessSelectionService } from './filter-process-selection.service';

describe('FilterProcessSelectionService', () => {
  let service: FilterProcessSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterProcessSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
