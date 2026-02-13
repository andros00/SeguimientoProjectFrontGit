import { TestBed, ComponentFixture } from '@angular/core/testing';
import { PestanaDescripcionProyectoComponent } from './pestana-descripcion-proyecto.component';
import { ProyectoLocalService } from 'src/app/proyecto/servicio-local/proyecto-local.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { ScrollToModule, ScrollToService } from '@nicky-lenaers/ngx-scroll-to';


import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';

import { FormatoEstilosPipe } from 'src/app/shared/formato-estilos.pipe';
import { ListaDescripcionProyectoComponent } from '../lista-descripcion-proyecto/lista-descripcion-proyecto.component';
import { ProyectoConstantes } from '../../proyecto-constantes';

describe('PestanaDescripcionProyectoComponent', () => {
    let component: PestanaDescripcionProyectoComponent;
    let fixture: ComponentFixture<PestanaDescripcionProyectoComponent>;
    let proyectoServicioLocalMock: jasmine.SpyObj<ProyectoLocalService>;
    const OTRO_PROCESO_SELECCION: number = 1450;

    beforeEach(async () => {
        proyectoServicioLocalMock = jasmine.createSpyObj('ProyectoServicioLocal', ['obtenerInformacionGeneralProcesoSeleccion']);

        await TestBed.configureTestingModule({
            declarations: [
                PestanaDescripcionProyectoComponent,
                ListaDescripcionProyectoComponent,
                FormatoEstilosPipe],
            imports: [
                MatInputModule,
                MatIconModule,
                MatMenuModule,
                MatSelectModule,
                ReactiveFormsModule,
                HttpClientTestingModule,
                BrowserAnimationsModule,
                MatExpansionModule,
                MatDialogModule,
                FormsModule
//                ScrollToModule
            ],
            providers: [
                { provide: ProyectoLocalService, useValue: proyectoServicioLocalMock },
//                ScrollToService
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PestanaDescripcionProyectoComponent);
        component = fixture.componentInstance;
    });

    it('debe establecer esProyectoSeleccionInscritoOAvales a true cuando informacionGeneral.identificador es PROCESO_SELECCION_INSCRITO', () => {
        const informacionGeneral = { identificador: ProyectoConstantes.PROCESO_SELECCION_INSCRITO };
        proyectoServicioLocalMock.obtenerInformacionGeneralProcesoSeleccion.and.returnValue(of(informacionGeneral));

        component.ngOnInit();

        expect(component.esProyectoSeleccionInscritoOAvales).toBe(true);
    });

    it('debe establecer esProyectoSeleccionInscritoOAvales a true cuando informacionGeneral.identificador es PROCESO_SELECCION_AVALES', () => {
        const informacionGeneral = { identificador: ProyectoConstantes.PROCESO_SELECCION_AVALES };
        proyectoServicioLocalMock.obtenerInformacionGeneralProcesoSeleccion.and.returnValue(of(informacionGeneral));

        component.ngOnInit();
        expect(component.esProyectoSeleccionInscritoOAvales).toBe(true);
    });

    it('debe establecer esProyectoSeleccionInscritoOAvales a false cuando informacionGeneral.identificador no es PROCESO_SELECCION_INSCRITO o PROCESO_SELECCION_AVALES', () => {
        const informacionGeneral = { identificador: OTRO_PROCESO_SELECCION };
        proyectoServicioLocalMock.obtenerInformacionGeneralProcesoSeleccion.and.returnValue(of(informacionGeneral));

        component.ngOnInit();
        expect(component.esProyectoSeleccionInscritoOAvales).toBe(false);
    });

    it('debe destruir la suscripcion cuando no se este usando en el ngOnDestroy', () => {
        component.subscription = jasmine.createSpyObj('Subscription', ['unsubscribe']);
        component.ngOnDestroy();
        expect(component.subscription.unsubscribe).toHaveBeenCalled();
    });
});
