import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ENDPOINTS } from 'src/app/utils/url/endpoints-url';
import { IProject } from 'src/app/core/interfaces/IProject';
import { GenericResponse } from 'src/app/core/interfaces/genericResponseDTO';
import { ProyectoDetalleDTO } from 'src/app/core/interfaces/ProyectoDetalleDTO';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private readonly url = `${environment.route}/${ENDPOINTS.V1.PROJECT_URL.FILTER}`;

  constructor(private http: HttpClient) { }

  consultarProyectos(proyecto: IProject): Observable<IProject[]> {
    return this.http
      .post<GenericResponse<IProject[]>>(`${this.url}`, proyecto)
      .pipe(
        map((res) => {
          return res.data || [];
        })
      );
  }

  getDetalleByProjectCode(projectCode: string): Observable<ProyectoDetalleDTO> {
    const params = new HttpParams().set('codigoProyecto', projectCode);
    return this.http.get<ProyectoDetalleDTO>(`${environment.route}/${ENDPOINTS.V1.PROJECT_URL.DETALLE}`, { params });
  }








}
