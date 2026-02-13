import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormalStartGeneralInfoComponent } from './formal-start-general-info.component';

describe('FormalStartGeneralInfoComponent', () => {
  let component: FormalStartGeneralInfoComponent;
  let fixture: ComponentFixture<FormalStartGeneralInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormalStartGeneralInfoComponent]
    });
    fixture = TestBed.createComponent(FormalStartGeneralInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
