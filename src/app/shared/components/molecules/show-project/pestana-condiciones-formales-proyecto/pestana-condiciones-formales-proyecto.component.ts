import { Component, Input, OnInit } from '@angular/core';
import { ConstantesExitoError } from '../mensaje-exito-error/constantes-exito-error';
import { CondicionFormalPorEvaluacion } from '../condicion-formal-por-evaluacion';
import { AlertaMensaje } from '../mensaje-exito-error/alerta-mensaje';
import { CondicionesFormalesService } from 'src/app/shared/services/show-project/condiciones-formales.service';
import { AlertaLocalService } from 'src/app/shared/services/show-project/alerta-local.service';
import { CondicionFormalProyectoLocalService } from 'src/app/shared/services/show-project/condicion-formal-proyecto-local.service';

const MENSAJE_EXITO = 'Condiciones formales del proyecto guardadas con éxito.';
const MENSAJE_ERROR = 'Ocurrió un error guardando las condiciones formales del proyecto.';

@Component({
  selector: 'app-pestana-condiciones-formales-proyecto',
  templateUrl: './pestana-condiciones-formales-proyecto.component.html',
  styleUrls: ['./pestana-condiciones-formales-proyecto.component.css']
})
export class PestanaCondicionesFormalesProyectoComponent implements OnInit {

  @Input() editable = false;

  constructor(private condicionFormalProyectoServicioLocal: CondicionFormalProyectoLocalService,
    private condicionesFormalesServicio: CondicionesFormalesService,
    private alertaServicioLocal: AlertaLocalService) { }

  ngOnInit() {
  }

  guardarCondiciones() {
    const mensaje = new AlertaMensaje();
    let listaCondiciones: CondicionFormalPorEvaluacion[];
    listaCondiciones = this.condicionFormalProyectoServicioLocal.obtenerListaCondicionesPorEvaluacionInicial();
    this.condicionesFormalesServicio.guardarCondicionesFormales(listaCondiciones).subscribe(respuestaGuardado => {
      this.condicionFormalProyectoServicioLocal.agregarCondicionesPorEvaluacionInicial(respuestaGuardado);
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
}
