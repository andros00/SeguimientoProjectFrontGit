import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorInstitucionComponent } from './contenedor-institucion.component';

describe('ContenedorInstitucionComponent', () => {
  let component: ContenedorInstitucionComponent;
  let fixture: ComponentFixture<ContenedorInstitucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenedorInstitucionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenedorInstitucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
