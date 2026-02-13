import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActividadProyectoDTO } from 'src/app/core/interfaces/AnctividadProyectoDTO';
import { ENDPOINTS } from 'src/app/utils/url/endpoints-url';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActividadProyectoService {

  constructor(private http: HttpClient) { }
  private readonly url = `${environment.route}/${ENDPOINTS.V1.PROJECT_URL.ACTIVIDAD}`;
  obtenerActividadPorProyecto(projectCode: string): Observable<ActividadProyectoDTO[]> {
    const params = new HttpParams().set('codigoProyecto', projectCode);
    return this.http.get<ActividadProyectoDTO[]>(`${this.url}/actividades-proyecto`, { params });
  }

}
