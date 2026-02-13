import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JovenInvestigadorComponent } from './joven-investigador.component';

describe('JovenInvestigadorComponent', () => {
  let component: JovenInvestigadorComponent;
  let fixture: ComponentFixture<JovenInvestigadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JovenInvestigadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JovenInvestigadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
