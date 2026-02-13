import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EvaluadorEvaluacionCientifica } from '../../components/molecules/show-project/evaluador-evaluacion-cientifica';
import { Evaluador } from '../../components/molecules/show-project/evaluador-proyecto';
import { DireccionesUrl } from '../../components/molecules/show-project/direcciones-url';
import { PersonaNatural } from '../../components/molecules/show-project/persona-natural';
import { EvaluadorRecomendado } from '../../components/molecules/show-project/evaluador-recomendado';
import { FiltroEvaluador } from '../../components/molecules/show-project/filtro-evaluador';

@Injectable({
  providedIn: 'root'
})
export class EvaluadorService {

  constructor(private http: HttpClient) { }

  obtenerEvaluadores(filtroEvaluador: FiltroEvaluador): Observable<any> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_COMPARTIDO.CONSULTA_EVALUADORES}`;
    return this.http.post<PersonaNatural>(url, filtroEvaluador);
  }

  agregarEvaluador(evaluador: Evaluador): Observable<any> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_COMPARTIDO.AGREGAR_EVALUADOR}`;
    return this.http.post<Evaluador>(url, evaluador);
  }

  actualizarEvaluadorRecomendado(evaluadorRecomendado: EvaluadorRecomendado): Observable<any> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_COMPARTIDO.ACTUALIZAR_EVALUADOR_RECOMENDADO}`;
    return this.http.post<EvaluadorRecomendado>(url, evaluadorRecomendado);
  }

  guardarEvaluadorRecomendado(evaluadoresRecomendados: EvaluadorRecomendado[], enviadoACentro = 'false'): Observable<any> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_COMPARTIDO.AGREGAR_EVALUADOR_RECOMENDADO}`;
    return this.http.post(url, evaluadoresRecomendados,
      {
        params: {
          enviadoACentro: enviadoACentro
        }
      });
  }

  eliminarEvaluadorRecomendado(identificador: number): Observable<void> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_COMPARTIDO.ELIMINAR_EVALUADOR_RECOMENDADO}${identificador}`;
    return this.http.delete<void>(url);
  }

  guardarAsignacionEvaluadoreRecomendados(evaluadoresRecomendados: EvaluadorEvaluacionCientifica[]):
    Observable<EvaluadorEvaluacionCientifica[]> {

    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_COMPARTIDO.GUARDAR_ASIGNACION_EVALUADOR_RECOMENDADO}`;
    return this.http.post<EvaluadorEvaluacionCientifica[]>(url, evaluadoresRecomendados);
  }

  eliminarEvaluador(identificador: number): Observable<void> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_COMPARTIDO.ELIMINAR_EVALUADOR}${identificador}`;
    return this.http.delete<void>(url);
  }

  esEvaluadorEditable(identificador: number) {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_COMPARTIDO.ES_EVALUADOR_EDITABLE}${identificador}`;
    return this.http.get<boolean>(url);
  }

  envioCorreoConManual(evaluadoresRecomendado: EvaluadorEvaluacionCientifica):
    Observable<EvaluadorEvaluacionCientifica> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_COMPARTIDO.ENVIO_CORREO_CON_MANUAL_EVALUADOR}`;
    return this.http.post<EvaluadorEvaluacionCientifica>(url, evaluadoresRecomendado);
  }
}
