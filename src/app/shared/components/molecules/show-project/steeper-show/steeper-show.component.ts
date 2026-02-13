import { Component, Injector, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper, MatStep } from '@angular/material/stepper';
import { PasoInformacionGeneralProyectoComponent } from '../paso-informacion-general-proyecto/paso-informacion-general-proyecto.component';
import { ActualizacionProyecto } from '../actualizacion-proyecto';
import { PasoActualizacionesProyectoComponent } from '../paso-actualizaciones-proyecto/paso-actualizaciones-proyecto.component';
import { PasoInformacionComplementariaComponent } from '../paso-informacion-complementaria/paso-informacion-complementaria.component';
import { PasoDescripcionCronogramaProyectoComponent } from '../paso-descripcion-cronograma-proyecto/paso-descripcion-cronograma-proyecto.component';
import { PasoPresupuestalProyectoComponent } from '../paso-presupuestal-proyecto/paso-presupuestal-proyecto.component';
import { PasoParticipantesProyectoComponent } from '../paso-participantes-proyecto/paso-participantes-proyecto.component';
import { PasoEvaluadoresRecomendadosProyectoComponent } from '../paso-evaluadores-recomendados-proyecto/paso-evaluadores-recomendados-proyecto.component';
import { PasoCompromisosCondicionesProyectoComponent } from '../paso-compromisos-condiciones-proyecto/paso-compromisos-condiciones-proyecto.component';
import { PasoDocumentosSoporteProyectoComponent } from '../paso-documentos-soporte-proyecto/paso-documentos-soporte-proyecto.component';


@Component({
  selector: 'app-steeper-show',
  templateUrl: './steeper-show.component.html',
  styleUrl: './steeper-show.component.scss'
})
export class SteeperShowComponent {

  isLinear = false;
  steps: any[] = [];

   //steps: FormGroup;

  @Input() projectCode!: string;

  @ViewChild('stepper') stepper!: MatStepper;

  constructor(
    private _formBuilder: FormBuilder,
    private injector: Injector) { }

  ngOnInit() {
    this.initializeSteps();
  }

  createInjector(): Injector {
    return Injector.create({
      providers: [{ provide: 'projectCode', useValue: this.projectCode }],
      parent: this.injector
    });
  }

  initializeSteps() {
    this.steps = [
      {
        label: 'Información general',
        formGroup: this._formBuilder.group({ infoCtrl: ['', Validators.required] }),
        component: PasoInformacionGeneralProyectoComponent,
        injector: this.createInjector()
      },
      {
        label: 'Actualización',
        formGroup: this._formBuilder.group({ participantsCtrl: ['', Validators.required] }),
        component: PasoActualizacionesProyectoComponent,
        controlName: 'participantsCtrl', injector: this.createInjector()
      },
      {
        label: 'Información complementaria',
        formGroup: this._formBuilder.group({ commitmentsCtrl: ['', Validators.required] }),
        component: PasoInformacionComplementariaComponent,
        controlName: 'commitmentsCtrl', injector: this.createInjector()
      },
      {
        label: 'Descripción cronograma',
        formGroup: this._formBuilder.group({ stagesCtrl: ['', Validators.required] }),
        component: PasoDescripcionCronogramaProyectoComponent,
        controlName: 'stagesCtrl', injector: this.createInjector()
      },
      {
        label: 'Presupuestal',
        formGroup: this._formBuilder.group({ startDocCtrl: ['', Validators.required] }),
        component: PasoPresupuestalProyectoComponent,
        controlName: 'startDocCtrl', injector: this.createInjector()
      },
      {
        label: 'Participantes',
        formGroup: this._formBuilder.group({ supportDocCtrl: ['', Validators.required] }),
        component: PasoParticipantesProyectoComponent,
        controlName: 'supportDocCtrl'
      },
      {
        label: 'Evaluadores recomendados',
        formGroup: this._formBuilder.group({ closeCtrl: ['', Validators.required] }),
        component: PasoEvaluadoresRecomendadosProyectoComponent,
        controlName: 'closeCtrl'
      },
      {
        label: 'Compromisos y condiciones',
        formGroup: this._formBuilder.group({ closeCtrl: ['', Validators.required] }),
        component: PasoCompromisosCondicionesProyectoComponent,
        controlName: 'closeCtrl'
      },
      {
        label: 'Documento soporte',
        formGroup: this._formBuilder.group({ closeCtrl: ['', Validators.required] }),
        component: PasoDocumentosSoporteProyectoComponent,
        controlName: 'closeCtrl'
      }
    ];
  }

  goToNextStep() {
    if (this.stepper) {
      console.log('datos del siguiente step' + this.stepper);
      this.stepper.next();
    }
  }

  goToPreviousStep() {
    if (this.stepper) {
      this.stepper.previous();
    }
  }


}
