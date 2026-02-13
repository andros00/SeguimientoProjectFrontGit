import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { DireccionesUrl } from '../../components/molecules/show-project/direcciones-url';
import { TipoProyecto } from '../../components/molecules/show-project/tipo-proyecto';
import { Seccional } from '../../components/molecules/show-project/seccional';
import { ClaseSubproyecto } from '../../components/molecules/show-project/clase-subproyecto';
import { GrupoInvestigacion } from '../../components/molecules/show-project/grupo-investigacion';
import { SubnivelProyecto } from '../../components/molecules/show-project/subnivel-proyecto';
import { NivelProyecto } from '../../components/molecules/show-project/nivel-proyecto';
import { SubtipoProyecto } from '../../components/molecules/show-project/subtipo-proyecto';
import { Programa } from '../../components/molecules/show-project/programa';
import { Dependencia } from '../../components/molecules/show-project/dependencia';

@Injectable({
  providedIn: 'root'
})
export class InformacionGeneralCompartidoService {

  constructor(private http: HttpClient) { }

  obtenerListaTiposProyecto(): Observable<TipoProyecto[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_COMPARTIDO.LISTA_TIPO_PROYECTO}`;
    return this.http.get<TipoProyecto[]>(url);
  }

  obtenerListaClaseSubproyecto(): Observable<ClaseSubproyecto[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_COMPARTIDO.CLASE_SUBPROYECTO}`;
    return this.http.get<ClaseSubproyecto[]>(url);
  }

  obtenerListaNivelProyecto(): Observable<NivelProyecto[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_COMPARTIDO.LISTA_NIVEL_PROYECTO}`;
    return this.http.get<NivelProyecto[]>(url);
  }

  obtenerListaSubnivelProyecto(): Observable<SubnivelProyecto[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_COMPARTIDO.LISTA_SUBINVEL_PROYECTO}`;
    return this.http.get<SubnivelProyecto[]>(url);
  }

  consultarListaSubtipoProyectoPorTipoProyecto(idTipoProyecto: number): Observable<SubtipoProyecto[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_COMPARTIDO.CONSULTAR_SUBTIPO_PROYECTO}${idTipoProyecto}`;
    return this.http.get<SubtipoProyecto[]>(url);
  }

  obtenerListaGrupoInvestigacion(): Observable<GrupoInvestigacion[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_COMPARTIDO.LISTA_GRUPO_INVESTIGACION}`;
    return this.http.get<GrupoInvestigacion[]>(url);
  }

  obtenerListaGrupoInvestigacionPorUsuario(usuario: string): Observable<GrupoInvestigacion[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_COMPARTIDO.LISTA_GRUPO_INVESTIGACION_POR_USUARIO}${usuario}`;
    return this.http.get<GrupoInvestigacion[]>(url);
  }

  obtenerListaGrupoInvestigacionPorPalabraClave(palabraClave: string): Observable<GrupoInvestigacion[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_COMPARTIDO.LISTA_GRUPO_INVESTIGACION}/${palabraClave}`;
    return this.http.get<GrupoInvestigacion[]>(url);
  }

  obtenerListaSeccionalUdea(): Observable<Seccional[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_COMPARTIDO.CONSULTAR_SECCIONAL_UDEA}`;
    return this.http.get<Seccional[]>(url);
  }

  obtenerListaDependencias(): Observable<Dependencia[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.LISTA_DEPENDENCIAS}`;
    return this.http.get<Dependencia[]>(url);
  }

  obtenerListaDependenciasWeb(identificacion: string): Observable<Dependencia[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.LISTA_DEPENDENCIAS_WEB}${identificacion}`;
    return this.http.get<Dependencia[]>(url);
  }

  obtenerListaProgramasPorDependencia(programa: number, tipoProgramaApoyado: string): Observable<Programa[]> {
    const url =
      `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.PROGRAMAS_DEPENDENCIA}${programa}/${tipoProgramaApoyado}`;
    return this.http.get<Programa[]>(url);
  }

  obtenerProgramasPorEstudiante(identificacion: string, tipoProgramaApoyado: string) {
    const url =
      `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.PROGRAMAS_ESTUDIANTE_DEPENDENCIA}${identificacion}/${tipoProgramaApoyado}`;
    return this.http.get<Programa[]>(url);
  }
}
