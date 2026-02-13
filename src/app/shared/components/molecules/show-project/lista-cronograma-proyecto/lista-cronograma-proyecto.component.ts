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
    const datosModal: DatosModal = {
      titulo: CronogramaProyectoConstantes.TITULO_ALERTA_ELIMINAR_ACTIVIDAD,
      mensaje: CronogramaProyectoConstantes.ELIMINAR_ACTIVIDAD,
      textoPrimerBoton: ClaseAlerta.CANCELAR,
      textoSegundoBoton: ClaseAlerta.ELIMINAR,
      clase: ClaseAlerta.ALERTA_INFORMATIVA,
    };
    const modalEliminarCondicionRef = this.modal.open(ModalDinamicoComponent, {
      data: datosModal
    });

    modalEliminarCondicionRef.afterClosed().subscribe(result => {
      if (ClaseAlerta.ELIMINAR === result) {
        this.eliminarActividad(actividad);
      }
    });
  }

  eliminarActividad(actividad: ActividadProyecto) {
    const mensaje = new AlertaMensaje();
    if (!!actividad.identificador && actividad.identificador !== 0) {
      this.cronogramaServicio.eliminarActividadProyecto(actividad.identificador).subscribe(_ => {
        this.eliminarActividadLocal(actividad, mensaje);
      },
        _ => {
          mensaje.tipoMensaje = ConstantesExitoError.ERROR;
          mensaje.mensaje = MENSAJE_ERROR_ELIMINANDO;
          this.alertaServicioLocal.agregarMensaje(mensaje);
        });
    } else {
      this.eliminarActividadLocal(actividad, mensaje);
    }
  }


  private eliminarActividadLocal(actividad: ActividadProyecto, mensaje: AlertaMensaje) {
    const listaActividades = this.cronogramaServicioLocal.obtenerListaActividadProyecto();
    const index = listaActividades.indexOf(actividad);
    listaActividades.splice(index, 1);
    this.cronogramaServicioLocal.agregarActividadProyecto(listaActividades);
    mensaje.tipoMensaje = ConstantesExitoError.EXITO;
    mensaje.mensaje = MENSAJE_EXITO_ELIMINANDO;
    this.alertaServicioLocal.agregarMensaje(mensaje);
  }
}
