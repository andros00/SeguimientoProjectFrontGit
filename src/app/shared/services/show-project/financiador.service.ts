import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FiltroPersonaJuridica } from '../../components/molecules/show-project/modelo/filtro-Persona-juridica';
import { PersonaJuridica } from '../../components/molecules/show-project/persona-juridica';
import { DireccionesUrl } from '../../components/molecules/show-project/direcciones-url';
import { FinanciadorConvocatoria } from '../../components/molecules/show-project/financiador-convocatoria';
import { CofinanciadorMatriculaProyecto } from '../../components/molecules/show-project/cofinanciador-matricula-proyectos';

@Injectable({
  providedIn: 'root'
})
export class FinanciadorService {

  message = 'Error extrayendo la información';
  constructor(private http: HttpClient) {
  }

  obtenerPersonasJuridicas(filtroPersonaJuridica: FiltroPersonaJuridica): Observable<PersonaJuridica[]> {
    const palabra = '&palabraClave=';
    const nit = '&nit=';
    const limite: boolean = filtroPersonaJuridica.limiteGeograficoNacional ?? false;
    const clave: string = filtroPersonaJuridica.palabraClave;
    const valor: string = filtroPersonaJuridica.nit ?? '';

    return this.http.get<PersonaJuridica[]>(
      `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_COMPARTIDO.CONSULTA_PERSONA_JURIDICA}${limite}${palabra}${clave}${nit}${valor}`);
  }

  guardarPersonaJuridica(personaJuridica: any): Observable<any> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_COMPARTIDO.REGISTRAR_PERSONA_JURIDICA}`;
    return this.http.post<PersonaJuridica>
      (url, personaJuridica);
  }

  obtenerFinanciadorPorConvocatoria(idConvocatoria: number): Observable<FinanciadorConvocatoria[]> {
    return this.http.get<FinanciadorConvocatoria[]>
      (`${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_CONVOCATORIA.CONSULTAR_FINANCIADOR}${idConvocatoria}`);
  }

  consultarDatosAdicionalAportantes(): Observable<CofinanciadorMatriculaProyecto> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.OBTENER_DATOS_ADICIONAL_APORTANTES}`;
    return this.http.get<CofinanciadorMatriculaProyecto>(url);
  }

}
