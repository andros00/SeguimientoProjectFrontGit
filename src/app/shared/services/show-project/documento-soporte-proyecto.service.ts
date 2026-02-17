import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { DireccionesUrl } from '../../components/molecules/show-project/direcciones-url';
import { DocumentoSoporte } from '../../components/molecules/show-project/documento-soporte';
import { DocumentoProyecto } from '../../components/molecules/show-project/documento-proyecto';
import { TipoDocumento } from '../../components/molecules/show-project/tipo-documento';

@Injectable({
  providedIn: 'root'
})
export class DocumentoSoporteProyectoService {


  constructor(
    private http: HttpClient
  ) { }

  consultarListaTipoDocumento(): Observable<TipoDocumento[]> {
    return this.http.get<TipoDocumento[]>(`${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.TIPO_DOCUMENTO}`);
  }

  guardarDocumentoSoporte(documentos: DocumentoProyecto[], enviadoACentro = 'false'): Observable<any> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.GUARDAR_DOCUMENTO_PROYECTO}`;
    return this.http.post(url, documentos,
      {
        params: {
          enviadoACentro: enviadoACentro
        }
      });
  }

  eliminarDocumentoSoporte(documento: DocumentoProyecto): Observable<any> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.ELIMINAR_DOCUMENTO_SOPORTE}`;
    return this.http.post(url, documento);
  }

  descargarDocumento(idDocumentoSoporte: number): Observable<DocumentoSoporte> {
    const url = `${environment.URL_BASE}${DireccionesUrl.DIRECCIONES_PROYECTO.DESCARGAR_DOCUMENTO_SOPORTE}${idDocumentoSoporte}`;
    return this.http.get<DocumentoSoporte>(url);
  }
}
