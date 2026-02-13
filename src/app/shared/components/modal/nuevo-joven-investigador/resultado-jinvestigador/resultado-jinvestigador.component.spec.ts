import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoJinvestigadorComponent } from './resultado-jinvestigador.component';

describe('ResultadoInstitucionComponent', () => {
  let component: ResultadoJinvestigadorComponent;
  let fixture: ComponentFixture<ResultadoJinvestigadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultadoJinvestigadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadoJinvestigadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
