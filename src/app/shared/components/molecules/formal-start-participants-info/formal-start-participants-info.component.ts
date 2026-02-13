import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ParticipantService } from 'src/app/shared/services/project/participant/participant.service';
import { IProjectParticipantDTO } from 'src/app/core/interfaces/IPojectParticipantDTO';
import { ParticipantRoleService } from 'src/app/shared/services/project/participant-role/participant-role.service';
import { ParticipantGroupService } from 'src/app/shared/services/project/participant-group/participant-group.service';
import { ParticipantFormComponent } from '../../modal/participante/participant-form/participant-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from "@angular/material/icon";
import { MenuComponent } from '../../atoms/menu/menu.component';
import { JovenInvestigadorComponent } from "../../modal/joven-investigador/joven-investigador.component";
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { MatDivider } from "@angular/material/divider";
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-formal-start-participants-info',
  templateUrl: './formal-start-participants-info.component.html',
  styleUrls: ['./formal-start-participants-info.component.css'],
  // standalone: true,
  // imports: [CommonModule, MatTableModule, MatPaginatorModule, MenuComponent, JovenInvestigadorComponent, MatTab, MatTabGroup, MatDividerModule],
})
export class FormalStartParticipantsInfoComponent implements OnInit {
  displayedColumns: string[] = [
    'fullName',
    'rolParticipant',
    'startDate',
    'group',
    'dedication',
    'dedicationPlan',
    'supportedProgramCode',
    'actions'
  ];

  participants = new MatTableDataSource<IProjectParticipantDTO>([]);
  noParticipants = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    @Inject('projectCode') public projectCode: string,
    private participantService: ParticipantService,
    private participantRoleService: ParticipantRoleService,
    private participantGroupService: ParticipantGroupService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.loadParticipants();
  }


  ngAfterViewInit() {
    this.participants.paginator = this.paginator;
  }

  loadParticipants(): void {
    this.participantService
      .getParticipantsByProjectCode(this.projectCode)
      .subscribe({
        next: (data) => {
          console.log('**data**'+data.values());
           if (data && data.length > 0) {
            // Aquí agregamos el menú a cada participante
            this.participants.data = data.map((participant) => ({
              ...participant,
              menuItems: [
                {
                  icon: 'edit',
                  label: 'Editar participante',
                  action: () => this.abrirActualizarParticipante(participant),
                },
              ],
            }));
            this.noParticipants = false;

          } else {
            this.noParticipants = true;
            this.participants.data = [];
          }
        },
        error: (err) => {
          console.error('Error fetching participants', err);
        },
      });
  }

  get participantsNumber(): number {
    return this.participants.data.length;
  }



  /**
   * Refresca la tabla con los cambios
   */
  private refreshTable(lista: IProjectParticipantDTO[]): void {
    this.participants.data = [...lista]; // importante clonar para disparar detección de cambios
  }

  abrirActualizarParticipante(participante: IProjectParticipantDTO) {
    const dialogRef = this.dialog.open(ParticipantFormComponent, {
      width: '960px',
      maxHeight: '90vh',
      data: {
        // proyecto: this.proyectoSeleccionado,
        participante
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Buscar participante y actualizarlo dentro del dataSource
        const index = this.participants.data.findIndex(p => p.identificador === participante.identificador);
        if (index !== -1) {
          this.participants.data[index] = { ...this.participants.data[index], ...result };
          // Importante: notificar al MatTable que los datos cambiaron
          this.participants._updateChangeSubscription();
          this. loadParticipants();
        }
      }
    });
  }
}
