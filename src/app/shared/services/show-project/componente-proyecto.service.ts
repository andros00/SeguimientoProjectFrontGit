import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ComponenteMacroproyecto } from '../../components/molecules/show-project/componente-macroproyecto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DireccionesUrl } from '../../components/molecules/show-project/direcciones-url';
import { ComponenteProyecto } from '../../components/molecules/show-project/componente-proyecto';

@Injectable({
  providedIn: 'root'
})
export class ComponenteProyectoService {

  constructor(private http: HttpClient) { }

  guardarComponentes(componentes: ComponenteMacroproyecto[], enviadoACentro = 'false'): Observable<any> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.GUARDAR_COMPONENTES_PROYECTO}`;
    return this.http.post(url, componentes,
      {params: {
        enviadoACentro: enviadoACentro
    }});
  }

  eliminarComponenteProyecto(identificador: number): Observable<void> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.ELIMINAR_COMPONENTE_PROYECTO}${identificador}`;
    return this.http.delete<void>(url);
  }

  consultarProyectosAsociadosAComponentes(codigoProyecto: string): Observable<ComponenteProyecto[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.CONSULTAR_PROYECTOS_DE_COMPONENTES}/${codigoProyecto}`;
    return this.http.get<ComponenteProyecto[]>(url);
  }
}
