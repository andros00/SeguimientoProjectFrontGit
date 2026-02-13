import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DocumentoProyecto } from '../documento-proyecto';
import { DireccionesUrl } from '../direcciones-url';
import { ProyectoLocalService } from 'src/app/shared/services/show-project/proyecto-local.service';
import { DocumentoSoporteProyectoService } from '../agregar-documento-soporte-proyecto/documento-soporte-proyecto.service';
import { DocumentoSoporteProyectoLocalService } from 'src/app/shared/services/show-project/documento-soporte-proyecto-local.service';
import { FormularioService } from 'src/app/shared/services/show-project/formulario.service';
import { AlertaLocalService } from 'src/app/shared/services/show-project/alerta-local.service';
import { AlertaMensaje } from '../mensaje-exito-error/alerta-mensaje';
import { ConstantesExitoError } from '../mensaje-exito-error/constantes-exito-error';

const MENSAJE_EXITO_ELIMINANDO = 'El documento fue eliminado con éxito.';
const MENSAJE_ERROR_ELIMINANDO = 'Ocurrió un error eliminando el documento.';

@Component({
  selector: 'app-lista-documentos-soporte-proyecto',
  templateUrl: './lista-documentos-soporte-proyecto.component.html',
  styleUrls: ['./lista-documentos-soporte-proyecto.component.css']
})
export class ListaDocumentosSoporteProyectoComponent implements OnInit {

  @Input() editable: boolean;

  listaDocumentosProyecto$: Observable<DocumentoProyecto[]>;

  urlBase = environment.URL_BASE;
  direccion = DireccionesUrl.DIRECCIONES_PROYECTO.DESCARGAR_DOCUMENTO;

  constructor(private proyectoLocalServicio: ProyectoLocalService,
    private documentoProyectoServicio: DocumentoSoporteProyectoService,
    public dialogoEditarDocumento: MatDialog,
    private documentoSoporteServicioLocal: DocumentoSoporteProyectoLocalService,
    private modal: MatDialog, private formularioServicio: FormularioService,
    private alertaServicioLocal: AlertaLocalService) { }

  ngOnInit() {
    this.listaDocumentosProyecto$ = this.documentoSoporteServicioLocal.listaDocumentosProyectoObservable;
  }

  abrirModalEdicionDocumentoSoporte(documento: DocumentoProyecto) {
    // this.dialogoEditarDocumento.open(EditarDocumentoSoporteProyectoComponent, {
    //   data: documento
    // });
  }

  abrirEliminar(documento: DocumentoProyecto): void {
    console.warn('Eliminación deshabilitada en modo solo lectura (lista-documentos-soporte).', documento);
  }

  eliminarDocumento(documento: DocumentoProyecto) {
    console.warn('eliminarDocumento deshabilitado en modo solo lectura (lista-documentos-soporte).', documento);
  }

  private eliminarDocumentoLocal(documento: DocumentoProyecto, mensaje: AlertaMensaje) {
    const listaDocumentosProyecto = this.documentoSoporteServicioLocal.obtenerListaDocumentosProyecto();
    const index = listaDocumentosProyecto.indexOf(documento);
    listaDocumentosProyecto.splice(index, 1);
    this.documentoSoporteServicioLocal.agregarListaDocumentosProyecto(listaDocumentosProyecto);
    mensaje.tipoMensaje = ConstantesExitoError.EXITO;
    mensaje.mensaje = MENSAJE_EXITO_ELIMINANDO;
    this.alertaServicioLocal.agregarMensaje(mensaje);

  }
}
