import { TestBed } from '@angular/core/testing';

import { CompromisoNotaService } from './compromiso-nota.service';

describe('CompromisoNotaService', () => {
  let service: CompromisoNotaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompromisoNotaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
