import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ENDPOINTS } from 'src/app/utils/url/endpoints-url';
import { IProjectParticipantDTO } from 'src/app/core/interfaces/IPojectParticipantDTO'
import { VinculoParticipanteDTO } from 'src/app/core/interfaces/VinculoParticipanteDTO';

import { ParticipanteDTO } from 'src/app/core/interfaces/ParticipanteDTO';


@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  private readonly url = `${environment.route}`;

  constructor(private http: HttpClient) { }

  getParticipantsByProjectCode(projectCode: string): Observable<IProjectParticipantDTO[]> {
    const params = new HttpParams().set('codigoProyecto', projectCode);
    return this.http.get<IProjectParticipantDTO[]>(`${this.url}/${ENDPOINTS.V1.PARTICIPANT_URL.PARTICIPANT_PROJECT_LIST}`, { params });
  }

  updateParticipant(participant: ParticipanteDTO): Observable<ParticipanteDTO> {

    console.log('Participante:::::::::' + JSON.stringify(participant, null, 2));

    return this.http.put<ParticipanteDTO>(`${this.url}${ENDPOINTS.V1.PARTICIPANT_URL.UPDATE_PARTICIPANT}`, participant);
  }

  getVinculoParticipant(identificacion: string): Observable<VinculoParticipanteDTO[]> {
    const params = new HttpParams().set('identificacion', identificacion);
    return this.http.get<VinculoParticipanteDTO[]>(`${this.url}${ENDPOINTS.V1.PARTICIPANT_URL.VINCULO_PARTICIPANT}`, { params });
  }

}
