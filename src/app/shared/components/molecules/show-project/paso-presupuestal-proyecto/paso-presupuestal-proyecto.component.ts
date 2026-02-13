import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProyectoMensajes } from '../proyecto-mensajes';
import { SeccionProyecto } from '../seccion-proyecto';
import { AportanteProyectoLocalService } from 'src/app/shared/services/show-project/aportante-proyecto-local.service';
import { PasosProyectoService } from 'src/app/shared/services/show-project/pasos-proyecto.service';
import { PasosHabilitadosLocalService } from 'src/app/shared/services/show-project/pasos-habilitados-local.service';

@Component({
  selector: 'app-paso-presupuestal-proyecto',
  templateUrl: './paso-presupuestal-proyecto.component.html',
  styleUrls: ['./paso-presupuestal-proyecto.component.css'],

})
export class PasoPresupuestalProyectoComponent implements OnInit {

  @Output() pasoSiguiente = new EventEmitter<any>();
  @Output() pasoAnterior = new EventEmitter<any>();

  editable = false;
  pestanaPresupuestoVisible = false;
  pestanaCofinanciadorVisible = false;
  deshabilitarRubros = false;

  constructor(pasosProyectoService: PasosProyectoService,
    private aportanteProyectoLocalService: AportanteProyectoLocalService,
    private pasosHabilitadosLocalService: PasosHabilitadosLocalService) {

    this.pestanaPresupuestoVisible = pasosProyectoService.esPestanaVisible(
      ProyectoMensajes.PASO_PRESUPUESTAL,
      ProyectoMensajes.PESTANA_PRESUPUESTO);
    this.pestanaCofinanciadorVisible = pasosProyectoService.esPestanaVisible(
      ProyectoMensajes.PASO_PRESUPUESTAL,
      ProyectoMensajes.PESTANA_COFINANCIADORES);
  }

  ngOnInit() {
    this.editable = this.pasosHabilitadosLocalService.esEditable(SeccionProyecto.Presupuestal);
    this.aportanteProyectoLocalService.listaAportanteTemporalObservable.subscribe(aportante => {
      const aportantesNoGuardados = aportante.filter(a => !a.aportanteGuardado).length;
      this.deshabilitarRubros = aportantesNoGuardados > 0;
    });
  }

  emitirPasoSiguiente() {
    this.pasoSiguiente.emit();
  }

  emitirPasoAnterior() {
    this.pasoAnterior.emit();
  }
}
