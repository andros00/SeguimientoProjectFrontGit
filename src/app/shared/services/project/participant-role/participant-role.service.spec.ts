/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { ParticipantRoleService } from './participant-role.service';

describe('Service: ParticipantRole', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParticipantRoleService]
    });
  });

  it('should ...', inject([ParticipantRoleService], (service: ParticipantRoleService) => {
    expect(service).toBeTruthy();
  }));
});
