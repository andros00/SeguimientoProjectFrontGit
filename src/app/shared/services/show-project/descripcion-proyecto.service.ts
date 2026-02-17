import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TextoDescriptivo } from '../../components/molecules/show-project/texto-descriptivo';
import { DireccionesUrl } from '../../components/molecules/show-project/direcciones-url';

@Injectable({
  providedIn: 'root'
})
export class DescripcionProyectoService {

  constructor(private http: HttpClient) { }


  guardarTextoDescriptivo(textoDescriptivo: TextoDescriptivo): Observable<TextoDescriptivo> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.GUARDAR_TEXTO_DESCRIPTIVO}`;
    return this.http.post<TextoDescriptivo>(url, textoDescriptivo);
  }

  guardarListaTextoDescriptivo(textosDescriptivos: TextoDescriptivo[], enviadoACentro = 'false'): Observable<TextoDescriptivo> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.GUARDAR_LISTA_TEXTO_DESCRIPTIVO}`;
    return this.http.post<TextoDescriptivo>(url, textosDescriptivos,
      {params: {
        enviadoACentro: enviadoACentro
    }});
  }

  eliminarTextoDescriptivo(textoDescriptivo: number): void {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.ELIMINAR_TEXTO_DESCRIPTIVO}`;
    this.http.delete<void>(`${url}/${textoDescriptivo}`).subscribe();
  }
}
