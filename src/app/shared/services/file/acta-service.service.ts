import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENDPOINTS } from 'src/app/utils/url/endpoints-url';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActaServiceService {

  private readonly url = `${environment.route}`;

  constructor(private http: HttpClient) { }

  generarActa(projectCode: string): Observable<Blob> {
    const params = new HttpParams().set('codigoProyecto', projectCode);
    return this.http.get(`${this.url}${ENDPOINTS.V1.ACTA_URL.GENERAR}`, {
      params,
      responseType: 'blob'
    });
  }
}
