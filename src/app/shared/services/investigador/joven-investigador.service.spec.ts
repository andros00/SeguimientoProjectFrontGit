import { TestBed } from '@angular/core/testing';

import { JovenInvestigadorService } from './joven-investigador.service';

describe('JovenInvestigadorService', () => {
  let service: JovenInvestigadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JovenInvestigadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
