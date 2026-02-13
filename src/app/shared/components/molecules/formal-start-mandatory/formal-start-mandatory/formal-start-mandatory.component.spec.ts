import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormalStartMandatoryComponent } from './formal-start-mandatory.component';

describe('FormalStartMandatoryComponent', () => {
  let component: FormalStartMandatoryComponent;
  let fixture: ComponentFixture<FormalStartMandatoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormalStartMandatoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormalStartMandatoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
