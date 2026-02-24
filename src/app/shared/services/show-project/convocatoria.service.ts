import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DependenciaFinanciadora } from '../../components/molecules/show-project/dependencia-financiadora';
import { DireccionesUrl } from '../../components/molecules/show-project/direcciones-url';
import { ProgramaFinanciador } from '../../components/molecules/show-project/programa-financiador';
import { InformacionGeneralConvocatoria } from '../../components/molecules/show-project/informacion-general-convocatoria';
import { ModalidadConvocatoria } from '../../components/molecules/show-project/modalidad-convocatoria';
import { FechaEtapaProcesoSeleccion } from '../../components/molecules/show-project/fecha-etapa-proceso-seleccion';
import { CondicionFormalConvocatoria } from '../../components/molecules/show-project/condicion-formal-convocatoria';
import { CronogramaConvocatoria } from '../../components/molecules/show-project/cronograma';
import { Compromiso } from '../../components/molecules/show-project/compromiso';
import { EstructuraProyecto } from '../../components/molecules/show-project/estructura-proyecto';
import { RubroFinanciable } from '../../components/molecules/show-project/rubro-financiable';
import { DocumentoConvocatoria } from '../../components/molecules/show-project/documento-convocatoria';
import { RubroPreautorizado } from '../../components/molecules/show-project/rubro-preautorizado';
import { RubroConvocatoria } from '../../components/molecules/show-project/rubro-convocatoria';
import { PorcentajeMaximoRubros } from '../../components/molecules/show-project/porcentaje-maximo-rubros';
import { Convocatoria } from '../../components/molecules/show-project/convocatoria';
import { TipoPorcentajeMaximo } from '../../components/molecules/show-project/tipo-porcentaje-maximo';

@Injectable({
  providedIn: 'root'
})
export class ConvocatoriaService {

  constructor(private http: HttpClient) { }

