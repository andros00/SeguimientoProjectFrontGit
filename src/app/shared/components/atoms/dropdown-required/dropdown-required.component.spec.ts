import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownRequiredComponent } from './dropdown-required.component';

describe('DropdownRequiredComponent', () => {
  let component: DropdownRequiredComponent;
  let fixture: ComponentFixture<DropdownRequiredComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownRequiredComponent]
    });
    fixture = TestBed.createComponent(DropdownRequiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
