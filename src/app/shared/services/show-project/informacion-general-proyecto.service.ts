import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InformacionGeneralConvocatoria } from '../../components/molecules/show-project/informacion-general-convocatoria';
import { ModalidadConvocatoria } from '../../components/molecules/show-project/modalidad-convocatoria';
import { DireccionesUrl } from '../../components/molecules/show-project/direcciones-url';
import { TipoProyecto } from '../../components/molecules/show-project/tipo-proyecto';
import { EstructuraProyecto } from '../../components/molecules/show-project/estructura-proyecto';
import { NivelAdministrativo } from '../../components/molecules/show-project/nivel-administrativo';
import { ComponenteMacroproyecto } from '../../components/molecules/show-project/componente-macroproyecto';
import { InformacionGeneralProyecto } from '../../components/molecules/show-project/informacion-general-proyecto';
import { InformacionGeneral } from '../../components/molecules/show-project/informacion-general';
import { Proyecto } from '../../components/molecules/show-project/proyecto';
import { EnviarACentro } from '../../components/molecules/show-project/enviar-a-centro';

@Injectable({
  providedIn: 'root'
})
export class InformacionGeneralProyectoService {

  constructor(private http: HttpClient) { }

  consultarProyectosTipoMacroproyecto() {
    return this.http.get<InformacionGeneralProyecto[]>(`${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.MACROPROYECTO}`);
  }

  consultarComponentePorMacroproyecto(idMacroproyecto: string) {
    return this.http.get<ComponenteMacroproyecto[]>
      (`${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.COMPONENTES_MACROPROYECTO}${idMacroproyecto}`);
  }

  consultarProcesosSeleccion(nivelProyecto: number, tipoProyecto: number, claseProyecto: number, lectura: boolean):
    Observable<InformacionGeneral[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.CONSULTA_PROCESOS}`
      + `${nivelProyecto}${'/'}${tipoProyecto}${'/'}${claseProyecto}${'/'}${lectura}`;
    return this.http.get<InformacionGeneral[]>(url);
  }

  consultarConvocatoria(nivelProyecto: number, tipoProyecto: number, claseProyecto: number, lectura: boolean):
    Observable<InformacionGeneralConvocatoria[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.CONSULTA_CONVOCATORIAS}`
      + `${nivelProyecto}${'/'}${tipoProyecto}${'/'}${claseProyecto}${'/'}${lectura}`;
    return this.http.get<InformacionGeneralConvocatoria[]>(url);
  }

  consultarModalidadesPorConvocatoria(idConvocatoria: number): Observable<ModalidadConvocatoria[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.CONSULTA_MODALIDADES_POR_CONVOCATORIA}${idConvocatoria}`;
    return this.http.get<ModalidadConvocatoria[]>(url);
  }

  obtenerListaProyectosAsociadosJI(grupo: number): Observable<InformacionGeneralProyecto[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.CONSULTA_PROYECTOS_ASOCIADOS_JI}`
      + `${grupo}`;
    return this.http.get<InformacionGeneralProyecto[]>(url);
  }

  guardarInformacionGeneralProyecto(proyecto: Proyecto): Observable<EstructuraProyecto> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.REGISTRAR_INFORMACION_GENERAL}`;
    return this.http.post<EstructuraProyecto>(url, proyecto);
  }

  vigenciaProcesoSeleccionConvocatoria(identificadorProcesoSeleccion: number, identificadorConvocatoria: number) {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.VIGENCIA_PROCESO_SELECCION_CONVOCATORIA}`
      + `${identificadorProcesoSeleccion}${'/'}${identificadorConvocatoria}`;
    return this.http.get<boolean>(url);
  }

  enviarProyectoACentro(enviarACentro: EnviarACentro, actualizacionProyecto: string) {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.ENVIAR_A_CENTRO}`;
    return this.http.post<EnviarACentro>(url, enviarACentro,
      {
        params: {
          actualizacionProyecto: actualizacionProyecto
        }
      });
  }

  obtenerInformacionGeneral(codigo: string): Observable<InformacionGeneralProyecto> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.CONSULTAR_INFORMACION_GENERAL}${codigo}`;
    return this.http.get<InformacionGeneralProyecto>(url);
  }

  esProyectoEditable(codigoProyecto: string) {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.ES_PROYECTO_EDITABLE}`
      + `${codigoProyecto}`;
    return this.http.get<boolean>(url);
  }

  obtenerProyectoPorCodigo(codigoProyecto: string): Observable<EstructuraProyecto> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.OBTENER_PROYECTO_POR_CODIGO}`
      + `${codigoProyecto}`;
    return this.http.get<EstructuraProyecto>(url);
  }

  obtenerTiposProyectoConPermiso(lectura: boolean): Observable<TipoProyecto[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.CONSULTA_TIPOS_PROYECTO}${lectura}`;
    return this.http.get<TipoProyecto[]>(url);
  }

  obtenerCentrosAdministrativosConPermisos(lectura: boolean): Observable<NivelAdministrativo[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.CONSULTAR_CENTROS_ADMINISTRATIVOS}${lectura}`;
    return this.http.get<NivelAdministrativo[]>(url);
  }

}
