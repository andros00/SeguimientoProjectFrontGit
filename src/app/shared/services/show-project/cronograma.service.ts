import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActividadProyecto } from '../../components/molecules/show-project/actividad-proyecto';
import { DireccionesUrl } from '../../components/molecules/show-project/direcciones-url';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CronogramaService {

  constructor(private http: HttpClient) { }

  eliminarActividadProyecto(identificador: number): Observable<void> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.ELIMINAR_ACTIVIDAD_PROYECTO}${identificador}`;
    return this.http.delete<void>(url);
  }

  guardarActividades(actividades: ActividadProyecto[], enviadoACentro = 'false'): Observable<any> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.AGREGAR_ACTIVIDADES}`;
    return this.http.post(url, actividades,
      {params: {
        enviadoACentro: enviadoACentro
    }});
  }

}
