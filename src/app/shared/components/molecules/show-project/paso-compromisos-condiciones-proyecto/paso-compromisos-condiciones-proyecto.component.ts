import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProyectoMensajes } from '../proyecto-mensajes';
import { SeccionProyecto } from '../seccion-proyecto';
import { PasosProyectoService } from 'src/app/shared/services/show-project/pasos-proyecto.service';
import { PasosHabilitadosLocalService } from 'src/app/shared/services/show-project/pasos-habilitados-local.service';

@Component({
  selector: 'app-paso-compromisos-condiciones-proyecto',
  templateUrl: './paso-compromisos-condiciones-proyecto.component.html',
  styleUrls: ['./paso-compromisos-condiciones-proyecto.component.css']
})
export class PasoCompromisosCondicionesProyectoComponent implements OnInit {

  @Output() pasoSiguiente = new EventEmitter<any>();
  @Output() pasoAnterior = new EventEmitter<any>();

  editable = false; // indica si el componente permite la edición de los datos cargados
  pestanaCompromisosVisible = false;
  pestanaCondicionesVisible = false;

  constructor(pasosProyectoService: PasosProyectoService,
    private pasosHabilitadosLocalService: PasosHabilitadosLocalService) {
    this.pestanaCompromisosVisible = pasosProyectoService.esPestanaVisible(
      ProyectoMensajes.PASO_COMPROMISOS_CONDICIONES,
      ProyectoMensajes.PESTANA_COMPROMISOS);

    this.pestanaCondicionesVisible = pasosProyectoService.esPestanaVisible(
        ProyectoMensajes.PASO_COMPROMISOS_CONDICIONES,
        ProyectoMensajes.PESTANA_CONDICIONES_FORMALES);
  }

  ngOnInit() {
    this.editable = this.pasosHabilitadosLocalService.esEditable(SeccionProyecto.Compromiso);
  }

  emitirPasoSiguiente() {
    this.pasoSiguiente.emit();
  }

  emitirPasoAnterior() {
    this.pasoAnterior.emit();
  }
}
