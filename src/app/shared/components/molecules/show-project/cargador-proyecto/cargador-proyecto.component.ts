import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InformacionGeneralProyecto } from '../informacion-general-proyecto';
import { InformacionGeneralProyectoService } from 'src/app/shared/services/show-project/informacion-general-proyecto.service';
import { CargadorProyectoLocalService } from 'src/app/shared/services/show-project/cargador-proyecto-local.service';
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-cargador-proyecto',
  templateUrl: './cargador-proyecto.component.html',
  styleUrls: ['./cargador-proyecto.component.css'],
  standalone : true,
  imports: [MatProgressSpinner]
})
export class CargadorProyectoComponent implements OnInit {

  constructor(
    private infoGeneralService: InformacionGeneralProyectoService,
    private cargadorProyectoService: CargadorProyectoLocalService,
    private activeRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => this.consularInformacionGeneral(params['proyecto']));
  }

  private consularInformacionGeneral(codigoProyecto: string): void {
    this.infoGeneralService.obtenerInformacionGeneral(codigoProyecto).subscribe(proyecto => this.cargarDatosProyecto(proyecto));
  }

  private cargarDatosProyecto(proyecto: InformacionGeneralProyecto): void {
    this.cargadorProyectoService.cargarProyecto(proyecto, true, false).subscribe(
      _ => this.router.navigate(['/proyecto/'], { queryParams: { estado: 'Editar', soloLectura: true } })
    );
  }

}
