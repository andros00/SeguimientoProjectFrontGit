import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ModalDinamicoComponent } from './modal-dinamico.component';
import { DatoAdicionalAportante } from 'src/app/proyecto/modelo/dato-adicional-aportante';

describe('ModalDinamicoComponent', () => {
    let component: ModalDinamicoComponent;
    let fixture: ComponentFixture<ModalDinamicoComponent>;
    let mockDialogRef: MatDialogRef<ModalDinamicoComponent>;
    let DatosModal;

    beforeEach(async () => {
        mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

        const data = {
            titulo: 'prueba',
            mensaje: 'prueba',
            clase: 'prueba',
            textoPrimerBoton: 'prueba',
            textoSegundoBoton: 'prueba'
        };

        await TestBed.configureTestingModule({
            declarations: [ModalDinamicoComponent],
            providers: [
                { provide: MatDialogRef, useValue: mockDialogRef },
                { provide: MAT_DIALOG_DATA, useValue: data }
            ],
            imports: [
                MatFormFieldModule,
                MatSelectModule,
                MatOptionModule,
                ReactiveFormsModule,
                MatMenuModule,
                HttpClientTestingModule
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(ModalDinamicoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('debería actualizar datosModal.editarAportante cuando se recibe un aportante', () => {
        const event: DatoAdicionalAportante = {
            tipoFinanciacion: {
                identificador: 1,
                nombre: 'prueba',
                descripcion: 'prueba',
                estado: 'H'
            },
            sectorAportante: {
                identificador: 1,
                nombre: 'prueba',
                descripcion: 'prueba',
                estado: 'H'
            },
        };

        component.datosModal = {
            titulo: 'prueba',
            mensaje: 'prueba',
            clase: 'prueba',
            textoPrimerBoton: 'prueba',
            textoSegundoBoton: 'prueba',
            editarAportante: {
                tipoFinanciacion: {
                    identificador: 1,
                    nombre: 'prueba',
                    descripcion: 'prueba',
                    estado: 'H'
                },
                sectorAportante: {
                    identificador: 1,
                    nombre: 'prueba',
                    descripcion: 'prueba',
                    estado: 'H'
                },
            },
        };

        component.recibirAportante(event);

        expect(component.datosModal.editarAportante.tipoFinanciacion).toEqual(event.tipoFinanciacion);
        expect(component.datosModal.editarAportante.sectorAportante).toEqual(event.sectorAportante);
    });
});
