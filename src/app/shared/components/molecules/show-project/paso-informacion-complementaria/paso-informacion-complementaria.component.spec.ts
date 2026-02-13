import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoInformacionComplementariaComponent } from './paso-informacion-complementaria.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListaInformacionComplementariaComponent } from '../lista-informacion-complementaria/lista-informacion-complementaria.component';
import { MensajeExitoErrorComponent } from '../mensaje-exito-error/mensaje-exito-error.component';

describe('PasoInformacionComplementariaComponent', () => {
  let component: PasoInformacionComplementariaComponent;
  let fixture: ComponentFixture<PasoInformacionComplementariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PasoInformacionComplementariaComponent, MensajeExitoErrorComponent, ListaInformacionComplementariaComponent],
      imports: [MatIconModule, MatMenuModule,
        MatExpansionModule,
        MatCheckboxModule,
        ReactiveFormsModule,
         BrowserAnimationsModule,
         FormsModule,
         HttpClientTestingModule],
      providers: [
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasoInformacionComplementariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
