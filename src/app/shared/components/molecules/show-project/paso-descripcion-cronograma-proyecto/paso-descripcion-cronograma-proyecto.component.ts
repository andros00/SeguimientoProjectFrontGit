import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ProyectoMensajes } from '../proyecto-mensajes';
import { SeccionProyecto } from '../seccion-proyecto';
import { PasosProyectoService } from 'src/app/shared/services/show-project/pasos-proyecto.service';
import { PasosHabilitadosLocalService } from 'src/app/shared/services/show-project/pasos-habilitados-local.service';

@Component({
  selector: 'app-paso-descripcion-cronograma-proyecto',
  templateUrl: './paso-descripcion-cronograma-proyecto.component.html',
  styleUrls: ['./paso-descripcion-cronograma-proyecto.component.css']

})
export class PasoDescripcionCronogramaProyectoComponent implements OnInit {

  @Output() pasoSiguiente = new EventEmitter<any>();
  @Output() pasoAnterior = new EventEmitter<any>();

  descripcionesEditables = true;
  cronogramaEditable = true;
  pestanaDescripcionVisible = false;
  pestanaCronogramaVisible = false;

  constructor(
    pasosProyectoService: PasosProyectoService,
    private pasosHabilitadosLocalService: PasosHabilitadosLocalService) {

    this.pestanaDescripcionVisible = pasosProyectoService.esPestanaVisible(
      ProyectoMensajes.PASO_CRONOGRAMA,
      ProyectoMensajes.PESTANA_DESCRIPCION);

    this.pestanaCronogramaVisible = pasosProyectoService.esPestanaVisible(
        ProyectoMensajes.PASO_CRONOGRAMA,
        ProyectoMensajes.PESTANA_CRONOGRAMA);
  }

  ngOnInit() {
    this.descripcionesEditables = this.pasosHabilitadosLocalService.esEditable(SeccionProyecto.Descripcion);
    this.cronogramaEditable = this.pasosHabilitadosLocalService.esEditable(SeccionProyecto.Cronograma);
  }

  emitirPasoSiguiente() {
    this.pasoSiguiente.emit();
  }

  emitirPasoAnterior() {
    this.pasoAnterior.emit();
  }


}
