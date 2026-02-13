import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JovenInvestigadorDTO } from 'src/app/core/interfaces/JovenInvestigadorDTO';
import { PersonaMaresDTO } from 'src/app/core/interfaces/PersonaMaresDTO';
import { PersonaNaturalDTO } from 'src/app/core/interfaces/PersonaNaturalDTO';
import { ENDPOINTS } from 'src/app/utils/url/endpoints-url';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JovenInvestigadorService {

  private readonly url = `${environment.route}`;
  constructor(private http: HttpClient) { }
  /**
   * Consulta los jóvenes investigadores asociados a un identificador.
   * @param identificador Código o id del proyecto/participante
   */
  consultarJovenes(projectCode: string): Observable<JovenInvestigadorDTO> {
    const params = new HttpParams().set('codigoProyecto', projectCode);
    return this.http.get<JovenInvestigadorDTO>(`${this.url}${ENDPOINTS.V1.INVESTIGADOR.JOVEN_INVESTIGADOR}`, { params });
  }

  guardarJovenInvestigador(joven: JovenInvestigadorDTO): Observable<any> {
    return this.http.post(`${this.url}${ENDPOINTS.V1.INVESTIGADOR.GURDAR_JI}`, joven);
  }

  nuevoJovenInvestigador(identificacion: string): Observable<PersonaMaresDTO> {
    const params = new HttpParams().set('identificacion', identificacion);
    return this.http.get<PersonaMaresDTO>(`${this.url}${ENDPOINTS.V1.INVESTIGADOR.NUEVO_JI}`, { params });
  }

}
