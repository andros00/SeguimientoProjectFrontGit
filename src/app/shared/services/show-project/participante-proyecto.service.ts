import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DireccionesUrl } from '../../components/molecules/show-project/direcciones-url';
import { ParticipanteProyecto } from '../../components/molecules/show-project/participante-proyecto';
import { Vinculo } from '../../components/molecules/show-project/vinculo';
import { ParametrosBusquedaRoles } from '../../components/molecules/show-project/parametros-busqueda-roles';
import { RolParticipanteProyecto } from '../../components/molecules/show-project/rol-participante-proyecto';

@Injectable({
  providedIn: 'root'
})
export class ParticipanteProyectoService {

  constructor(private http: HttpClient) { }

  consultarVinculos(idParticipante: string): Observable<Vinculo[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.CONSULTA_VINCULOS}${idParticipante}`;
    return this.http.get<Vinculo[]>(url);
  }

  consultarRoles(parametrosBusquedaRoles: ParametrosBusquedaRoles): Observable<RolParticipanteProyecto[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.CONSULTAR_ROLES}`;
    return this.http.post<RolParticipanteProyecto[]>(url, parametrosBusquedaRoles);
  }

  consultarVinculosParaValidacion(): Observable<string[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.CONSULTA_VINCULOS_PARA_VALIDACION}`;
    return this.http.get<string[]>(url);
  }

  consultaVinculoEstudiante(cedula: string): Observable<boolean> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.CONSULTA_VINCULO_ESTUDIANTE}${cedula}`;
    return this.http.get<boolean>(url);
  }

  guardarParticipanteProyecto(participantes: ParticipanteProyecto[], enviadoACentro = 'false'): Observable<any> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.AGREGAR_PARTICIPANTE_PROYECTO}`;
    return this.http.post(url, participantes,
      {params: {
        enviadoACentro: enviadoACentro
    }});
  }

  eliminarParticipanteProyecto(identificador: number): Observable<void> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.ELIMINAR_PARTICIPANTE}${identificador}`;
    return this.http.delete<void>(url);
  }

  obtenerParticipantesPorProyecto(codigoProyecto: string): Observable<ParticipanteProyecto[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.CONSULTA_PARTICIPANTES_POR_PROYECTO}${codigoProyecto}`;
    return this.http.get<ParticipanteProyecto[]>(url);
  }
}
