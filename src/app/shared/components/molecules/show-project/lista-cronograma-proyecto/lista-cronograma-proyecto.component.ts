import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertaMensaje } from '../mensaje-exito-error/alerta-mensaje';
//import { EditarActividadComponent } from './../editar-actividad/editar-actividad.component';
import { AlertaLocalService } from 'src/app/shared/services/show-project/alerta-local.service';
import { InformacionGeneralProyecto } from '../informacion-general-proyecto';
import { ProyectoLocalService } from 'src/app/shared/services/show-project/proyecto-local.service';
import { ConstantesExitoError } from '../mensaje-exito-error/constantes-exito-error';
import { DatosModal } from '../modal-dinamico/datos-modal';
import { ModalDinamicoComponent } from '../modal-dinamico/modal-dinamico.component';
import { ClaseAlerta } from '../clase-alerta';
import { CronogramaProyectoConstantes } from '../cronograma-proyecto-constantes';
import { ActividadProyecto } from '../actividad-proyecto';
import { CronogramaProyectoLocalService } from 'src/app/shared/services/show-project/cronograma-proyecto-local.service';
import { CronogramaService } from 'src/app/shared/services/show-project/cronograma.service';

const MENSAJE_EXITO_ELIMINANDO = 'La actividad fue eliminada con éxito.';
const MENSAJE_ERROR_ELIMINANDO = 'Ocurrió un error eliminando la actividad.';

@Component({
  selector: 'app-lista-cronograma-proyecto',
  templateUrl: './lista-cronograma-proyecto.component.html',
  styleUrls: ['./lista-cronograma-proyecto.component.css']
})
export class ListaCronogramaProyectoComponent implements OnInit {

  @Input() editable = false;

  listaCronogramaProyecto$: ActividadProyecto[] = [];
  informacionGeneral: InformacionGeneralProyecto = {
    codigo: '',
    claseProyecto: 0,
    nivelProyecto: 0
  };

  constructor(public dialogo: MatDialog, private cronogramaServicioLocal: CronogramaProyectoLocalService,
    public dialogoEditarActividad: MatDialog, private modal: MatDialog,
    private cronogramaServicio: CronogramaService, private proyectoLocalServicio: ProyectoLocalService,
    private alertaServicioLocal: AlertaLocalService
  ) {
  }

  ngOnInit() {
    this.cronogramaServicioLocal.listaActividadProyectoObservable.subscribe(lista$ => {
      this.listaCronogramaProyecto$ = lista$;
    });
    this.informacionGeneral = this.proyectoLocalServicio.obtenerInformacionGeneralProyecto();
  }

  abrirEditar(actividad: ActividadProyecto) {
    // z
  }

  abrirEliminarActividad(actividad: ActividadProyecto) {
    // Eliminación deshabilitada en modo solo lectura.
    console.warn('abrirEliminarActividad deshabilitado (solo lectura)');
  }

  eliminarActividad(actividad: ActividadProyecto) {
    // Eliminación deshabilitada en modo solo lectura.
    console.warn('eliminarActividad deshabilitado (solo lectura)');
  }


  private eliminarActividadLocal(actividad: ActividadProyecto, mensaje: AlertaMensaje) {
    // Operación local de eliminación deshabilitada en modo solo lectura.
    console.warn('eliminarActividadLocal deshabilitado (solo lectura)');
  }
}
