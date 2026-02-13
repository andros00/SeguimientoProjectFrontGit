import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HojaVidaJinvestComponent } from './hoja-vida-jinvest.component';

describe('HojaVidaJinvestComponent', () => {
  let component: HojaVidaJinvestComponent;
  let fixture: ComponentFixture<HojaVidaJinvestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HojaVidaJinvestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HojaVidaJinvestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
