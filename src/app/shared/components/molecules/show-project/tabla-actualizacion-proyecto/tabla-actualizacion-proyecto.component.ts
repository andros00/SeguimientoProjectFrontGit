import { Component, OnInit } from '@angular/core';
import { ActualizacionProyecto } from '../actualizacion-proyecto';
import { ProyectoLocalService } from 'src/app/shared/services/show-project/proyecto-local.service';
import { InformacionGeneralProyecto } from '../informacion-general-proyecto';
import { DatePipe } from '@angular/common';
import { ActualizacionProyectoLocalService } from 'src/app/shared/services/show-project/actualizacion-proyecto-local.service';

@Component({
  selector: 'app-tabla-actualizacion-proyecto',
  templateUrl: './tabla-actualizacion-proyecto.component.html',
  styleUrls: ['./tabla-actualizacion-proyecto.component.css'],
  providers: [DatePipe]
})
export class TablaActualizacionProyectoComponent implements OnInit {

  readonly fechaInvalida = '-1';
  readonly formatoFechaCorta = 'dd-MM-yyyy';

  encabezado: string = '';
  proyecto: InformacionGeneralProyecto = {} as InformacionGeneralProyecto;
  actualizaciones: ActualizacionProyecto[] = [];

  constructor(private actualizacionProyectoLocalService: ActualizacionProyectoLocalService,
    private proyectoLocalService: ProyectoLocalService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.proyecto = this.proyectoLocalService.obtenerInformacionGeneralProyecto();
    this.actualizacionProyectoLocalService.listaActualizacionesObservable.subscribe(
      actualizaciones => this.actualizaciones = actualizaciones
    );
    this.asignarEncabezado();
  }

  mostrarDetalle(actualizacionProyecto: ActualizacionProyecto) {
    actualizacionProyecto.mostrarDetalle = !actualizacionProyecto.mostrarDetalle;
  }

  private asignarEncabezado() {
    this.encabezado = `${this.proyecto.codigo} - `
      + `${this.proyecto.nombreCorto} - ${this.proyecto.estado}`;
  }

  autorizador(actualizacion: ActualizacionProyecto): string {
    if (!!actualizacion.evaluacionTecnica && !!actualizacion.evaluacionTecnica.instanciaEvaluadora) {
      return actualizacion.evaluacionTecnica.instanciaEvaluadora.nombre;
    }
    if (!!actualizacion.evaluacionCientifica) {
      return actualizacion.evaluacionCientifica.solicitanteEvaluacion.instanciaAdministrativa.nombre;
    }
    return '';
  }

  formatearFechaCorta(fecha: string): string {
    if (!fecha || fecha === this.fechaInvalida) {
      return '';
    }
      return ''
    // return this.datePipe.transform(Number(fecha), this.formatoFechaCorta);
  }
}
