import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompromisoNotaDTO } from 'src/app/core/interfaces/CompromisoNotaDTO';
import { ENDPOINTS } from 'src/app/utils/url/endpoints-url';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompromisoNotaService {

  private readonly baseUrl = `${environment.route}${ENDPOINTS.V1.COMPROMISO_URL.NOTA_COMPROMISO}`;

  constructor(private http: HttpClient) { }

  agregarNota(nota: CompromisoNotaDTO): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}`, nota);
  }

  buscarPoridCompromisoProyecto(idCompromisoProyecto: number): Observable<CompromisoNotaDTO[]> {
    const params = new HttpParams().set('idCompromisoProyecto', idCompromisoProyecto);
    return this.http.get<CompromisoNotaDTO[]>(`${this.baseUrl}/${idCompromisoProyecto}`, { params });
  }
}
