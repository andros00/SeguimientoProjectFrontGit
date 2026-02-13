import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInfoCardInfoComponent } from './general-info-card-info.component';

describe('GeneralInfoCardInfoComponent', () => {
  let component: GeneralInfoCardInfoComponent;
  let fixture: ComponentFixture<GeneralInfoCardInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralInfoCardInfoComponent]
    });
    fixture = TestBed.createComponent(GeneralInfoCardInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
