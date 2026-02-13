import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IParticipantRoleDTO } from 'src/app/core/interfaces/IParticipantRoleDTO';
import { ENDPOINTS } from 'src/app/utils/url/endpoints-url';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParticipantRoleService {

private readonly url = `${environment.route}/${ENDPOINTS.V1.PARTICIPANT_URL.ROLE}`;


  constructor(private http: HttpClient) { }

  // getParticipantRoleByid(id: number): Observable<IParticipantRoleDTO> {
  //   return this.http.get<IParticipantRoleDTO>(`${this.url}/${id}`);
  // }

  getParticipantRole(): Observable<IParticipantRoleDTO[]> {
    return this.http.get<IParticipantRoleDTO[]>(`${this.url}`);
  }

}
