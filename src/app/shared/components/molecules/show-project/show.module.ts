import { NgModule } from '@angular/core';
import { SteeperShowComponent } from './steeper-show/steeper-show.component';
import { SharedModule } from "src/app/shared/shared.module";
import { PasoInformacionGeneralProyectoComponent } from "./paso-informacion-general-proyecto/paso-informacion-general-proyecto.component";
import { CommonModule } from '@angular/common';
import { PasoDescripcionCronogramaProyectoComponent } from './paso-descripcion-cronograma-proyecto/paso-descripcion-cronograma-proyecto.component';
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
import { PasoDocumentosSoporteProyectoComponent } from './paso-documentos-soporte-proyecto/paso-documentos-soporte-proyecto.component';
import { ListaDocumentosSoporteProyectoComponent } from './lista-documentos-soporte-proyecto/lista-documentos-soporte-proyecto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalDinamicoComponent } from './modal-dinamico/modal-dinamico.component';
import { ModalDinamicoInformativoComponent } from './modal-dinamico-informativo/modal-dinamico-informativo.component';
import { ListaInformacionComplementariaComponent } from './lista-informacion-complementaria/lista-informacion-complementaria.component';
import { PasoInformacionComplementariaComponent } from './paso-informacion-complementaria/paso-informacion-complementaria.component';
import { DiagramaActividadComponent } from './diagrama-actividad/diagrama-actividad.component';
import { ContenedorFinanciadorBusquedaProyectoComponent } from './contenedor-financiador-busqueda-proyecto/contenedor-financiador-busqueda-proyecto.component';
import { ResultadoFinanciadorProyectoComponent } from './resultado-financiador-proyecto/resultado-financiador-proyecto.component';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTreeModule } from '@angular/material/tree';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { NgxCurrencyDirective } from 'ngx-currency';
import { ListaDescripcionProyectoComponent } from './lista-descripcion-proyecto/lista-descripcion-proyecto.component';
import { TableComponent } from '../../organisms/table/table.component';
import { SidebarComponent } from '../../organisms/sidebar/sidebar.component';
import { ProjectInfoFormalStartComponent } from '../project-info-formal-start/project-info-formal-start.component';
import { StepperComponent } from '../../organisms/stepper/stepper.component';
import { FiltrosFinanciadorBusquedaComponent } from './filtros-financiador-busqueda/filtros-financiador-busqueda.component';
import { TablaActualizacionProyectoComponent } from './tabla-actualizacion-proyecto/tabla-actualizacion-proyecto.component';
import { PasoActualizacionesProyectoComponent } from './paso-actualizaciones-proyecto/paso-actualizaciones-proyecto.component';
import { ListaEvaluadoresRecomendadosProyectoComponent } from './lista-evaluadores-recomendados-proyecto/lista-evaluadores-recomendados-proyecto.component';
import { PasoEvaluadoresRecomendadosProyectoComponent } from './paso-evaluadores-recomendados-proyecto/paso-evaluadores-recomendados-proyecto.component';
@NgModule({

  declarations: [PasoEvaluadoresRecomendadosProyectoComponent,ListaEvaluadoresRecomendadosProyectoComponent, PasoActualizacionesProyectoComponent,TablaActualizacionProyectoComponent,PasoInformacionGeneralProyectoComponent, ListaCompromisosProyectoComponent, ListaDocumentosSoporteProyectoComponent,
    PasoDocumentosSoporteProyectoComponent, PestanaCompromisosProyectoComponent, TablaCondicionesFormalesComponent,
    PestanaCondicionesFormalesProyectoComponent, PasoCompromisosCondicionesProyectoComponent, TablaParticipantesProyectoComponent, PasoParticipantesProyectoComponent,
    VisorComponentesProyectoComponent, TablaPresupuestoProyectoComponent, PestanaPresupuestoProyectoComponent,
    TablaCofinanciadoresProyectoComponent, PestanaCofinanciadorProyectoComponent, PasoPresupuestalProyectoComponent,
    PestanaDescripcionProyectoComponent, ListaCronogramaProyectoComponent, MensajeExitoErrorComponent,
    PestanaCronogramaProyectoComponent, PasoDescripcionCronogramaProyectoComponent, SteeperShowComponent,
    ModalDinamicoComponent, ModalDinamicoInformativoComponent, ListaInformacionComplementariaComponent,
    PasoInformacionComplementariaComponent, DiagramaActividadComponent, ContenedorFinanciadorBusquedaProyectoComponent,
    ResultadoFinanciadorProyectoComponent, SteeperShowComponent, ListaDescripcionProyectoComponent, FiltrosFinanciadorBusquedaComponent],


  exports: [TableComponent, SidebarComponent, ProjectInfoFormalStartComponent, StepperComponent],
  imports: [SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    MatCardModule,
    MatStepperModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatTabsModule,
    MatCheckboxModule,
    MatTreeModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatInputModule,
    NgxCurrencyDirective

  ]
})
export class ShowModule { }
