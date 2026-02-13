import { TestBed } from '@angular/core/testing';

import { ParticipantVinculoService } from './participant-vinculo.service';

describe('ParticipantVinculoService', () => {
  let service: ParticipantVinculoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticipantVinculoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
