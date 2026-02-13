import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapaModalComponent } from './etapa-modal.component';

describe('EtapaModalComponent', () => {
  let component: EtapaModalComponent;
  let fixture: ComponentFixture<EtapaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtapaModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtapaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
