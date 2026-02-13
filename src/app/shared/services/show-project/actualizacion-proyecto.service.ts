import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DireccionesUrl } from '../../components/molecules/show-project/direcciones-url';
import { ActualizacionProyecto } from '../../components/molecules/show-project/actualizacion-proyecto';

@Injectable({
  providedIn: 'root'
})
export class ActualizacionProyectoService {

  constructor(private http: HttpClient) { }

  consultarActualizacionesDeProyecto(codigo: string): Observable<ActualizacionProyecto[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.CONSULTA_ACTUALIZACIONES_PROYECTO}/${codigo}`;
    return this.http.get<ActualizacionProyecto[]>(url);
  }

  validarInstanciaAutorizadora(codigoProyecto: string): Observable<string> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.VALIDAR_INSTANCIA_AUTORIZADORA}${codigoProyecto}`;
    return this.http.request('get', url, { responseType: 'text' });
  }

  guardarActualizacionProyecto(actualizacionProyecto: ActualizacionProyecto): Observable<ActualizacionProyecto> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.GUARDAR_ACTUALIZACION_PROYECTO}`;
    return this.http.post<ActualizacionProyecto>(url, actualizacionProyecto);
  }

  guardarActualizacionProyectoInvestigador(actualizacionProyecto: ActualizacionProyecto,
    enviadoACentro = 'false'): Observable<ActualizacionProyecto> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.GUARDAR_ACTUALIZACION_INVESTIGADOR}`;
    return this.http.post<ActualizacionProyecto>(url, actualizacionProyecto,
      {
        params: {
          enviadoACentro: enviadoACentro
        }
      });
  }

}
