import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormalStartPagesComponent } from './formal-start-pages.component';

describe('FormalStartPagesComponent', () => {
  let component: FormalStartPagesComponent;
  let fixture: ComponentFixture<FormalStartPagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormalStartPagesComponent]
    });
    fixture = TestBed.createComponent(FormalStartPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
