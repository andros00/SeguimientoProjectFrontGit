import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AportanteProyectoService } from '../../servicios/aportante-proyecto.service';
import { ProyectoLocalService } from '../../servicio-local/proyecto-local.service';
import { AportanteProyectoLocalService } from '../../servicio-local/aportante-proyecto-local.service';
import { TablaCofinanciadoresProyectoComponent } from './tabla-cofinanciadores-proyecto.component';

describe('TablaCofinanciadoresProyectoComponent', () => {
  let component: TablaCofinanciadoresProyectoComponent;
  let fixture: ComponentFixture<TablaCofinanciadoresProyectoComponent>;
  let dialog: MatDialog;
  let aportanteProyectoService: AportanteProyectoService;

  beforeEach(() => {
    const activatedRouteStub = () => ({
      snapshot: { queryParams: { estado: {} } }
    });
    const matDialogStub = () => ({
      open: (modalDinamicoComponent, object) => ({ afterClosed: () => of({}) })
    });
    const aportanteProyectoServiceStub = () => ({
      consultarListaAportanteProyecto: codigoProyecto1 => ({ subscribe: f => f({}) }),
      eliminarAportante: identificador => ({ subscribe: f => f({}) })
    });
    const proyectoLocalServiceStub = () => ({
      obtenerInformacionGeneralProyecto: () => ({}),
      observableProyectoGuardado: () => ({ subscribe: f => f({}) })
    });
    const aportanteProyectoLocalServiceStub = () => ({
      listaAportanteTemporalObservable: { subscribe: f => f({}) },
      agregarListaAportanteProyecto: listaAportante => ({}),
      agregarListaAportanteTemporal: listaAportante => ({}),
      obtenerListaAportante: () => ({}),
      eliminarAportanteProyecto: aportanteProyecto => ({})
    });

    TestBed.configureTestingModule({
        schemas: [NO_ERRORS_SCHEMA],
        declarations: [TablaCofinanciadoresProyectoComponent],
        providers: [
            { provide: ActivatedRoute, useValue: activatedRouteStub },
            { provide: MatDialog, useFactory: matDialogStub },
            { provide: AportanteProyectoService, useFactory: aportanteProyectoServiceStub },
            { provide: ProyectoLocalService, useFactory: proyectoLocalServiceStub },
            { provide: AportanteProyectoLocalService, useFactory: aportanteProyectoLocalServiceStub }
          ]
        });
        fixture = TestBed.createComponent(TablaCofinanciadoresProyectoComponent);
        dialog = TestBed.get(MatDialog);
        aportanteProyectoService = TestBed.get(AportanteProyectoService);
    component = fixture.componentInstance;
  });

  it('debe abrir un modal y llamar a actualizarAportante cuando se oprima el botón de aceptar', () => {
    const aportanteProyectoMock = { identificador: 1 };
    const modalRefMock = { afterClosed: () => of({ textoSegundoBoton: 'ACEPTAR', editarAportante: aportanteProyectoMock }) };
    spyOn(dialog, 'open').and.returnValue(modalRefMock);
    const actualizarAportanteSpy = spyOn(component, 'actualizarAportante');

    component.validarEditarAportante(aportanteProyectoMock);

    expect(dialog.open).toHaveBeenCalled();
    expect(actualizarAportanteSpy).toHaveBeenCalledWith(aportanteProyectoMock);
  });

  it('no debe llamar a actualizarAportante cuando se oprima el botón de cancelar', () => {
    const aportanteProyectoMock = { identificador: 1 };
    const modalRefMock = { afterClosed: () => of({ textoSegundoBoton: 'CANCELAR', editarAportante: aportanteProyectoMock }) };
    spyOn(dialog, 'open').and.returnValue(modalRefMock);
    const actualizarAportanteSpy = spyOn(component, 'actualizarAportante');

    component.validarEditarAportante(aportanteProyectoMock);

    expect(dialog.open).toHaveBeenCalled();
    expect(actualizarAportanteSpy).not.toHaveBeenCalled();
  }); 
});