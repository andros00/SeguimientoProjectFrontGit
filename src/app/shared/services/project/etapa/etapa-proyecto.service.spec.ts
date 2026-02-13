import { TestBed } from '@angular/core/testing';

import { EtapaProyectoService } from './etapa-proyecto.service';

describe('EtapaProyectoService', () => {
  let service: EtapaProyectoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtapaProyectoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
