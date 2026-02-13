import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInfoFormalStartComponent } from './project-info-formal-start.component';

describe('ProjectInfoFormalStartComponent', () => {
  let component: ProjectInfoFormalStartComponent;
  let fixture: ComponentFixture<ProjectInfoFormalStartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectInfoFormalStartComponent]
    });
    fixture = TestBed.createComponent(ProjectInfoFormalStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
