import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EtapaProyectoDTO } from 'src/app/core/interfaces/EtapaProyectoDTO';
import { EtapaProyectoService } from 'src/app/shared/services/project/etapa/etapa-proyecto.service';
import { EtapaModalComponent } from '../../modal/etapa-modal/etapa-modal.component';
import { MatDivider } from "@angular/material/divider";
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from "@angular/material/icon";
import { ActividadComponent } from '../../modal/actividad/actividad/actividad.component';
import { MatTabsModule, MatTabGroup, MatTab } from '@angular/material/tabs';

@Component({
  selector: 'app-formal-start-stage',
  // standalone: true,
  // imports: [ReactiveFormsModule, CommonModule, MatExpansionModule, EtapaModalComponent, ActividadComponent, MatTabGroup, MatTab],
  templateUrl: './formal-start-stage.component.html',
  styleUrl: './formal-start-stage.component.scss'
})
export class FormalStartStageComponent {

  etapas: EtapaProyectoDTO[] = [];

  constructor(
     @Inject('projectCode') public projectCode: string
  ) { }

}
