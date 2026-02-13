import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { VinculoParticipanteDTO } from 'src/app/core/interfaces/VinculoParticipanteDTO';
import { ENDPOINTS } from 'src/app/utils/url/endpoints-url';

@Injectable({
  providedIn: 'root'
})
export class ParticipantVinculoService {
  url: any;

  constructor(private http: HttpClient) { }

  getvinculosParticipante(identificacion: string): Observable<VinculoParticipanteDTO[]> {
    const params = new HttpParams().set('identificacion', identificacion);
    return this.http.get<VinculoParticipanteDTO[]>(`${this.url}/${ENDPOINTS.V1.PARTICIPANT_URL.VINCULO_PARTICIPANT}`, { params });
  }
}
