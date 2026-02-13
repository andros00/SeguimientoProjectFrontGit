import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
//import { AgregarActividadComponent } from './../agregar-actividad/agregar-actividad.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DiagramaActividadComponent } from './../diagrama-actividad/diagrama-actividad.component';
import { ConstantesExitoError } from '../mensaje-exito-error/constantes-exito-error';
import { AlertaMensaje } from '../mensaje-exito-error/alerta-mensaje';
import { AlertaLocalService } from 'src/app/shared/services/show-project/alerta-local.service';
import { ActividadProyecto } from '../actividad-proyecto';
import { CronogramaProyectoLocalService } from 'src/app/shared/services/show-project/cronograma-proyecto-local.service';
import { CronogramaService } from 'src/app/shared/services/show-project/cronograma.service';
import { InformacionGeneralProyecto } from '../informacion-general-proyecto';
import { ProyectoLocalService } from 'src/app/shared/services/show-project/proyecto-local.service';
import { PeriodoEnum } from '../periodo-enum';

const MENSAJE_EXITO = 'Actividades del proyecto guardadas con éxito.';
const MENSAJE_ERROR = 'Ocurrió un error guardando las actividades del proyecto.';

@Component({
  selector: 'app-pestana-cronograma-proyecto',
  templateUrl: './pestana-cronograma-proyecto.component.html',
  styleUrls: ['./pestana-cronograma-proyecto.component.css']
})
export class PestanaCronogramaProyectoComponent implements OnInit {

  @Input() editable: boolean;

  formularioPeriodo: FormGroup;
  listaCronogramaProyecto$: ActividadProyecto[] = [];
  informacionGeneral: InformacionGeneralProyecto;
  listaPeriodo = [PeriodoEnum.MESES, PeriodoEnum.DIAS, PeriodoEnum.SEMANAS];
  modoEdicion = false;

  constructor(public dialogo: MatDialog,
    private cronogramaServicioLocal: CronogramaProyectoLocalService,
    private cronogramaServicio: CronogramaService,
    public dialogoDiagrama: MatDialog, private formBuilder: FormBuilder,
    private proyectoLocalServicio: ProyectoLocalService, private activeRoute: ActivatedRoute,
    private alertaServicioLocal: AlertaLocalService) {
  }

  ngOnInit() {
    this.modoEdicion = this.activeRoute.snapshot.queryParams.estado === 'Editar';
    this.cronogramaServicioLocal.listaActividadProyectoObservable.subscribe(lista$ => {
      this.listaCronogramaProyecto$ = lista$;
    });
    this.informacionGeneral = this.proyectoLocalServicio.obtenerInformacionGeneralProyecto();
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.formularioPeriodo = this.formBuilder.group({
      periodo: [PeriodoEnum.MESES.nombreDB]
    });
    if (this.modoEdicion) {
      this.f.periodo.setValue(this.informacionGeneral.periodoCronograma.trim());
      this.validarPeriodoSeleccionado();
      this.f.periodo.disable();
    }
  }

  get f() { return this.formularioPeriodo.controls; }

  abrirAgregarActividad() {
    // Agregar actividad deshabilitado en modo solo lectura.
    console.warn('abrirAgregarActividad deshabilitado en modo solo lectura (pestana-cronograma)');
    // this.dialogo.open(AgregarActividadComponent).afterClosed().subscribe(_ => {
    //   this.validarPeriodoSeleccionado();
    // });
  }

  abrirDiagramaActividad() {
    // Ver diagrama de actividad deshabilitado en modo solo lectura.
    console.warn('abrirDiagramaActividad deshabilitado en modo solo lectura (pestana-cronograma)');
    // this.dialogoDiagrama.open(DiagramaActividadComponent);
  }

  guardarActividad() {
    // Guardado deshabilitado en modo solo lectura.
    console.warn('guardarActividad deshabilitado (solo lectura)');
  }

  agregarPeriodo(listaActividades: ActividadProyecto[]) {
    if (this.formularioPeriodo.valid) {
      listaActividades.forEach(actividad => {
        actividad.periodo = this.f.periodo.value;
      });
    }
  }

  validarPeriodoSeleccionado() {
    this.listaCronogramaProyecto$.forEach(actividad => {
      actividad.periodo = this.f.periodo.value;
    });
  }
}
