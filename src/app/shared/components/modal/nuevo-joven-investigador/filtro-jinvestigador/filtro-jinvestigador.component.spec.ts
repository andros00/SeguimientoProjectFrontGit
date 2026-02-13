import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroJinvestigadorComponent } from './filtro-jinvestigador.component';

describe('FiltroInstitucionComponent', () => {
  let component: FiltroJinvestigadorComponent;
  let fixture: ComponentFixture<FiltroJinvestigadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltroJinvestigadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroJinvestigadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
