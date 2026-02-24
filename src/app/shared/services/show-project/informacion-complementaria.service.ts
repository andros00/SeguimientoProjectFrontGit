import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DatosAdicionales } from '../../components/molecules/show-project/datos-adicionales';
import { DireccionesUrl } from '../../components/molecules/show-project/direcciones-url';


@Injectable({
    providedIn: 'root'
})
export class InformacionComplementariaService {

    constructor(private http: HttpClient) { }

    obtenerDatosAdicionales(): Observable<DatosAdicionales> {
        const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.CONSULTAR_DATOS_ADICIONALES}`;
        return this.http.get<DatosAdicionales>(url, { headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' } });
    }

    guardarInformacionComplementaria(data: DatosAdicionales): Observable<void> {
        const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.GUARDAR_INFORMACION_COMPLEMENTARIA}`;
        return this.http.post<void>(url, data, { headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' } });
    }

    retornarInformacionComplementariaPorProyecto(proyecto: string): Observable<DatosAdicionales>{
        const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.CONSULTAR_INFORMACION_COMPLEMENTARIA_POR_PROYECTO}${proyecto}`;
        return this.http.get<DatosAdicionales>(url, { headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' } });
    }

}
