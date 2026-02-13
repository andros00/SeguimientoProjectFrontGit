import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GenericResponse } from 'src/app/core/interfaces/genericResponseDTO';
import { IProjectIFormalDTO } from 'src/app/core/interfaces/IProjectIFormalDTO';
import { ENDPOINTS } from 'src/app/utils/url/endpoints-url';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectIformalService {

private readonly url = `${environment.route}`;


  constructor(private http: HttpClient) { }

  getProjectIFormalByProjectCode(codigoProyecto: string): Observable<IProjectIFormalDTO> {
    const params = new HttpParams().set('codigoProyecto', codigoProyecto);
    return this.http.get<IProjectIFormalDTO>(this.url + `${ENDPOINTS.V1.IFORMAL_URL.PROJECT_IFORMAL_BY_CODE}`, { params });

  }

  guardarInicioFormal(proyectoIFormal: IProjectIFormalDTO): Observable<IProjectIFormalDTO[]> {
      return this.http
        .put<GenericResponse<IProjectIFormalDTO[]>>(`${this.url}${ENDPOINTS.V1.IFORMAL_URL.PROJECT_IFORMAL_UPDATE}`, proyectoIFormal)
        .pipe(
          map((res) => {
            return res.data || [];
          })
        );
    }

}
