import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NivelAdministrativo } from '../../components/molecules/show-project/nivel-administrativo';
import { InstanciaAdministrativa } from '../../components/molecules/show-project/instancia-administrativa';
import { DireccionesUrl } from '../../components/molecules/show-project/direcciones-url';

@Injectable({
  providedIn: 'root'
})
export class CentroAdministrativoService {

  constructor(private http: HttpClient) { }

  obtenerListaNivelAdministrativo(): Observable<NivelAdministrativo[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECIONES_ADMINISTRADOR.LISTA_NIVEL_ADMINISTRATIVO}`;
    return this.http.get<NivelAdministrativo[]>(url);
  }

  obtenerListaInstanciaAdministrativaPorNivel(identificadorNivelAdministrativo: string): Observable<InstanciaAdministrativa[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECIONES_ADMINISTRADOR.LISTA_INSTANCIA_ADMINISTRATIVA}`;
    return this.http.post<InstanciaAdministrativa[]>(url,
      { 'identificadorNivelAdministrativo': identificadorNivelAdministrativo });
  }

  obtenerListaCentrosAdministrativos(): Observable<NivelAdministrativo[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_COMPARTIDO.CONSULTAR_CENTROS_ADMINISTRATIVOS}`;
    return this.http.get<NivelAdministrativo[]>(url);
  }

  obtenerListaComiteBioetica(): Observable<InstanciaAdministrativa[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_COMPARTIDO.CONSULTAR_COMITE_BIOETICA}`;
    return this.http.get<InstanciaAdministrativa[]>(url);
  }

  obtenerListaCentrosAdministrativosJIUdeA(idTipoProyecto: number, idProceso: number): Observable<NivelAdministrativo[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_COMPARTIDO.CONSULTAR_CENTROS_ADMINISTRATIVOS_JIUDEA}${idTipoProyecto}${'/'}${idProceso}`;
    return this.http.get<NivelAdministrativo[]>(url);
  }

  obtenerInstanciaAdministrativa(idInstanciaAdministrativa: number): Observable<InstanciaAdministrativa> {
    const url =
      `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_COMPARTIDO.CONSULTAR_INSTANCIA_ADMINISTRATIVA}${idInstanciaAdministrativa}`;
    return this.http.get<InstanciaAdministrativa>(url);
  }

  obtenerInstanciasPermisos(tipoOperacion: string): Observable<InstanciaAdministrativa[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_COMPARTIDO.CONSULTA_INSTANCIAS_PERMISOS}/${tipoOperacion}`;
    return this.http.get<InstanciaAdministrativa[]>(url);
  }

  obtenerInstanciasAdminsitrativas(): Observable<InstanciaAdministrativa[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_COMPARTIDO.CONSULTAR_CENTROS_ADMINISTRATIVOS}`;
    return this.http.get<InstanciaAdministrativa[]>(url);
  }
}
