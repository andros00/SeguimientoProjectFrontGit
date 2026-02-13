import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorJinvestigadorComponent } from './contenedor-jinvestigador.component';

describe('ContenedorInstitucionComponent', () => {
  let component: ContenedorJinvestigadorComponent;
  let fixture: ComponentFixture<ContenedorJinvestigadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenedorJinvestigadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenedorJinvestigadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
