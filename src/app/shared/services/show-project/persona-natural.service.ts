import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
//import { EvaluadorConstantes } from '../../evaluador/evaluador-constantes';
import { DireccionesUrl } from '../../components/molecules/show-project/direcciones-url';
import { PersonaNatural } from '../../components/molecules/show-project/persona-natural';
import { TokenLocalService } from './token-local.service';

@Injectable({
  providedIn: 'root'
})
export class PersonaNaturalService {

  constructor(private http: HttpClient, private tokenLocalService: TokenLocalService) { }

  consultarInformacionPersonaNaturalEnSession(token?: string): Observable<PersonaNatural> {
    let headers: any;
      headers = {
        'X-TOKEN': token || '',
        'Cache-Control': 'no-cache'
      };

    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_COMPARTIDO.CONSULTAR_INFO_USUARIO_SESSION}`;
    return this.http.get<PersonaNatural>(url, { headers: headers });
  }

  consultarPersonaNaturalPorId(identificacion: string): Observable<PersonaNatural> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_COMPARTIDO.CONSULTA_PERSONA_NATURAL_POR_ID}${identificacion}`;
    return this.http.get<PersonaNatural>(url);
  }

  consultarPersonaNaturalPorNombres(nombre: string, apellido: string): Observable<PersonaNatural[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_COMPARTIDO.CONSULTA_PERSONA_NATURAL_POR_NOMBRES}${nombre}/${apellido}`;
    return this.http.get<PersonaNatural[]>(url);
  }

  registrarPersonaNatural(personaNatural: PersonaNatural): Observable<boolean> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_COMPARTIDO.REGISTRO_PERSONA_NATURAL}`;
    return this.http.post<boolean>(url, personaNatural);
  }
}
