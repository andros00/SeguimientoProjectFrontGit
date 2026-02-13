import { TestBed } from '@angular/core/testing';

import { ActividadProyectoService } from './actividad-proyecto.service';

describe('ActividadProyectoService', () => {
  let service: ActividadProyectoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActividadProyectoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
