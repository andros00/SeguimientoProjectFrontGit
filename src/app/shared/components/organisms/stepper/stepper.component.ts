import { Component, Input, ViewChild, Injector } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { FormBuilder, Validators } from '@angular/forms';
import { FormalStartGeneralInfoComponent } from '../../molecules/formal-start-general-info/formal-start-general-info.component';
import { FormalStartParticipantsInfoComponent } from '../../molecules/formal-start-participants-info/formal-start-participants-info.component';
import { FormalStartMandatoryComponent } from '../../molecules/formal-start-mandatory/formal-start-mandatory/formal-start-mandatory.component';
import { FormalStartStageComponent } from '../../molecules/formal-start-stage/formal-start-stage.component';
import { JovenInvestigadorComponent } from '../../modal/joven-investigador/joven-investigador.component';
import { FormalStartMinutesComponent } from '../../molecules/formal-start-minutes/formal-start-minutes.component';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent {
  isLinear = false;
  steps: any[] = [];

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
        component: FormalStartGeneralInfoComponent,
        injector: this.createInjector()
      },
      {
        label: 'Participantes / Joven Invest.',
        formGroup: this._formBuilder.group({ participantsCtrl: ['', Validators.required] }),
        component: FormalStartParticipantsInfoComponent,
        controlName: 'participantsCtrl', injector: this.createInjector()
      },
      {
        label: 'Compromisos',
        formGroup: this._formBuilder.group({ commitmentsCtrl: ['', Validators.required] }),
        component: FormalStartMandatoryComponent,
        controlName: 'commitmentsCtrl', injector: this.createInjector()
      },
      {
        label: 'Etapas / Actividades',
        formGroup: this._formBuilder.group({ stagesCtrl: ['', Validators.required] }),
        component: FormalStartStageComponent,
        controlName: 'stagesCtrl', injector: this.createInjector()
      },
      {
        label: 'Generar acta de Inicio',
        formGroup: this._formBuilder.group({ startDocCtrl: ['', Validators.required] }),
        component: FormalStartMinutesComponent,
        controlName: 'startDocCtrl', injector: this.createInjector()
      },
      {
        label: 'Documento soporte',
        formGroup: this._formBuilder.group({ supportDocCtrl: ['', Validators.required] }),
        controlName: 'supportDocCtrl'
      },
      {
        label: 'Cerrar Inicio Formal',
        formGroup: this._formBuilder.group({ closeCtrl: ['', Validators.required] }),
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
