import { Component, Input, OnInit } from '@angular/core';
import { AlertaMensaje } from '../mensaje-exito-error/alerta-mensaje';
import { CompromisosProyectoLocalService } from 'src/app/shared/services/show-project/compromisos-proyecto-local.service';
import { CompromisosProyectoService } from 'src/app/shared/services/show-project/compromisos-proyecto.service';
import { PasosHabilitadosLocalService } from 'src/app/shared/services/show-project/pasos-habilitados-local.service';
import { ProyectoLocalService } from 'src/app/shared/services/show-project/proyecto-local.service';
import { AlertaLocalService } from 'src/app/shared/services/show-project/alerta-local.service';
import { CompromisoProyecto } from '../compromiso-proyecto';
import { ConstantesExitoError } from '../mensaje-exito-error/constantes-exito-error';

const MENSAJE_EXITO = 'Compromisos del proyecto guardados con éxito.';
const MENSAJE_ERROR = 'Ocurrió un error guardando los compromisos del proyecto.';

@Component({
  selector: 'app-pestana-compromisos-proyecto',
  templateUrl: './pestana-compromisos-proyecto.component.html',
  styleUrls: ['./pestana-compromisos-proyecto.component.css']
})
export class PestanaCompromisosProyectoComponent implements OnInit {

  readonly tipoCompromisoObligatorio = 'Obligatorio';
  readonly tipoCompromisoObligatorioDB = 'b';


  @Input() editable: boolean;

  mostrarComponentes: boolean;

  constructor(private compromisosServicioLocal: CompromisosProyectoLocalService,
    private compromisosServicio: CompromisosProyectoService,
    private pasosHabilitadosLocalService: PasosHabilitadosLocalService,
    private proyectoLocalServicio: ProyectoLocalService, private alertaServicioLocal: AlertaLocalService) { }

  ngOnInit() {
    const proyecto = this.proyectoLocalServicio.obtenerInformacionGeneralProyecto();
    const esMacroproyecto = proyecto.tipoProyectoMacro;
    this.mostrarComponentes = this.pasosHabilitadosLocalService.esSoloLectura() && (!!esMacroproyecto && esMacroproyecto === 1);
  }

  guardarCompromisos() {
    // Guardado deshabilitado en modo solo lectura.
    console.warn('guardarCompromisos deshabilitado (solo lectura)');
  }

  irAIdeas(url: string) {
      window.open(url,"_blank");
    }

}
