import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PorcentajeMaximoRubros } from '../../components/molecules/show-project/porcentaje-maximo-rubros';
import { DireccionesUrl } from '../../components/molecules/show-project/direcciones-url';
import { RubroProyecto } from '../../components/molecules/show-project/rubro-proyecto';
import { TablaPresupuestal } from '../../components/molecules/show-project/tabla-presupuestal';

@Injectable({
  providedIn: 'root'
})
export class PresupuestalProyectoService {

  constructor(private http: HttpClient) { }

  guardarPresupuestal(rubrosProyecto: RubroProyecto[]): Observable<RubroProyecto[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.PORCENTAJE_MAXIMO_RUBROS}`;
    return this.http.post<RubroProyecto[]>(url, rubrosProyecto);
  }

  consultarTiposDeMoneda(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.TIPO_MONEDA}`);
  }

  consultarPorcentajesMaximos(convocatoria: number): Observable<PorcentajeMaximoRubros[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.PORCENTAJE_MAXIMO_RUBROS}${convocatoria}`;
    return this.http.get<PorcentajeMaximoRubros[]>(url);
  }

  guardarTablaPresupuestal(tablaPresupuestal: TablaPresupuestal, enviadoACentro = 'false'): Observable<TablaPresupuestal> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.GUARDAR_TABLA_PRESUPUESTAL}`;
    return this.http.post<TablaPresupuestal>(url, tablaPresupuestal,
      {
        params: {
          enviadoACentro: enviadoACentro
        }
      });
  }

  eliminarRubroProyecto(identificador: number): Observable<void> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.ELIMINAR_RUBRO_PROYECTO}${identificador}`;
    return this.http.delete<void>(url);
  }

  obtenerPresupuestoPorProyecto(codigoProyecto: string): Observable<TablaPresupuestal> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.CONSULTA_PRESUPUESTO_POR_PROYECTO}${codigoProyecto}`;
    return this.http.get<TablaPresupuestal>(url);
  }

  precargarPresupuesto(idAportante: number, idRubro: number): Observable<number> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.PRECARGAR_RUBRO_POR_APORTANTE}${idAportante}/${idRubro}`;
    return this.http.post<number>(url, {});
  }

}
