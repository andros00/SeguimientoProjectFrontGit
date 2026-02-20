import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ParticipanteProyecto } from '../participante-proyecto';
import { AlertaMensaje } from '../mensaje-exito-error/alerta-mensaje';
import { ConstantesExitoError } from '../mensaje-exito-error/constantes-exito-error';
import { SeccionProyecto } from '../seccion-proyecto';
import { ProyectoLocalService } from 'src/app/shared/services/show-project/proyecto-local.service';
import { PasosHabilitadosLocalService } from 'src/app/shared/services/show-project/pasos-habilitados-local.service';
import { AlertaLocalService } from 'src/app/shared/services/show-project/alerta-local.service';
import { ParticipanteProyectoService } from 'src/app/shared/services/show-project/participante-proyecto.service';
import { ParticipanteProyectoLocalService } from 'src/app/shared/services/show-project/participante-proyecto-local.service';

const MENSAJE_EXITO = 'Participantes del proyecto guardados con éxito.';
const MENSAJE_ERROR = 'Ocurrió un error guardando los participantes del proyecto.';

@Component({
  selector: 'app-paso-participantes-proyecto',
  templateUrl: './paso-participantes-proyecto.component.html',
  styleUrls: ['./paso-participantes-proyecto.component.css']
})
export class PasoParticipantesProyectoComponent implements OnInit {

  @Output() pasoSiguiente = new EventEmitter<any>();
  @Output() pasoAnterior = new EventEmitter<any>();
  @Output() inhabilitarSiguiente = new EventEmitter<any>();
  @Output() habilitarSiguiente = new EventEmitter<any>();
  @Output() emitirParticipanteEditar: EventEmitter<ParticipanteProyecto> = new EventEmitter();

  inhabilitarBoton = false;
  editable = false;
  mostrarComponentes = false;

  participanteEditar: ParticipanteProyecto = {} as ParticipanteProyecto;

  formularioAgregarParticipante = false;
  formularioEditarParticipante = false;

  constructor(private participanteProyectoLocalServicio: ParticipanteProyectoLocalService,
    private participanteProyectoServicio: ParticipanteProyectoService,
    private pasosHabilitadosLocalService: PasosHabilitadosLocalService,
    private proyectoLocalServicio: ProyectoLocalService, private alertaServicioLocal: AlertaLocalService) { }

  ngOnInit() {
    const proyecto = this.proyectoLocalServicio.obtenerInformacionGeneralProyecto();
    const esMacroproyecto = proyecto.tipoProyectoMacro;
    this.mostrarComponentes = this.pasosHabilitadosLocalService.esSoloLectura() && (!!esMacroproyecto);
    this.editable = this.pasosHabilitadosLocalService.esEditable(SeccionProyecto.Participante);
  }

  emitirPasoSiguiente() {
    this.pasoSiguiente.emit();
  }

  emitirPasoAnterior() {
    this.pasoAnterior.emit();
  }

  cambiarEstadoVistaFormularioAgregarParticipante() {
    this.formularioAgregarParticipante = !this.formularioAgregarParticipante;
    if (this.formularioAgregarParticipante) {
      this.inhabilitarSiguiente.emit();
      this.inhabilitarBoton = true;
    } else {
      this.habilitarSiguiente.emit();
      this.inhabilitarBoton = false;
    }
  }

  cambiarEstadoVistaFormularioEditarParticipante(participante: ParticipanteProyecto) {
    this.formularioEditarParticipante = !this.formularioEditarParticipante;
    if (this.formularioEditarParticipante) {
      this.inhabilitarSiguiente.emit();
      this.inhabilitarBoton = true;
    } else {
      this.habilitarSiguiente.emit();
      this.inhabilitarBoton = false;
    }
    this.participanteEditar = participante;
  }

  ocultarFormularioEditarParticipante() {
    this.formularioEditarParticipante = !this.formularioEditarParticipante;
  }

  cargarParticipanteproyectoEditar(participante: ParticipanteProyecto) {
    this.emitirParticipanteEditar.emit(participante);
  }

  guardarParticipanteProyecto() {
    const mensaje = new AlertaMensaje();
    let listaParticipantes: ParticipanteProyecto[];
    listaParticipantes = this.participanteProyectoLocalServicio.obtenerListaParticipanteProyecto();
    if (listaParticipantes.length > 0) {
      this.participanteProyectoServicio.guardarParticipanteProyecto(listaParticipantes).subscribe(
        respuestaGuardado => {
          this.participanteProyectoLocalServicio.agregarParticipanteProyecto(respuestaGuardado);
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
  }
}
