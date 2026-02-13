import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompromisoFechaComponent } from './compromiso-fecha.component';

describe('CompromisoFechaComponent', () => {
  let component: CompromisoFechaComponent;
  let fixture: ComponentFixture<CompromisoFechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompromisoFechaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompromisoFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
