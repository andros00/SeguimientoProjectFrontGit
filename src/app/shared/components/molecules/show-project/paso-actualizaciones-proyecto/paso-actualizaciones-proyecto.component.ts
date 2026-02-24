import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SeccionProyecto } from '../seccion-proyecto';
import { ActualizacionProyecto } from '../actualizacion-proyecto';
import { ActualizacionProyectoLocalService } from 'src/app/shared/services/show-project/actualizacion-proyecto-local.service';
import { PasosHabilitadosLocalService } from 'src/app/shared/services/show-project/pasos-habilitados-local.service';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from "@angular/material/expansion";
import { MatIcon } from "@angular/material/icon";
import { MatMenu } from "@angular/material/menu";
import { CommonModule } from '@angular/common';
//import { EditarActualizacionesProyectoComponent } from '../editar-actualizaciones-proyecto/editar-actualizaciones-proyecto.component';

@Component({
  selector: 'app-paso-actualizaciones-proyecto',
  templateUrl: './paso-actualizaciones-proyecto.component.html',
  styleUrls: ['./paso-actualizaciones-proyecto.component.css'],
  standalone: true,
  imports: [CommonModule,MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatIcon, MatMenu],
})
export class PasoActualizacionesProyectoComponent implements OnInit {

  @Output() pasoSiguiente = new EventEmitter<any>();
  @Output() pasoAnterior = new EventEmitter<any>();

  editable = false;
  actualizacionActual: ActualizacionProyecto = {} as ActualizacionProyecto;

  constructor(private modal: MatDialog,
    private pasosHabilitadosLocalService: PasosHabilitadosLocalService,
    private actualizacionProyectoServicioLocal: ActualizacionProyectoLocalService) {
    this.actualizacionProyectoServicioLocal.actualizacionVigenteObservable.subscribe(
      actualizacion => {
        this.actualizacionActual = actualizacion;
      }
    );
  }

  ngOnInit() {
    this.editable = this.pasosHabilitadosLocalService.esEditable(SeccionProyecto.Actualizacion);
  }

  editarActualizacion() {
    // this.modal.open(EditarActualizacionesProyectoComponent, {
    //   data: this.actualizacionActual
    // });

  }

  emitirPasoSiguiente() {
    this.pasoSiguiente.emit();
  }

  emitirPasoAnterior() {
    this.pasoAnterior.emit();
  }


}
