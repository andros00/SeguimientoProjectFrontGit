import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroInstitucionComponent } from './filtro-institucion.component';

describe('FiltroInstitucionComponent', () => {
  let component: FiltroInstitucionComponent;
  let fixture: ComponentFixture<FiltroInstitucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltroInstitucionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroInstitucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
