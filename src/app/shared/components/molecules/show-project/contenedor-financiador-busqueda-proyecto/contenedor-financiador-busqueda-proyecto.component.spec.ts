import { ContenedorFinanciadorBusquedaProyectoComponent } from './contenedor-financiador-busqueda-proyecto.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { EventEmitter, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonaJuridica } from '../../modelo/persona-juridica';
import { DatosAdicionales } from 'src/app/proyecto/modelo/datos-adicionales';
import { DatosAdicionalesAportantes } from 'src/app/proyecto/modelo/datos-adicional-aportantes';
import { DatoAdicionalAportante } from 'src/app/proyecto/modelo/dato-adicional-aportante';

describe('ContenedorFinanciadorBusquedaProyectoComponent', () => {
    let component: ContenedorFinanciadorBusquedaProyectoComponent;
    let fixture: ComponentFixture<ContenedorFinanciadorBusquedaProyectoComponent>;
    let datos: DatoAdicionalAportante;

    beforeEach(() => {

        datos = {
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
            }
        };


        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule,
                MatDialogModule],
            providers: [
                { provide: MatDialogRef, useValue: {} },
                { provide: MAT_DIALOG_DATA, useValue: {} }
            ],
            declarations: [ContenedorFinanciadorBusquedaProyectoComponent],
            schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(ContenedorFinanciadorBusquedaProyectoComponent);
        component = fixture.componentInstance;
        component.emitirCofinanciadorMatriculaProyecto = new EventEmitter();
    });

    it('debería emitir cofinanciadorMatriculaProyecto al cambiar el formulario', () => {
        spyOn(component.emitirCofinanciadorMatriculaProyecto, 'emit');
        component.cofinanciadorMatriculaProyecto = datos
        component.cambioFormularioCofinanciadorMatriculaProyecto();

        expect(component.emitirCofinanciadorMatriculaProyecto.emit).toHaveBeenCalledWith(component.cofinanciadorMatriculaProyecto);
    });

    it('debería enviar los datos correctos a ResultadosFinanciador', () => {
        component.listaPersonaJuridica = null;
        component.cofinanciadorMatriculaProyecto = datos;

        const resultado = component.enviarDatosAResultadosFinanciador();

        expect(resultado.listaPersonaJuridica).toBe(component.listaPersonaJuridica);
        expect(resultado.cofinanciadorMatriculaProyecto).toBe(component.cofinanciadorMatriculaProyecto);
    });

    it('Debe infoCofinanciador ser verdadero para que permita habilitar información adicional', () => {
        component.infoCofinanciador = true;

        const resultado = component.activarAgregarInfoAdicionalCofinanciador();

        expect(resultado).toBe(true);
    });

    it('debería enviar datos a resultados financiador ajustados dado que se esta trabajando en modal de cofinanciadores e informacion adicional aun no esta diligenciada', () => {
        component.infoCofinanciador = true;
        component.cofinanciadorMatriculaProyecto = undefined;

        const resultado = component.enviarDatosAResultadosFinanciador();

        expect(resultado.listaPersonaJuridica).toEqual(component.listaPersonaJuridica);
        expect(resultado.cofinanciadorMatriculaProyecto).toEqual({
            sectorAportante: null,
            tipoFinanciacion: null,
        });
    });

    it('debería enviar datos a resultados financiador sin realizar ningun ajuste dado que infoCofinanciador es falso y no se esta trabajando en cofinanciadores', () => {
        component.infoCofinanciador = false;
        component.cofinanciadorMatriculaProyecto = undefined;

        const resultado = component.enviarDatosAResultadosFinanciador();

        expect(resultado.listaPersonaJuridica).toEqual(component.listaPersonaJuridica);
        expect(resultado.cofinanciadorMatriculaProyecto).toBeUndefined();
    });

    it('debería enviar datos a resultados financiador sin ajustes dado que se esta trabajndo en modal de cofinanciadores y informacion adiconal esta diligenciada', () => {
        component.infoCofinanciador = true;
        component.cofinanciadorMatriculaProyecto = datos;

        const resultado = component.enviarDatosAResultadosFinanciador();

        expect(resultado.listaPersonaJuridica).toEqual(component.listaPersonaJuridica);
        expect(resultado.cofinanciadorMatriculaProyecto).toEqual(component.cofinanciadorMatriculaProyecto);
    });

    it('Cuando infoCofinanciador es false no debe permitir habilitar información adicional', () => {
        component.infoCofinanciador = false;

        const resultado = component.activarAgregarInfoAdicionalCofinanciador();

        expect(resultado).toBe(false);
    });
});