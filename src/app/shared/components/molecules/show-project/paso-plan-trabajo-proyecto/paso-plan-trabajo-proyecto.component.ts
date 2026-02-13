import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SeccionProyecto } from '../seccion-proyecto';
import { PasosHabilitadosLocalService } from 'src/app/shared/services/show-project/pasos-habilitados-local.service';

@Component({
  selector: 'app-paso-plan-trabajo-proyecto',
  templateUrl: './paso-plan-trabajo-proyecto.component.html',
  styleUrls: ['./paso-plan-trabajo-proyecto.component.css'],
  standalone: true
})
export class PasoPlanTrabajoProyectoComponent implements OnInit {

  @Output() pasoSiguiente = new EventEmitter<any>();
  @Output() pasoAnterior = new EventEmitter<any>();

  editable = false;

  constructor(private pasosHabilitadosLocalService: PasosHabilitadosLocalService) { }

  ngOnInit() {
    this.editable = this.pasosHabilitadosLocalService.esEditable(SeccionProyecto.PlanTrabajo);
  }

  emitirPasoSiguiente() {
    this.pasoSiguiente.emit();
  }

  emitirPasoAnterior() {
    this.pasoAnterior.emit();
  }
}
