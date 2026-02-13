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

  @Input() editable: boolean;
  @Output() emitirParticipanteEditar: EventEmitter<ParticipanteProyecto> = new EventEmitter();

  listaParticipantes: ParticipanteProyecto[];
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

  habilitarRegistro(participante) {
    participante.habilitarRegistro = !participante.habilitarRegistro;
  }

  editarParticipante(participante: ParticipanteProyecto) {
    console.warn('editarParticipante deshabilitado en modo solo lectura (tabla-participantes).', participante);
  }

  abrirEliminarParticipante(participante: ParticipanteProyecto) {
    console.warn('abrirEliminarParticipante deshabilitado en modo solo lectura (tabla-participantes).', participante);
  }

  eliminarParticipante(participante: ParticipanteProyecto) {
    console.warn('eliminarParticipante deshabilitado en modo solo lectura (tabla-participantes).', participante);
  }

  construirNombreCompleto(nombre: string, pApellido: string, sApellido) {
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
