/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { ParticipantGroupService } from './participant-group.service';

describe('Service: ParticipantGroup', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParticipantGroupService]
    });
  });

  it('should ...', inject([ParticipantGroupService], (service: ParticipantGroupService) => {
    expect(service).toBeTruthy();
  }));
});
