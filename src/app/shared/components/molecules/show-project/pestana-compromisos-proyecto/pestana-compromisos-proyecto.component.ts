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
    const mensaje = new AlertaMensaje();
    let listaCompromisos: CompromisoProyecto[];
    listaCompromisos = this.compromisosServicioLocal.obtenerListaCompromisosObligatorios();
    listaCompromisos = listaCompromisos.concat(this.compromisosServicioLocal.obtenerListaCompromisosOpcionales());
    const listaCompromisosObligatorios = [];
    const listaCompromisosOpcionales = [];
    this.compromisosServicio.guardarCompromisos(listaCompromisos).subscribe(
      compromisosGuardados => {
        compromisosGuardados.forEach(compromiso => {
          if (!!compromiso.compromiso && (compromiso.compromiso.tipoCompromiso === this.tipoCompromisoObligatorio ||
            compromiso.compromiso.tipoCompromiso === this.tipoCompromisoObligatorioDB)) {
            listaCompromisosObligatorios.push(compromiso);
          } else {
            listaCompromisosOpcionales.push(compromiso);
          }
        });
        this.compromisosServicioLocal.agregarListaCompromisosObligatorios(listaCompromisosObligatorios);
        this.compromisosServicioLocal.agregarListaCompromisosOpcionales(listaCompromisosOpcionales);
        mensaje.tipoMensaje = ConstantesExitoError.EXITO;
        mensaje.mensaje = MENSAJE_EXITO;
        this.alertaServicioLocal.agregarMensaje(mensaje);
      },
      _ => {
        mensaje.tipoMensaje = ConstantesExitoError.ERROR;
        mensaje.mensaje = MENSAJE_ERROR;
        this.alertaServicioLocal.agregarMensaje(mensaje);
      });
  }

  irAIdeas(url: string) {
      window.open(url,"_blank");
    }

}
