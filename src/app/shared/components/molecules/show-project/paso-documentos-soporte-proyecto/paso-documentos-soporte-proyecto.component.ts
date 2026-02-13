import { ConstantesExitoError } from '../mensaje-exito-error/constantes-exito-error';
import { AlertaMensaje } from '../mensaje-exito-error/alerta-mensaje';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SeccionProyecto } from '../seccion-proyecto';
import { DocumentoProyecto } from '../documento-proyecto';
import { ProyectoConstantes } from '../proyecto-constantes';
import { AgregarDocumentoSoporteProyectoComponent } from '../agregar-documento-soporte-proyecto/agregar-documento-soporte-proyecto.component';
import { ProyectoMensajes } from '../proyecto-mensajes';
import { PasosHabilitadosLocalService } from 'src/app/shared/services/show-project/pasos-habilitados-local.service';
import { AlertaLocalService } from 'src/app/shared/services/show-project/alerta-local.service';
import { PasosProyectoService } from 'src/app/shared/services/show-project/pasos-proyecto.service';
import { FormularioService } from 'src/app/shared/services/show-project/formulario.service';
import { DocumentoSoporteProyectoLocalService } from 'src/app/shared/services/show-project/documento-soporte-proyecto-local.service';
import { DocumentoSoporteProyectoService } from 'src/app/shared/services/show-project/documento-soporte-proyecto.service';

const MENSAJE_EXITO = 'Documentos del proyecto guardados con éxito.';
const MENSAJE_ERROR = 'Ocurrió un error guardando los documentos del proyecto.';

@Component({
  selector: 'app-paso-documentos-soporte-proyecto',
  templateUrl: './paso-documentos-soporte-proyecto.component.html',
  styleUrls: ['./paso-documentos-soporte-proyecto.component.css'],
})
export class PasoDocumentosSoporteProyectoComponent implements OnInit {

  @Output() pasoSiguiente = new EventEmitter<any>();
  @Output() pasoAnterior = new EventEmitter<any>();

  listaDocumento: DocumentoProyecto[] = [];
  editable = false;
  publicarVisible = false;

  constructor(
    public dialogo: MatDialog, public formularioServicio: FormularioService,
    private documentoSoporteServicioLocal: DocumentoSoporteProyectoLocalService,
    private documentoProyectoServicio: DocumentoSoporteProyectoService,
    private pasosHabilitadosLocalService: PasosHabilitadosLocalService,
    private alertaServicioLocal: AlertaLocalService,
    private pasosProyectoService: PasosProyectoService) { }

  ngOnInit() {
    this.editable = this.pasosHabilitadosLocalService.esEditable(SeccionProyecto.Documento);
    this.publicarVisible = this.pasosProyectoService.esPasoVisible(ProyectoMensajes.PASO_PUBLICAR);
    this.documentoSoporteServicioLocal.listaDocumentosProyectoObservable.subscribe(listaDocumento => {
      this.listaDocumento = listaDocumento;
    });
  }

  abrirModalAgregarDocumentoSoporte() {
    this.dialogo.open(AgregarDocumentoSoporteProyectoComponent);
  }

  guardarDocumentos() {
    const mensaje = new AlertaMensaje();
    let listaDocumentos: DocumentoProyecto[];
    listaDocumentos = this.documentoSoporteServicioLocal.obtenerListaDocumentosProyecto();
    this.documentoProyectoServicio.guardarDocumentoSoporte(listaDocumentos).subscribe(respuestaGuardado => {
      this.documentoSoporteServicioLocal.agregarListaDocumentosProyecto(respuestaGuardado);
      mensaje.tipoMensaje = ConstantesExitoError.EXITO;
      mensaje.mensaje = MENSAJE_EXITO;
      this.alertaServicioLocal.agregarMensaje(mensaje);
    },
      _ => {
        mensaje.tipoMensaje = ConstantesExitoError.ERROR;
        mensaje.mensaje = MENSAJE_ERROR;
        this.alertaServicioLocal.agregarMensaje(mensaje);
      });

  }

  emitirPasoSiguiente() {
    this.pasoSiguiente.emit();
  }

  emitirPasoAnterior() {
    this.pasoAnterior.emit();
  }
}
