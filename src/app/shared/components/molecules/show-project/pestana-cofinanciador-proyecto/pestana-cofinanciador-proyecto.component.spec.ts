import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { PestanaCofinanciadorProyectoComponent } from './pestana-cofinanciador-proyecto.component';
import { AportanteProyectoService } from '../../servicios/aportante-proyecto.service';
import { AportanteProyectoLocalService } from '../../servicio-local/aportante-proyecto-local.service';
import { ProyectoLocalService } from '../../servicio-local/proyecto-local.service';
import { AlertaLocalService } from '../../../shared/servicio-local/alerta-local.service';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { MensajeExitoErrorComponent } from 'src/app/shared/componentes/mensaje-exito-error/mensaje-exito-error.component';
import { TablaCofinanciadoresProyectoComponent } from '../tabla-cofinanciadores-proyecto/tabla-cofinanciadores-proyecto.component';
import { ContenedorFinanciadorBusquedaProyectoComponent } from 'src/app/shared/componentes/contenedor-financiador-busqueda-proyecto/contenedor-financiador-busqueda-proyecto.component';

describe('PestanaCofinanciadorProyectoComponent', () => {
    let component: PestanaCofinanciadorProyectoComponent;
    let fixture: ComponentFixture<PestanaCofinanciadorProyectoComponent>;
    let dialogSpy: jasmine.SpyObj<MatDialog>;
    let aportanteProyectoServiceSpy: jasmine.SpyObj<AportanteProyectoService>;
    let aportanteProyectoLocalServiceSpy: jasmine.SpyObj<AportanteProyectoLocalService>;
    let proyectoLocalServiceSpy: jasmine.SpyObj<ProyectoLocalService>;
    let alertaLocalServiceSpy: jasmine.SpyObj<AlertaLocalService>;

    beforeEach(() => {
        dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
        aportanteProyectoServiceSpy = jasmine.createSpyObj('AportanteProyectoService', ['guardarAportanteProyecto']);
        aportanteProyectoLocalServiceSpy = jasmine.createSpyObj('AportanteProyectoLocalService', [
            'obtenerListaAportanteTemporal',
            'agregarListaAportanteTemporal',
            'agregarListaAportanteProyecto',
            'agregarAportanteProyecto'
        ]);
        proyectoLocalServiceSpy = jasmine.createSpyObj('ProyectoLocalService', ['obtenerInformacionGeneralProyecto']);
        alertaLocalServiceSpy = jasmine.createSpyObj('AlertaLocalService', ['agregarMensaje']);

        TestBed.configureTestingModule({
            declarations: [PestanaCofinanciadorProyectoComponent, MensajeExitoErrorComponent, TablaCofinanciadoresProyectoComponent],
            imports: [
                AngularMaterialModule,
                HttpClientTestingModule,
                BrowserAnimationsModule
              ],
            providers: [
                { provide: MatDialog, useValue: dialogSpy },
                { provide: AportanteProyectoService, useValue: aportanteProyectoServiceSpy },
                { provide: AportanteProyectoLocalService, useValue: aportanteProyectoLocalServiceSpy },
                { provide: ProyectoLocalService, useValue: proyectoLocalServiceSpy },
                { provide: AlertaLocalService, useValue: alertaLocalServiceSpy },
                { provide: ActivatedRoute },
            ]
        });

        fixture = TestBed.createComponent(PestanaCofinanciadorProyectoComponent);
        component = fixture.componentInstance;
    });

    it('debería abrir el diálogo al llamar a abrirVentanaBuscarFinanciador', () => {
        component.abrirVentanaBuscarFinanciador();

        expect(dialogSpy.open).toHaveBeenCalledWith(ContenedorFinanciadorBusquedaProyectoComponent, {
            data: true
        });
    });

});
