import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';;
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AlertComponent } from './components/atoms/alert/alert.component';
import { InputTextComponent } from './components/atoms/input-text/input-text.component';
import { ButtonSecondaryComponent } from './components/atoms/button-secondary/button-secondary.component';
import { ButtonPrimaryComponent } from './components/atoms/button-primary/button-primary.component';
import { SidebarContentComponent } from './components/molecules/sidebar-content/sidebar-content.component';
import { SidebarComponent } from './components/organisms/sidebar/sidebar.component';
import { DropdownComponent } from './components/atoms/dropdown/dropdown.component';
import { DropdownRequiredComponent } from './components/atoms/dropdown-required/dropdown-required.component';
import { SidebarButtonsComponent } from './components/molecules/sidebar-buttons/sidebar-buttons.component';
import { TableComponent } from './components/organisms/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { ButtonRoundedComponent } from './components/atoms/button-rounded/button-rounded.component';
import { MenuComponent } from './components/atoms/menu/menu.component';
import { PaginationComponent } from './components/atoms/pagination/pagination.component';
import { FooterComponent } from './components/molecules/footer/footer.component';
import { StatusComponent } from './components/atoms/status/status.component';
import { StatusIndicatorComponent } from './components/molecules/status-indicator/status-indicator.component';
import { ProjectInfoFormalStartComponent } from './components/molecules/project-info-formal-start/project-info-formal-start.component';
import { FormalStartGeneralInfoComponent } from './components/molecules/formal-start-general-info/formal-start-general-info.component';
import { DatepickerComponent } from './components/atoms/datepicker/datepicker.component';
import { MatNativeDateModule } from '@angular/material/core';
import { SlideToggleComponent } from './components/atoms/slide-toggle/slide-toggle.component';
import { CheckboxComponent } from './components/atoms/checkbox/checkbox.component';
import { GeneralInfoCardInfoComponent } from './components/molecules/general-info-card-info/general-info-card-info.component';
import { StepperComponent } from './components/organisms/stepper/stepper.component';
import { ContenedorPersonaNaturalComponent } from 'src/app/shared/components/modal/contenedor-persona-natural/contenedor-persona-natural.component'
import { FiltroPersonaNaturalComponent } from './components/modal/filtro-persona-natural/filtro-persona-natural.component';
import { ResultadoPersonaNaturalComponent } from './components/modal/resultado-persona-natural/resultado-persona-natural.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ContenedorInstitucionComponent } from './components/modal/institucion/contenedor-institucion/contenedor-institucion/contenedor-institucion.component';
import { FiltroInstitucionComponent } from './components/modal/institucion/filtro-institucion/filtro-institucion/filtro-institucion.component';
import { ResultadoInstitucionComponent } from './components/modal/institucion/resultado-institucion/resultado-institucion/resultado-institucion.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginator } from '../../app/shared/custom-paginator-intl';
import { ContenedorJinvestigadorComponent } from './components/modal/nuevo-joven-investigador/contenedor-jinvestigador/contenedor-jinvestigador.component';
import { FiltroJinvestigadorComponent } from './components/modal/nuevo-joven-investigador/filtro-jinvestigador/filtro-jinvestigador.component';
import { ResultadoJinvestigadorComponent } from './components/modal/nuevo-joven-investigador/resultado-jinvestigador/resultado-jinvestigador.component';
import { FormalStartParticipantsInfoComponent } from './components/molecules/formal-start-participants-info/formal-start-participants-info.component';
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { JovenInvestigadorComponent } from './components/modal/joven-investigador/joven-investigador.component';
import { ParticipantFormComponent } from './components/modal/participante/participant-form/participant-form.component';
import { FormalStartMandatoryComponent } from './components/molecules/formal-start-mandatory/formal-start-mandatory/formal-start-mandatory.component';
import { FormalStartStageComponent } from './components/molecules/formal-start-stage/formal-start-stage.component';
import { EtapaModalComponent } from './components/modal/etapa-modal/etapa-modal.component';
import { ActividadComponent } from './components/modal/actividad/actividad/actividad.component';
import { FormalStartMinutesComponent } from './components/molecules/formal-start-minutes/formal-start-minutes.component';
import { ContenedorProyectoComponent } from './components/molecules/show-project/contenedor-proyecto/contenedor-proyecto.component';


@NgModule({
  declarations: [
    AlertComponent,
    InputTextComponent,
    ButtonSecondaryComponent,
    ButtonPrimaryComponent,
    SidebarContentComponent,
    SidebarComponent,
    DropdownComponent,
    DropdownRequiredComponent,
    SidebarButtonsComponent,
    TableComponent,
    ButtonRoundedComponent,
    PaginationComponent,
    FooterComponent,
    StatusComponent,
    StatusIndicatorComponent,
    ProjectInfoFormalStartComponent,
    StepperComponent,
    FormalStartGeneralInfoComponent,
    DatepickerComponent,
    SlideToggleComponent,
    CheckboxComponent,
    GeneralInfoCardInfoComponent,
    ContenedorPersonaNaturalComponent,
    FiltroPersonaNaturalComponent,
    ResultadoPersonaNaturalComponent,
    ContenedorInstitucionComponent,
    FiltroInstitucionComponent,
    ResultadoInstitucionComponent,
    ContenedorJinvestigadorComponent,
    FiltroJinvestigadorComponent,
    ResultadoJinvestigadorComponent,
    FormalStartParticipantsInfoComponent,
    JovenInvestigadorComponent,
    ParticipantFormComponent,
    FormalStartMandatoryComponent,
    FormalStartStageComponent,
    EtapaModalComponent,
    ActividadComponent,
    FormalStartMinutesComponent,


  ],
  exports: [
    MatIconModule,
    MatIconModule,
    MatButtonModule,
    SidebarComponent,
    TableComponent,
    FooterComponent,
    StepperComponent,
    ProjectInfoFormalStartComponent,
    ContenedorInstitucionComponent,
    FiltroInstitucionComponent,
    ResultadoInstitucionComponent,

  ], imports: [CommonModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    NgFor,
    MatInputModule,
    FormsModule,
    MatSidenavModule,
    MatPaginatorModule,
    NgIf,
    MatCardModule,
    MatTableModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatCheckboxModule, MenuComponent, MatProgressSpinnerModule,
    MatDialogModule, MatTab, MatTabGroup], providers: [
      [provideHttpClient(withInterceptorsFromDi())],
      { provide: MatPaginatorIntl, useValue: CustomPaginator() }
    ]
})
export class SharedModule { }
