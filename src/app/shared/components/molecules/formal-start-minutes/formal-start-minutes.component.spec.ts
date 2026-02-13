import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormalStartMinutesComponent } from './formal-start-minutes.component';

describe('FormalStartMinutesComponent', () => {
  let component: FormalStartMinutesComponent;
  let fixture: ComponentFixture<FormalStartMinutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormalStartMinutesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormalStartMinutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
