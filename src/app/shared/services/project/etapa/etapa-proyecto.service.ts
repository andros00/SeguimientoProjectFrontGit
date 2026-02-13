import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EtapaProyectoDTO } from 'src/app/core/interfaces/EtapaProyectoDTO';
import { environment } from 'src/environments/environment';
import { ENDPOINTS } from 'src/app/utils/url/endpoints-url';

@Injectable({
  providedIn: 'root'
})
export class EtapaProyectoService {

  constructor(private http: HttpClient) { }
    private readonly url = `${environment.route}/${ENDPOINTS.V1.PROJECT_URL.ETAPA}`;
    obtenerEtapaPorProyecto(projectCode: string): Observable<EtapaProyectoDTO[]> {
      const params = new HttpParams().set('codigoProyecto', projectCode);
      return this.http.get<EtapaProyectoDTO[]>(`${this.url}`, { params });
    }

}
