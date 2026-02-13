import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SeccionProyecto } from '../seccion-proyecto';
import { ContenedorEvaluadorBusquedaComponent } from '../contenedor-evaluador-busqueda/contenedor-evaluador-busqueda.component';
import { AlertaMensaje } from '../mensaje-exito-error/alerta-mensaje';
import { ConstantesExitoError } from '../mensaje-exito-error/constantes-exito-error';
import { EvaluadorRecomendado } from '../evaluador-recomendado';
import { PasosHabilitadosLocalService } from 'src/app/shared/services/show-project/pasos-habilitados-local.service';
import { AlertaLocalService } from 'src/app/shared/services/show-project/alerta-local.service';
import { EvaluadorService } from 'src/app/shared/services/show-project/evaluador.service';
import { EvaluadorProyectoLocalService } from 'src/app/shared/services/show-project/evaluador-proyecto-local.service';

const MENSAJE_EXITO = 'Evaluadores recomendados del proyecto guardados con éxito.';
const MENSAJE_ERROR = 'Ocurrió un error guardando los evaluadores recomendados del proyecto.';

@Component({
  selector: 'app-paso-evaluadores-recomendados-proyecto',
  templateUrl: './paso-evaluadores-recomendados-proyecto.component.html',
  styleUrls: ['./paso-evaluadores-recomendados-proyecto.component.css'],
  standalone: true
})
export class PasoEvaluadoresRecomendadosProyectoComponent implements OnInit {

  @Output() pasoSiguiente = new EventEmitter<any>();
  @Output() pasoAnterior = new EventEmitter<any>();
  listaEvaluadoresRecomendados$: EvaluadorRecomendado[] = [];
  editable = false;

  constructor(public dialogo: MatDialog,
    private evaluadorProyectoLocal: EvaluadorProyectoLocalService,
    private evaluadorProyectoServicio: EvaluadorService,
    private pasosHabilitadosLocalService: PasosHabilitadosLocalService,
    private alertaServicioLocal: AlertaLocalService) { }

  ngOnInit() {
    this.editable = this.pasosHabilitadosLocalService.esEditable(SeccionProyecto.Evaluador);
    this.evaluadorProyectoLocal.listaEvaluadoresRecomendadosObservable.subscribe(lista$ => {
      this.listaEvaluadoresRecomendados$ = lista$;
    });
  }

  emitirPasoSiguiente() {
    this.pasoSiguiente.emit();
  }

  emitirPasoAnterior() {
    this.pasoAnterior.emit();
  }

  agregarEvaluador() {
    this.dialogo.open(ContenedorEvaluadorBusquedaComponent);
  }

  guardarEvaluadoresRecomendados() {
    // Guardado deshabilitado en modo solo lectura.
    console.warn('guardarEvaluadoresRecomendados deshabilitado (solo lectura)');
  }
}
