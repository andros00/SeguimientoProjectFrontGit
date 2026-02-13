import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InstitucionDTO } from 'src/app/core/interfaces/InstitucionDTO';
import { InstitucionRequest } from 'src/app/core/request/isntitucionResquest';
import { ENDPOINTS } from 'src/app/utils/url/endpoints-url';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstitucionService {

  private readonly url = `${environment.route}`;
  constructor(private http: HttpClient) { }



    buscarInstitucion(instituto: InstitucionRequest): Observable<InstitucionDTO[]> {
      return this.http.post<InstitucionDTO[]>(`${this.url}/${ENDPOINTS.V1.PARTICIPANT_URL.INSTITUCION}`, instituto);
    }
}
