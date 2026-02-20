import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProcesoSeleccionIngreso } from '../../components/molecules/show-project/proceso-seleccion-ingreso';
import { CategoriaCondicionFormal } from '../../components/molecules/show-project/categoria-condicion-formal';
import { TipoProyecto } from '../../components/molecules/show-project/tipo-proyecto';
import { NivelProyecto } from '../../components/molecules/show-project/nivel-proyecto';
import { DireccionesUrl } from '../../components/molecules/show-project/direcciones-url';

@Injectable({
  providedIn: 'root'
})
export class ProcesoSeleccionService {

  message = 'Error extrayendo la información';
  constructor(private http: HttpClient) { }

  obtenerListaTiposProyecto(): Observable<TipoProyecto[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_COMPARTIDO.LISTA_TIPO_PROYECTO}`;
    return this.http.get<TipoProyecto[]>(url);
  }

  obtenerListaNivelProyecto(): Observable<NivelProyecto[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_COMPARTIDO.LISTA_NIVEL_PROYECTO}`;
    return this.http.get<NivelProyecto[]>(url);
  }

  guardarProcesoSeleccion(procesoSeleccion: any): Observable<any> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECIONES_ADMINISTRADOR.REGISTRAR_PROCESO}`;
    return this.http.post(url, procesoSeleccion);
  }

  obtenerListaProcesoSeleccionCondicion(): Observable<ProcesoSeleccionIngreso[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECIONES_ADMINISTRADOR.LISTA_PROCESO_SELECCION_CONDICION}`;
    return this.http.get<ProcesoSeleccionIngreso[]>(url);
  }

  obtenerProcesoSeleccionPorId(idProcesoSeleccion: number): Observable<ProcesoSeleccionIngreso> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECIONES_ADMINISTRADOR.CONSULTA_PROCESO_SELECCION_ID}${idProcesoSeleccion}`;
    return this.http.get<ProcesoSeleccionIngreso>(url, {});
  }

  obtenerListaCategoriaCondicionFormal(): Observable<CategoriaCondicionFormal[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECIONES_ADMINISTRADOR.CATEGORIA_CONDICION_FORMAL}`;
    return this.http.get<CategoriaCondicionFormal[]>(url);
  }

  eliminarEtapa(identificador: number): Observable<void> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECIONES_ADMINISTRADOR.ELIMINAR_ETAPA_PROCESO_SELECCION}${identificador}`;
    return this.http.delete<void>(url);
  }

  eliminarCondicion(identificador: number): Observable<void> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECIONES_ADMINISTRADOR.ELIMINAR_CONDICION_PROCESO_SELECCION}${identificador}`;
    return this.http.delete<void>(url);
  }

  eliminarCondicionesProceso(identificador: number): void {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECIONES_ADMINISTRADOR.ELIMINAR_CONDICIONES_PROCESO_SELECCION}${identificador}`;
    this.http.delete<void>(url).subscribe();
  }
}
