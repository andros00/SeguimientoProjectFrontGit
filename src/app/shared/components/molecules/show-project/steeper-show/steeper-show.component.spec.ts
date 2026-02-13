import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SteeperShowComponent } from './steeper-show.component';

describe('SteeperShowComponent', () => {
  let component: SteeperShowComponent;
  let fixture: ComponentFixture<SteeperShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SteeperShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SteeperShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
