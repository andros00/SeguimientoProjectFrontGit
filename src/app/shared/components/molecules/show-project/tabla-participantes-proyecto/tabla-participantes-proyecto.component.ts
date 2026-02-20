import { DatosModal } from '../modal-dinamico/datos-modal';
import { ParticipanteProyecto } from '../participante-proyecto';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ParticipanteProyectoLocalService } from 'src/app/shared/services/show-project/participante-proyecto-local.service';
import { ModalDinamicoComponent } from '../modal-dinamico/modal-dinamico.component';
import { ClaseAlerta } from '../clase-alerta';
import { ProyectoConstantes } from '../proyecto-constantes';
import { ParticipanteProyectoService } from 'src/app/shared/services/show-project/participante-proyecto.service';

@Component({
  selector: 'app-tabla-participantes-proyecto',
  templateUrl: './tabla-participantes-proyecto.component.html',
  styleUrls: ['./tabla-participantes-proyecto.component.css']
})
export class TablaParticipantesProyectoComponent implements OnInit {

  readonly tiempoVisibleMensaje = 5000;

  @Input() editable!: boolean;
  @Output() emitirParticipanteEditar: EventEmitter<ParticipanteProyecto> = new EventEmitter();

  listaParticipantes: ParticipanteProyecto[] = [];
  mostrarMensajeExitoEliminar = false;
  mostrarMensajeErrorEliminar = false;

  constructor(
    private modal: MatDialog,
    private participanteServicio: ParticipanteProyectoService,
    private participanteLocalServicio: ParticipanteProyectoLocalService) {

    this.participanteLocalServicio.listaParticipanteProyectoObservable.subscribe(listado => {
      this.listaParticipantes = listado;
    });
  }

  ngOnInit() {
  }

  habilitarRegistro(participante: ParticipanteProyecto) {
    participante.habilitarRegistro = !participante.habilitarRegistro;
  }

  editarParticipante(participante: ParticipanteProyecto) {
    this.emitirParticipanteEditar.emit(participante);
  }

  abrirEliminarParticipante(participante: ParticipanteProyecto) {
    const datosModal: DatosModal = {
      titulo: ProyectoConstantes.TITULO_ALERTA_ELIMINAR_PARTICIPANTE,
      mensaje: ProyectoConstantes.ELIMINAR_PARTICIPANTE,
      textoPrimerBoton: ClaseAlerta.CANCELAR,
      textoSegundoBoton: ClaseAlerta.ELIMINAR,
      clase: ClaseAlerta.ALERTA_INFORMATIVA,
    };
    const modalEliminaParticipanteRef = this.modal.open(ModalDinamicoComponent, {
      data: datosModal
    });

    modalEliminaParticipanteRef.afterClosed().subscribe(result => {
      if (ClaseAlerta.ELIMINAR === result) {
        this.eliminarParticipante(participante);
      }
    });
  }

  eliminarParticipante(participante: ParticipanteProyecto) {
    if (participante.identificador !== 0) {
      this.participanteServicio.eliminarParticipanteProyecto(participante.identificador).subscribe(
        _ => { },
        _ => {
          this.mostrarMensajeErrorEliminar = true;
          this.mostrarMensajeExitoEliminar = false;
          setTimeout(() => {
            this.mostrarMensajeErrorEliminar = false;
          }, this.tiempoVisibleMensaje);
        }
      );
    }
    const listaParticipantes = this.participanteLocalServicio.obtenerListaParticipanteProyecto();
    const index = listaParticipantes.indexOf(participante);
    listaParticipantes.splice(index, 1);
    this.participanteLocalServicio.agregarParticipanteProyecto(listaParticipantes);
    if (!this.mostrarMensajeErrorEliminar) {
      this.mostrarMensajeExitoEliminar = true;
      setTimeout(() => {
        this.mostrarMensajeExitoEliminar = false;
      }, this.tiempoVisibleMensaje);
    }
  }

  construirNombreCompleto(nombre: string, pApellido: string, sApellido?: string) {
    return nombre.concat(' ').concat(!!pApellido ? pApellido : '').concat(' ').concat(!!sApellido ? sApellido : '');
  }

  mostrarProgramaAcademico(nombrePrograma: string, porcentajeCompletado: string) {
    const programaAcademico: string = (!!nombrePrograma ? nombrePrograma.concat('/ ') : '')
      .concat(!!porcentajeCompletado ? porcentajeCompletado : '');
    return programaAcademico;
  }

  concatenarCadena(...cadenas: string[]) {
    return cadenas.filter(cadena => !!cadena).join('/ ');
  }

}
