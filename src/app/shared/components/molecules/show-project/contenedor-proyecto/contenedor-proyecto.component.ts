import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Paso } from '../paso';
import { PasosProyectoFormulario } from '../pasos-proyecto-formulario';
import { PasosProyectoService } from 'src/app/shared/services/show-project/pasos-proyecto.service';
import { InformacionGeneralProyecto } from '../informacion-general-proyecto';
import { ProyectoLocalService } from 'src/app/shared/services/show-project/proyecto-local.service';
import { MatIcon } from "@angular/material/icon";
import { CommonModule } from '@angular/common';
import { WizardModule , WizardComponent } from 'angular-archwizard';
import { PasoInformacionGeneralProyectoComponent } from '../paso-informacion-general-proyecto/paso-informacion-general-proyecto.component';
import { PasoActualizacionesProyectoComponent } from '../paso-actualizaciones-proyecto/paso-actualizaciones-proyecto.component';
import { PasoInformacionComplementariaComponent } from '../paso-informacion-complementaria/paso-informacion-complementaria.component';
import { PasoDescripcionCronogramaProyectoComponent } from '../paso-descripcion-cronograma-proyecto/paso-descripcion-cronograma-proyecto.component';
import { PasoPresupuestalProyectoComponent } from '../paso-presupuestal-proyecto/paso-presupuestal-proyecto.component';
import { PasoComponenteProyectoComponent } from '../paso-componente-proyecto/paso-componente-proyecto.component';
import { PasoPlanTrabajoProyectoComponent } from '../paso-plan-trabajo-proyecto/paso-plan-trabajo-proyecto.component';
import { PasoParticipantesProyectoComponent } from '../paso-participantes-proyecto/paso-participantes-proyecto.component';
import { PasoEvaluadoresRecomendadosProyectoComponent } from '../paso-evaluadores-recomendados-proyecto/paso-evaluadores-recomendados-proyecto.component';
import { PasoCompromisosCondicionesProyectoComponent } from '../paso-compromisos-condiciones-proyecto/paso-compromisos-condiciones-proyecto.component';
import { PasoDocumentosSoporteProyectoComponent } from '../paso-documentos-soporte-proyecto/paso-documentos-soporte-proyecto.component';
import { PasoPublicarProyectoComponent } from '../paso-publicar-proyecto/paso-publicar-proyecto.component';


@Component({
  selector: 'app-contenedor-proyecto',
  templateUrl: './contenedor-proyecto.component.html',
  styleUrls: ['./contenedor-proyecto.component.css'],
  standalone: true,
  imports:[CommonModule,
    PasoInformacionGeneralProyectoComponent,
    PasoActualizacionesProyectoComponent,
    PasoInformacionComplementariaComponent,
    PasoDescripcionCronogramaProyectoComponent,
    PasoPresupuestalProyectoComponent,
    PasoComponenteProyectoComponent,
    PasoPlanTrabajoProyectoComponent,
    PasoParticipantesProyectoComponent,
    PasoEvaluadoresRecomendadosProyectoComponent,
    PasoCompromisosCondicionesProyectoComponent,
    PasoDocumentosSoporteProyectoComponent,
    PasoPublicarProyectoComponent
   ]

})
export class ContenedorProyectoComponent implements OnInit {

  @ViewChild('wizardProyecto', { static: true })
  public wizard!: WizardComponent;

  pasos: PasosProyectoFormulario;
  informacionGeneralProyecto!: InformacionGeneralProyecto;
  inhabilitarNavegacion = false;
  soloLectura = false;
  paraActualizacion = false;

  constructor(
    private pasosService: PasosProyectoService,
    private proyectoLocalServicio: ProyectoLocalService,
    private activeRoute: ActivatedRoute) {

    this.pasos = this.pasosService.inicializarPasos();
    this.proyectoLocalServicio.observableProyectoGuardado().subscribe(
      _ => this.informacionGeneralProyecto = this.proyectoLocalServicio.obtenerInformacionGeneralProyecto());
  }

  ngOnInit() {
    this.soloLectura = this.activeRoute.snapshot.queryParams.soloLectura === 'true';
    this.paraActualizacion = this.activeRoute.snapshot.queryParams.paraActualizacion === 'true';
  }

  inhabilitarSiguiente() {
    this.inhabilitarNavegacion = true;
  }

  habilitarSiguiente() {
    this.inhabilitarNavegacion = false;
  }

  irAtras() {
    this.wizard.model.navigationMode.goToPreviousStep();
  }

  irAdelante() {
    this.wizard.model.navigationMode.goToNextStep();
  }

  esPasoActual(paso: Paso): boolean {
    return !!paso && this.wizard.model.currentStepIndex === paso.numero - 1;
  }

  mostrarPaso(paso: Paso): boolean {
    return !!paso && paso.visible;
  }

  getEstadoProyecto() {
    if (!!this.informacionGeneralProyecto && !!this.informacionGeneralProyecto.estado) {
      return ` - ${this.informacionGeneralProyecto.estado}`;
    }

    return '';
  }

  esProyectoGuardado(): boolean {
    return !!this.informacionGeneralProyecto && !!this.informacionGeneralProyecto.codigo;
  }

  cerrar() {
    window.close();
  }
}
