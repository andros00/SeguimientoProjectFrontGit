import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AportanteProyecto } from '../../components/molecules/show-project/aportante-proyecto';
import { DireccionesUrl } from '../../components/molecules/show-project/direcciones-url';
import { RubroConvocatoria } from '../../components/molecules/show-project/rubro-convocatoria';

@Injectable({
  providedIn: 'root'
})
export class AportanteProyectoService {

  constructor(private http: HttpClient) { }

  guardarAportanteProyecto(listaAportanteProyecto: AportanteProyecto[], enviadoACentro = 'false'): Observable<AportanteProyecto[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.REGISTRAR_APORTANTE_PROYECTO}`;
    return this.http.post<AportanteProyecto[]>(url, listaAportanteProyecto,
      {params: {
        enviadoACentro: enviadoACentro
    }});
  }

  consultarListaAportanteProyecto(codigoProyecto: string): Observable<AportanteProyecto[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.CONSULTA_APORTANTE_PROYECTO}${codigoProyecto}`;
    return this.http.get<AportanteProyecto[]>(url);
  }

  eliminarAportante(idAportante: number): Observable<void> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.ELIMINAR_APORTANTE_PROYECTO}${idAportante}`;
    return this.http.delete<void>(url);
  }

  editarAportante(datos: AportanteProyecto): Observable<void> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.ACTUALIZAR_APORTANTE_PROYECTO}`;
    return this.http.put<void>(url, datos);
  }

  consultarRubrosConvocatoria(identificadorConvocatoria: number): Observable<RubroConvocatoria[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.OBTENER_RUBROS_FINANCIABLES}${identificadorConvocatoria}`;
    return this.http.get<RubroConvocatoria[]>(url);
  }

  consultarRubrosHabilitados(): Observable<RubroConvocatoria[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.OBTENER_RUBROS_FINANCIABLES_HABILITADOS}`;
    return this.http.get<RubroConvocatoria[]>(url);
  }
}
