import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DireccionesUrl } from '../../components/molecules/show-project/direcciones-url';
import { CondicionFormalPorEvaluacion } from '../../components/molecules/show-project/condicion-formal-por-evaluacion';

@Injectable({
  providedIn: 'root'
})
export class CondicionesFormalesService {

  constructor(private http: HttpClient) { }


  guardarCondicionesFormales(condiciones: CondicionFormalPorEvaluacion[], enviadoACentro = 'false'): Observable<any> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.GUARDAR_CONDICIONES_FORMALES_PROYECTO}`;
    return this.http.post(url, condiciones,
      {params: {
        enviadoACentro: enviadoACentro
    }});
  }
}
