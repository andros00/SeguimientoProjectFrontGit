import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarButtonsComponent } from './sidebar-buttons.component';

describe('SidebarButtonsComponent', () => {
  let component: SidebarButtonsComponent;
  let fixture: ComponentFixture<SidebarButtonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarButtonsComponent]
    });
    fixture = TestBed.createComponent(SidebarButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
