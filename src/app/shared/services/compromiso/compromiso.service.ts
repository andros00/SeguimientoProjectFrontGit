import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompromisoProyectoDTO } from 'src/app/core/interfaces/CompromisoProyectoDTO';
import { CompromisoCentroDTO } from 'src/app/core/interfaces/CompromisoCentroDTO';
import { environment } from 'src/environments/environment';
import { ENDPOINTS } from 'src/app/utils/url/endpoints-url';
import { CompromisoFechaRequest } from 'src/app/core/request/compromisoFechaRequest';

@Injectable({
  providedIn: 'root'
})
export class CompromisoService {
  private readonly baseUrl = `${environment.route}${ENDPOINTS.V1.COMPROMISO_URL.COMPROMISO}`;

  constructor(private http: HttpClient) {}

  insertar(compromiso: CompromisoProyectoDTO): Observable<number> {
    return this.http.post<number>(this.baseUrl, compromiso);
  }

  actualizar(compromiso: CompromisoProyectoDTO): Observable<number> {
    return this.http.put<number>(this.baseUrl, compromiso);
  }

  actualizarFechaEstimada(
    compromisoFecha: CompromisoFechaRequest
  ): Observable<number> {
      console.log('actualizarFechaEstimada:::::::::' + JSON.stringify(compromisoFecha, null, 2));
    return this.http.put<number>(`${this.baseUrl}/fecha-estimada`, compromisoFecha);
  }

  obtenerTodos(): Observable<CompromisoProyectoDTO[]> {
    return this.http.get<CompromisoProyectoDTO[]>(this.baseUrl);
  }

  obtenerPorId(id: number): Observable<CompromisoProyectoDTO> {
    return this.http.get<CompromisoProyectoDTO>(`${this.baseUrl}/${id}`);
  }

  buscarPorProyecto(codigo: string): Observable<CompromisoProyectoDTO[]> {
    console.log(':::::codigo:::'+codigo);
    return this.http.get<CompromisoProyectoDTO[]>(`${this.baseUrl}/proyecto/${codigo}`);
  }

  buscarPorCentro(filtro: CompromisoCentroDTO): Observable<CompromisoCentroDTO[]> {
    return this.http.post<CompromisoCentroDTO[]>(`${this.baseUrl}/centro`, filtro);
  }
}
