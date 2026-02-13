import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DocumentoProyecto } from '../../components/molecules/show-project/documento-proyecto';
import { ProyectoConstantes } from '../../components/molecules/show-project/proyecto-constantes';
import { ServicioProyectoLocal } from './servicio-proyecto-local';
import { DocumentoSoporteProyectoService } from '../../components/molecules/show-project/agregar-documento-soporte-proyecto/documento-soporte-proyecto.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentoSoporteProyectoLocalService implements ServicioProyectoLocal {


  private listaDocumentosProyecto: BehaviorSubject<DocumentoProyecto[]> = new BehaviorSubject(([]));
  public listaDocumentosProyectoObservable = this.listaDocumentosProyecto.asObservable();

  constructor(private documentoServicio: DocumentoSoporteProyectoService) { }

  obtenerListaDocumentosProyecto(): DocumentoProyecto[] {
    return this.listaDocumentosProyecto.getValue();
  }

  agregarListaDocumentosProyecto(listaDocumentosProyecto: DocumentoProyecto[]) {
    this.listaDocumentosProyecto.next(listaDocumentosProyecto);
  }

  validar() {
    return '';
  }

  guardar() {
    return this.documentoServicio.guardarDocumentoSoporte(this.listaDocumentosProyecto.getValue(), ProyectoConstantes.ENVIADO_A_CENTRO);
  }

  postguardado(listaDocumentosProyecto: DocumentoProyecto[]) {
    this.agregarListaDocumentosProyecto(listaDocumentosProyecto);
  }
}
