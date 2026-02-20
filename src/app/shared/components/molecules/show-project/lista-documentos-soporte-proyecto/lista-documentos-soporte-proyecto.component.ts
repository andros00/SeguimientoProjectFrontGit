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

  @Input() editable!: boolean;

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
    // const datosModal: DatosModal = {
    //   titulo: DocumentosSoporteConstantes.TITULO_ALERTA_ELIMINAR_DOCUMENTO,
    //   mensaje: DocumentosSoporteConstantes.ELIMINAR_DOCUMENTO,
    //   textoPrimerBoton: ClaseAlerta.CANCELAR,
    //   textoSegundoBoton: ClaseAlerta.ELIMINAR,
    //   clase: ClaseAlerta.ALERTA_INFORMATIVA,
    // };
    // const modalEliminarDocumentoRef = this.modal.open(ModalDinamicoComponent, {
    //   data: datosModal
    // });

    // modalEliminarDocumentoRef.afterClosed().subscribe(result => {
    //   if (ClaseAlerta.ELIMINAR === result) {
    //     this.eliminarDocumento(documento);
    //   }
    // });
  }

  eliminarDocumento(documento: DocumentoProyecto) {
    const mensaje = new AlertaMensaje();
    if (!!documento.identificador && documento.identificador !== 0) {
      this.documentoProyectoServicio.eliminarDocumentoSoporte(documento).subscribe(
        _ => {
          this.eliminarDocumentoLocal(documento, mensaje);
        },
        _ => {
          mensaje.tipoMensaje = ConstantesExitoError.ERROR;
          mensaje.mensaje = MENSAJE_ERROR_ELIMINANDO;
          this.alertaServicioLocal.agregarMensaje(mensaje);
        });
    } else {
      this.eliminarDocumentoLocal(documento, mensaje);
    }
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
