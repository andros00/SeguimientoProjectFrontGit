import { TestBed } from '@angular/core/testing';

import { ProjectSelectionService } from './project-selection.service';

describe('ProjectSelectionService', () => {
  let service: ProjectSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
