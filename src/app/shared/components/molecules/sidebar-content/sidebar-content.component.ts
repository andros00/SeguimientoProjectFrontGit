import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { ProjectTypeService } from 'src/app/shared/services/shared/project-type/project-type.service';
import { AdministrativeCenterService } from 'src/app/shared/services/shared/administrative-center/administrative-center.service';
import { FilterProcessSelectionService } from 'src/app/shared/services/admin/filterProcessSelection/filter-process-selection.service';
import { StatusByUserService } from 'src/app/shared/services/project/status/status-by-user.service';
import { AnnouncementService } from 'src/app/shared/services/announcement/announcement/announcement.service';
import { FilterService } from 'src/app/shared/services/project/filter/filter.service';
import { ProjectDataService } from 'src/app/shared/services/project/project-data/project-data.service';
import { IProject } from 'src/app/core/interfaces/IProject';

@Component({
  selector: 'app-sidebar-content',
  templateUrl: './sidebar-content.component.html',
  styleUrls: ['./sidebar-content.component.scss']
})
export class SidebarContentComponent implements OnInit {
  form!: FormGroup;
  options$: { [key: string]: Observable<{ value: string | number; tag: string; }[]> } = {};

  constructor(
    private fb: FormBuilder,
    private projectTypeSvc: ProjectTypeService,
    private administrativeCenterSvc: AdministrativeCenterService,
    private filterProcessSelectionSvc: FilterProcessSelectionService,
    private statusByUserSvc: StatusByUserService,
    private announcementSvc: AnnouncementService,
    private filterService: FilterService,
    private projectDataService: ProjectDataService
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadOptions();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      codigo: [''],
      idCentroGestion: [null, Validators.required],
      estado: [''],
      convocatoria: [''],
      procesoSeleccion: [''],
      tipoProyecto: [''],

    });
  }

  private loadOptions(): void {
    this.options$ = {
      projectType: this.fetchOptions(this.projectTypeSvc.getAll(0, 10), 'id', 'name'),
      administrativeCenter: this.fetchOptions(this.administrativeCenterSvc.getAll(0, 200), 'id', 'shortName'),
      announcement: this.fetchOptions(this.announcementSvc.getAll(0, 200), 'id', 'name'),
      selectionProcess: this.fetchOptions(this.filterProcessSelectionSvc.getAll(0, 200), 'id', 'name'),
      statusByUser: this.fetchOptions(this.statusByUserSvc.getAllByUser(0, 10), 'id', 'shortName'),
    };
  }

  private fetchOptions(
    observable$: Observable<any[]>,
    valueKey: string | null,
    tagKey: string | null,
    isDirectMapping: boolean = false
  ): Observable<{ value: string | number; tag: string; }[]> {
    return observable$.pipe(
      map(response =>
        response.map(item => ({
          value: isDirectMapping ? item : item[valueKey!],
          tag: isDirectMapping ? item : item[tagKey!]
        }))
      )
    );
  }

  /*   onSubmit(): void {
      const formValues = this.form.value;

      this.filterService.filter(
        0,
        25,
        formValues.administrativeCenter,
        formValues.projectCode,
        formValues.status,
        formValues.announcement,
        formValues.selectionProcess,
        formValues.projectType
      ).subscribe(
        response => {
          this.projectDataService.setProjects(response);
        },
        error => {
          console.error('Error fetching filtered projects', error);
        }
      );
    }
   */
  onClearFilters(): void {
    this.form.reset();
  }

  consultar(): void {

    /*   if (this.formBusqueda.valid) {
     */
    const filtros: IProject = this.form.value;
    //this.loadingService.show();

    this.filterService.consultarProyectos(filtros).subscribe({
      next: (data) => {
        this.projectDataService.setProjects(data);
/*         this.dataSource.data = data;
        this.totalRegistros = data.length;
        this.loadingService.hide();
 */      },
      error: (err) => {
        console.error('Error al consultar proyectos:', err);
        //this.loadingService.hide();
      },
    });
/*   }
 */  }

}
