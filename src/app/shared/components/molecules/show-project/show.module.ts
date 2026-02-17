import { NgModule } from '@angular/core';
import { ArchwizardModule } from 'angular-archwizard';
import { SteeperShowComponent } from './steeper-show/steeper-show.component';
import { SharedModule } from "src/app/shared/shared.module";
import { PasoInformacionGeneralProyectoComponent } from "./paso-informacion-general-proyecto/paso-informacion-general-proyecto.component";
import { MatCardContent, MatCard } from "@angular/material/card";
import { MatStepper, MatStep } from "@angular/material/stepper";
import { MatDivider } from "@angular/material/divider";
import { CommonModule } from '@angular/common';
import { MatIcon } from "@angular/material/icon";
import { MatMenu } from "@angular/material/menu";
import { MatFormField, MatLabel, MatError, MatHint } from "@angular/material/form-field";
import { MatSelect, MatOption } from "@angular/material/select";
import { MatRadioGroup, MatRadioButton } from "@angular/material/radio";
import { MatAutocomplete } from "@angular/material/autocomplete";
import { MatSlideToggle } from "@angular/material/slide-toggle";
import { PasoActualizacionesProyectoComponent } from './paso-actualizaciones-proyecto/paso-actualizaciones-proyecto.component';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from "@angular/material/expansion";
import { PasoDescripcionCronogramaProyectoComponent } from './paso-descripcion-cronograma-proyecto/paso-descripcion-cronograma-proyecto.component';
import { MatTabGroup, MatTab } from "@angular/material/tabs";
import { PestanaCronogramaProyectoComponent } from './pestana-cronograma-proyecto/pestana-cronograma-proyecto.component';
import { MensajeExitoErrorComponent } from './mensaje-exito-error/mensaje-exito-error.component';
import { ListaCronogramaProyectoComponent } from './lista-cronograma-proyecto/lista-cronograma-proyecto.component';
import { PestanaDescripcionProyectoComponent } from './pestana-descripcion-proyecto/pestana-descripcion-proyecto.component';
import { PasoPresupuestalProyectoComponent } from './paso-presupuestal-proyecto/paso-presupuestal-proyecto.component';
import { PestanaCofinanciadorProyectoComponent } from './pestana-cofinanciador-proyecto/pestana-cofinanciador-proyecto.component';
import { TablaCofinanciadoresProyectoComponent } from './tabla-cofinanciadores-proyecto/tabla-cofinanciadores-proyecto.component';
import { PestanaPresupuestoProyectoComponent } from './pestana-presupuesto-proyecto/pestana-presupuesto-proyecto.component';
import { TablaPresupuestoProyectoComponent } from './tabla-presupuesto-proyecto/tabla-presupuesto-proyecto.component';
import { VisorComponentesProyectoComponent } from './visor-componentes-proyecto/visor-componentes-proyecto.component';
import { PasoParticipantesProyectoComponent } from './paso-participantes-proyecto/paso-participantes-proyecto.component';
import { TablaParticipantesProyectoComponent } from './tabla-participantes-proyecto/tabla-participantes-proyecto.component';
import { PasoCompromisosCondicionesProyectoComponent } from './paso-compromisos-condiciones-proyecto/paso-compromisos-condiciones-proyecto.component';
import { PestanaCondicionesFormalesProyectoComponent } from './pestana-condiciones-formales-proyecto/pestana-condiciones-formales-proyecto.component';
import { TablaCondicionesFormalesComponent } from './tabla-condiciones-formales/tabla-condiciones-formales.component';
import { PestanaCompromisosProyectoComponent } from './pestana-compromisos-proyecto/pestana-compromisos-proyecto.component';
import { ListaCompromisosProyectoComponent } from './lista-compromisos-proyecto/lista-compromisos-proyecto.component';
import { MatCheckbox } from "@angular/material/checkbox";
import { PasoDocumentosSoporteProyectoComponent } from './paso-documentos-soporte-proyecto/paso-documentos-soporte-proyecto.component';
import { ListaDocumentosSoporteProyectoComponent } from './lista-documentos-soporte-proyecto/lista-documentos-soporte-proyecto.component';

@NgModule({

  declarations: [ListaDocumentosSoporteProyectoComponent, PasoDocumentosSoporteProyectoComponent, ListaCompromisosProyectoComponent, PestanaCompromisosProyectoComponent, TablaCondicionesFormalesComponent, PestanaCondicionesFormalesProyectoComponent, PasoCompromisosCondicionesProyectoComponent, TablaParticipantesProyectoComponent, PasoParticipantesProyectoComponent, VisorComponentesProyectoComponent, TablaPresupuestoProyectoComponent, PestanaPresupuestoProyectoComponent,
    TablaCofinanciadoresProyectoComponent, PestanaCofinanciadorProyectoComponent, PasoPresupuestalProyectoComponent,
    PestanaDescripcionProyectoComponent, ListaCronogramaProyectoComponent, MensajeExitoErrorComponent,
    PestanaCronogramaProyectoComponent, PasoDescripcionCronogramaProyectoComponent, SteeperShowComponent,
    PasoInformacionGeneralProyectoComponent, PasoActualizacionesProyectoComponent],

  exports: [],
  imports: [SharedModule, MatCardContent, MatCard, MatStepper, MatStep, MatDivider, CommonModule, MatIcon, MatMenu,
    MatFormField, MatLabel, MatSelect, MatOption, MatError, MatRadioGroup, MatRadioButton, MatAutocomplete,
    MatSlideToggle, MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatTabGroup, MatTab,
    MatHint, MatCheckbox]
})
export class ShowModule { }
