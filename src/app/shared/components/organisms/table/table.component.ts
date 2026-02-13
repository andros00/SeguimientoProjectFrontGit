import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProjectDataService } from 'src/app/shared/services/project/project-data/project-data.service';
import { Router } from '@angular/router';
import { IProject } from 'src/app/core/interfaces/IProject';
import { ProjectSelectionService } from 'src/app/shared/services/project/project-selection/project-selection.service';
import { ProyectoDetalleModalComponent } from '../../modal/proyecto-detalle-modal/proyecto-detalle-modal.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {

  FORMAT_START_URL: string = 'tramitesadministrativos/seguimientoaproyectos/inicioformal';
  SHOW_PROJECT_URL: string = 'tramitesadministrativos/seguimientoaproyecto/verproyecto';

  displayedColumns: string[] = ['code', 'project', 'state', 'projectLevel', 'calls', 'responsable', 'ip', 'projectType', 'actions'];
  projects = new MatTableDataSource<IProject[]>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  get projectsNumber(): number {
    return this.projects.data.length;
  }

  constructor(
    private projectDataService: ProjectDataService,
    private router: Router,
    private projectSelectionService: ProjectSelectionService,
    private dialog: MatDialog
  ) { }

  ngAfterViewInit() {
    this.projects.paginator = this.paginator;
  }

  ngOnInit() {
    this.projectDataService.projects$.subscribe((projects) => {
      if (!projects) {
        this.projects.data = [];
        return;
      }

      this.projects.data = projects.map((project) => ({
        ...project,
        menuItems: [
          {
            icon: 'edit',
            label: 'Realizar inicio formal',
            action: () => this.navegateToFormalStart(project),
          },
          {
            icon: 'visibility',
            label: 'Ver detalle general',
            action: () => this.verDetalle(project),
          },
          {
            icon: 'preview',
            label: 'Ver proyecto',
            action: () => this.navegateToInformacionGeneral(project),
          },
        ],
      }));
    });
  }

  navegateToFormalStart(project: IProject) {
    this.projectSelectionService.selectProject(project);
    localStorage.setItem('selectedProject', JSON.stringify(project));
    this.router.navigate([this.FORMAT_START_URL, project.codigo]);
  }

  verDetalle(project: IProject): void {
    this.dialog.open(ProyectoDetalleModalComponent, {
      width: '900px',
      data: { idProyecto: project.codigo }
    });
  }

   navegateToInformacionGeneral(project: IProject) {
    this.projectSelectionService.selectProject(project);
    localStorage.setItem('selectedProject', JSON.stringify(project));
    this.router.navigate([this.SHOW_PROJECT_URL, project.codigo]);
  }
}
