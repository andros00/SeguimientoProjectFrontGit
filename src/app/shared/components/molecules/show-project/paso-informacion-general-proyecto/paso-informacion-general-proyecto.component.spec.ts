import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PasoInformacionGeneralProyectoComponent } from './paso-informacion-general-proyecto.component';
import { ProyectoConstantes } from '../../proyecto-constantes';

describe('PasoInformacionGeneralProyectoComponent', () => {
    let component: PasoInformacionGeneralProyectoComponent;
    let fixture: ComponentFixture<PasoInformacionGeneralProyectoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PasoInformacionGeneralProyectoComponent],
            imports: [
                ReactiveFormsModule,
                FormsModule,
                HttpClientTestingModule,
                BrowserAnimationsModule,
                RouterTestingModule,
                MatMenuModule,
                MatSlideToggleModule,
                MatFormFieldModule,
                MatInputModule,
                MatIconModule,
                MatCardModule,
                MatSelectModule,
                MatCheckboxModule,
                MatDatepickerModule,
                MatNativeDateModule,
                MatAutocompleteModule,
            ],
            providers: [
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PasoInformacionGeneralProyectoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Deberia actualizar procesoSeleccion cuando convocatoria es seleccionado', () => {
        expect(component.formularioInformacionGeneralProyecto).toBeTruthy();

        const convocatoriaSeleccionadaMock = {
            procesoSeleccion: {
                informacionGeneral: 'Información General de Prueba'
            }
        };
        component.formularioInformacionGeneralProyecto.controls['convocatoria'].setValue(convocatoriaSeleccionadaMock);

        spyOn(component, 'validarSiLimitaDescripciones');
        spyOn(component, 'centroPorDefectoParaJovenInvestigadorUdea');

        component.procesoConvocatoriaSeleccionado();

        expect(component.formularioInformacionGeneralProyecto.controls['procesoSeleccion'].value)
            .toEqual(convocatoriaSeleccionadaMock.procesoSeleccion.informacionGeneral);

        expect(component.validarSiLimitaDescripciones).toHaveBeenCalled();
        expect(component.centroPorDefectoParaJovenInvestigadorUdea).toHaveBeenCalled();
    });

    it('debería nulificar convocatoria y modalidad, y llamar a métodos relevantes', () => {
        spyOn(component, 'validarSiLimitaDescripciones');
     
        component.procesoSeleccionSeleccionado();
     
        expect(component.formularioInformacionGeneralProyecto.controls['convocatoria'].value).toBeNull();
        expect(component.formularioInformacionGeneralProyecto.controls['modalidad'].value).toBeNull();
        expect(component.validarSiLimitaDescripciones).toHaveBeenCalled();
      });
});