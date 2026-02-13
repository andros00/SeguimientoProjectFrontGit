import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompromisoNotaComponent } from './compromiso-nota.component';

describe('CompromisoNotaComponent', () => {
  let component: CompromisoNotaComponent;
  let fixture: ComponentFixture<CompromisoNotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompromisoNotaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompromisoNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
