import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoInstitucionComponent } from './resultado-institucion.component';

describe('ResultadoInstitucionComponent', () => {
  let component: ResultadoInstitucionComponent;
  let fixture: ComponentFixture<ResultadoInstitucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultadoInstitucionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadoInstitucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
