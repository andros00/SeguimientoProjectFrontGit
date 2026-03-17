import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormalStartSupportDocComponent } from './formal-start-support-doc.component';

describe('FormalStartSupportDocComponent', () => {
  let component: FormalStartSupportDocComponent;
  let fixture: ComponentFixture<FormalStartSupportDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormalStartSupportDocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormalStartSupportDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
