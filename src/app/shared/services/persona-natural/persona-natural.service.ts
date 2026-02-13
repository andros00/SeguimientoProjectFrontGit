import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ENDPOINTS } from 'src/app/utils/url/endpoints-url';
import { PersonaNaturalDTO } from 'src/app/core/interfaces/PersonaNaturalDTO';

@Injectable({
  providedIn: 'root'
})
export class PersonaNaturalService {


  private readonly url = `${environment.route}`;

  constructor(private http: HttpClient) { }

  getPersonaNatural(identificacion: string): Observable<PersonaNaturalDTO> {
    const params = new HttpParams().set('identificacion', identificacion);
    return this.http.get<PersonaNaturalDTO>(`${this.url}/${ENDPOINTS.V1.PERSONA_NATURAL.PERSONA}`, { params });
  }
}
