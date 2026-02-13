import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DireccionesUrl } from '../../components/molecules/show-project/direcciones-url';
import { CompromisoProyecto } from '../../components/molecules/show-project/compromiso-proyecto';

@Injectable({
  providedIn: 'root'
})
export class CompromisosProyectoService {

  constructor(private http: HttpClient) { }

  guardarCompromisos(compromisos: CompromisoProyecto[], enviadoACentro = 'false'): Observable<CompromisoProyecto[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.GUARDAR_COMPROMISOS_PROYECTO}`;
    return this.http.post<CompromisoProyecto[]>(url, compromisos,
      {params: {
        enviadoACentro: enviadoACentro
    }});
  }

  eliminarCompromisoProyecto(identificador: number): Observable<void> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.ELIMINAR_COMPROMISO_PROYECTO}${identificador}`;
    return this.http.delete<void>(url);
  }

  obtenerCompromisosPorProyecto(codigoProyecto: string): Observable<CompromisoProyecto[]> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.CONSULTA_COMPROMISOS_POR_PROYECTO}${codigoProyecto}`;
    return this.http.get<CompromisoProyecto[]>(url);
  }
}
