import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoDetalleModalComponent } from './proyecto-detalle-modal.component';

describe('ProyectoDetalleModalComponent', () => {
  let component: ProyectoDetalleModalComponent;
  let fixture: ComponentFixture<ProyectoDetalleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProyectoDetalleModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProyectoDetalleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