  obtenerDependenciasFinanciadoras(): Observable<DependenciaFinanciadora[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_CONVOCATORIA.LISTA_DEPENDENCIA_FINANCIADORA}`;
    return this.http.get<DependenciaFinanciadora[]>(url);
  }

  obtenerProgramasPorFinanciador(personaJuridica: string): Observable<ProgramaFinanciador[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_CONVOCATORIA.LISTA_PROGRAMA_FINANCIADOR}${personaJuridica}`;
    return this.http.get<ProgramaFinanciador[]>
      (url, {});
  }

  guardarPrograma(programaFinanciador: any): Observable<ProgramaFinanciador> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_CONVOCATORIA.REGISTRAR_PROGRAMA}`;
    return this.http.post<ProgramaFinanciador>
      (url, programaFinanciador);
  }

  guardarInformacionGeneralConvocatoria(informacionGeneral: InformacionGeneralConvocatoria): Observable<any> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_CONVOCATORIA.REGISTRAR_INFORMACION_GENERAL}`;
    return this.http.post(url, informacionGeneral);
  }

  guardarModalidadesFinanciacion(listaModalidades: ModalidadConvocatoria[]): Observable<ModalidadConvocatoria[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_CONVOCATORIA.AGREGAR_MODALIDAD}`;
    return this.http.post<ModalidadConvocatoria[]>
      (url, listaModalidades);
  }

  obtenerListaFechaEtapasProcesoSeleccion(idProcesoSeleccion: number): Observable<FechaEtapaProcesoSeleccion[]> {
    const url =
      `${environment.URL_BASE}${DireccionesUrl.DIRECIONES_ADMINISTRADOR.CONSULTAR_FECHA_ETAPA_PROCESO_SELECCION}${idProcesoSeleccion}`;
    return this.http.get<FechaEtapaProcesoSeleccion[]>(url);
  }

  guardarCondicionesFormalesConvocatoria(condicionesFormalesConvocatoria: CondicionFormalConvocatoria[]): Observable<any> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_CONVOCATORIA.REGISTRAR_CONDICIONES_CONVOCATORIA}`;
    return this.http.post<CondicionFormalConvocatoria[]>(url, condicionesFormalesConvocatoria);
  }
  guardarCronograma(cronograma: CronogramaConvocatoria): Observable<CronogramaConvocatoria> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_CONVOCATORIA.REGISTRAR_CRONOGRAMA}`;
    return this.http.post<CronogramaConvocatoria>(url, cronograma);
  }

  eliminarModalidadConvocatoria(identificador: number): Observable<void> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_CONVOCATORIA.ELIMINAR_MODALIDAD}${identificador}`;
    return this.http.delete<void>(url);
  }

  eliminarFechaIntermedia(identificador: number): Observable<void> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_CONVOCATORIA.ELIMINAR_CRONOGRAMA}${identificador}`;
    return this.http.delete<void>(url);
  }

  eliminarCompromiso(idCompromiso: number): Observable<void> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_CONVOCATORIA.ELIMINAR_COMPROMISO}${idCompromiso}`;
    return this.http.delete<void>(url);
  }

  guardarCompromisos(compromisos: Compromiso[]): Observable<any> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_CONVOCATORIA.AGREGAR_COMPROMISOS}`;
    return this.http.post(url, compromisos);
  }

  guardarEstructuraProyecto(estructuraProyecto: EstructuraProyecto): Observable<EstructuraProyecto> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_CONVOCATORIA.AGREGAR_ESTRUCTURA_PROYECTO}`;
    return this.http.post<EstructuraProyecto>(url, estructuraProyecto);
  }

  eliminarTextoSolicitadoDeEstructuraProyecto(identificador: number): Observable<void> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_CONVOCATORIA.ELIMINAR_TEXTO_SOLICITADO_ESTRUCTURA_PROYECTO}${identificador}`;
    return this.http.delete<void>(url);
  }

  obtenerRubrosFinanciablesHabilitados(): Observable<RubroFinanciable[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_CONVOCATORIA.OBTENER_RUBROS_FINANCIABLES_HABILITADOS}`;
    return this.http.get<RubroFinanciable[]>(url);
  }

  guardarDocumentoSoporte(documentos: DocumentoConvocatoria[]): Observable<any> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_CONVOCATORIA.AGREGAR_DOCUMENTOS_CONVOCATORIA}`;
    return this.http.post(url, documentos);
  }

  guardarRubroPreautorizado(rubrosPreautorizados: RubroPreautorizado[]): Observable<any> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_CONVOCATORIA.AGREGAR_RUBRO_PREAUTORIZADO}`;
    return this.http.post(url, rubrosPreautorizados);
  }

  eliminarRubroPreautorizado(idPreautorizados: number): Observable<void> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_CONVOCATORIA.ELIMINAR_RUBRO_PREAUTORIZADO}${idPreautorizados}`;
    return this.http.delete<void>(url);
  }

  guardarRubroConvocatoria(rubrosConvocatoria: RubroConvocatoria[]): Observable<RubroConvocatoria[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_CONVOCATORIA.AGREGAR_RUBRO_CONVOCATORIA}`;
    return this.http.post<RubroConvocatoria[]>(url, rubrosConvocatoria);
  }

  eliminarRubroConvocatoria(idRubroConvocatoria: number): Observable<void> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_CONVOCATORIA.ELIMINAR_RUBRO_CONVOCATORIA}${idRubroConvocatoria}`;
    return this.http.delete<void>(url);
  }

  eliminarDocumentoSoporte(documentoConvocatoria: DocumentoConvocatoria): Observable<any> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_CONVOCATORIA.ELIMINAR_DOCUMENTO_SOPORTE}`;
    return this.http.post(url, documentoConvocatoria);
  }

  guardarPorcentajeMaximoRubros(porcentajeMaximoRubros: PorcentajeMaximoRubros[]): Observable<PorcentajeMaximoRubros[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_CONVOCATORIA.PORCENTAJE_MAXIMO_RUBROS}`;
    return this.http.post<PorcentajeMaximoRubros[]>(url, porcentajeMaximoRubros);
  }

  eliminarPorcentajeMaximoRubro(idPorcentajeMaximoRubro: number): Observable<void> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_CONVOCATORIA.ELIMINAR_PORCENTAJE_MAXIMO_RUBRO}${idPorcentajeMaximoRubro}`;
    return this.http.delete<void>(url);
  }

  publicarConvocatoria(convocatoria: Convocatoria): Observable<InformacionGeneralConvocatoria> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_CONVOCATORIA.PUBLICAR_CONVOCATORIA}`;
    return this.http.post<InformacionGeneralConvocatoria>(url, convocatoria);
  }

  obtenerConvocatoriaPorId(idConvocatoria: number): Observable<Convocatoria> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_CONVOCATORIA.CONSULTAR_CONVOCATORIA_POR_ID}${idConvocatoria}`;
    return this.http.get<Convocatoria>(url);
  }

  obtenerTipoPorcentajeMaximo(): Observable<TipoPorcentajeMaximo[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_CONVOCATORIA.LISTA_TIPO_PORCENTAJE}`;
    return this.http.get<TipoPorcentajeMaximo[]>(url);
  }

  obtenerProyectosAsociados(identificador: number): Observable<number> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_CONVOCATORIA.OBTENER_PROYECTOS_ASOCIADOS}${identificador}`;
    return this.http.get<number>(url);
  }

  eliminarConvocatoria(identificador: number): Observable<void> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_CONVOCATORIA.ELIMINAR_CONVOCATORIA}${identificador}`;
    return this.http.delete<void>(url);
  }
}
