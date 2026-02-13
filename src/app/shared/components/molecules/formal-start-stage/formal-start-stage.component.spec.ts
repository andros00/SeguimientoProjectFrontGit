import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormalStartStageComponent } from './formal-start-stage.component';

describe('FormalStartStageComponent', () => {
  let component: FormalStartStageComponent;
  let fixture: ComponentFixture<FormalStartStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormalStartStageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormalStartStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
