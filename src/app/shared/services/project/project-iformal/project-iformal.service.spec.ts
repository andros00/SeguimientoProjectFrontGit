/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { ProjectIformalService } from './project-iformal.service';

describe('Service: ProjectIformal', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectIformalService]
    });
  });

  it('should ...', inject([ProjectIformalService], (service: ProjectIformalService) => {
    expect(service).toBeTruthy();
  }));
});
