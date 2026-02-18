import { Injectable } from '@angular/core';
//import { ServicioProyectoLocal } from './servicio-proyecto-local';
import { ProyectoLocalService } from './proyecto-local.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProyectoConstantes } from '../../components/molecules/show-project/proyecto-constantes';
import { ProyectoMensajes } from '../../components/molecules/show-project/proyecto-mensajes';


@Injectable({
    providedIn: 'root'
})
export class InformacionComplementariaLocalService {

    private datoAdicionalSubject = new BehaviorSubject<string>('');
    private darBaja$ = new Subject<void>();

    private propiedadTitulos: { [propiedad: string]: string } = {
        [ProyectoConstantes.INFORMACION_COMPLEMENTARIA_SECCION_ODS]: ProyectoConstantes.INFORMACION_COMPLEMENTARIA_TITULO_ODS,
        [ProyectoConstantes.INFORMACION_COMPLEMENTARIA_SECCION_FOCOS]: ProyectoConstantes.INFORMACION_COMPLEMENTARIA_TITULO_FOCOS,
        [ProyectoConstantes.INFORMACION_COMPLEMENTARIA_SECCION_G8]: ProyectoConstantes.INFORMACION_COMPLEMENTARIA_TITULO_G8,
        [ProyectoConstantes.INFORMACION_COMPLEMENTARIA_SECCION_ECONOMI]: ProyectoConstantes.INFORMACION_COMPLEMENTARIA_TITULO_ECONOMI,
    };

    constructor(private proyectoServicioLocal: ProyectoLocalService) {
    }

    validarInformacionComplementaria(): string {
        return this.datoAdicionalSubject.getValue();
    }

    actualizarInformacionComplementaria(codigo: string) {
        // original implementation fetched data from external service, but that service is
        // not present in this project. compile-time stub: simply clear any existing message.
        if (!this.datoAdicionalSubject.closed) {
            this.datoAdicionalSubject.next('');
        }
    }

    ngOnDestroy() {
        this.darBaja$.next();
        this.darBaja$.complete();
    }

    private obtenerMensajePorPropiedad(propiedad: string): string {
        return this.propiedadTitulos[propiedad] || '';
    }
}
