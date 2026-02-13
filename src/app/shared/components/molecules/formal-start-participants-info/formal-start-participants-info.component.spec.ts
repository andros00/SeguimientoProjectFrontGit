/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormalStartParticipantsInfoComponent } from './formal-start-participants-info.component';

describe('FormalStartParticipantsInfoComponent', () => {
  let component: FormalStartParticipantsInfoComponent;
  let fixture: ComponentFixture<FormalStartParticipantsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormalStartParticipantsInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormalStartParticipantsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
