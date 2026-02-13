import { Component, OnInit } from '@angular/core';
import { AlertaMensaje } from './alerta-mensaje';
import { ConstantesExitoError } from './constantes-exito-error';
import { AlertaLocalService } from 'src/app/shared/services/show-project/alerta-local.service';

@Component({
  selector: 'app-mensaje-exito-error',
  templateUrl: './mensaje-exito-error.component.html',
  styleUrls: ['./mensaje-exito-error.component.css']
})
export class MensajeExitoErrorComponent implements OnInit {

  alertaMensaje: AlertaMensaje = new AlertaMensaje();
  mostrarMensajeExito = false;
  mostrarMensajeError = false;
  mensajeMostrar: string='';

  constructor(private alertaServicioLocal: AlertaLocalService) { }

  ngOnInit() {
    this.alertaServicioLocal.alertaMensajeObservable.subscribe(mensaje => {
      this.alertaMensaje = mensaje;
    });
  }

  esMensajeError(mensaje: AlertaMensaje) {
    if (mensaje.tipoMensaje === ConstantesExitoError.EXITO) {
      return this.mostrarMensajedeDeExito(mensaje);
    } else if (mensaje.tipoMensaje === ConstantesExitoError.ERROR) {
      return this.mostrarMensajeDeError(mensaje);
    }
    return false;
  }

  private mostrarMensajeDeError(mensaje: AlertaMensaje) {
    this.mensajeMostrar = mensaje.mensaje;
    this.mostrarMensajeError = true;
    setTimeout(() => {
      this.mostrarMensajeError = false;
      this.alertaServicioLocal.agregarMensaje(null);
    }, ConstantesExitoError.TIEMPO_MENSAJES_EXITO_ERROR);
    return true;
  }

  private mostrarMensajedeDeExito(mensaje: AlertaMensaje) {
    this.mensajeMostrar = mensaje.mensaje;
    this.mostrarMensajeExito = true;
    setTimeout(() => {
      this.mostrarMensajeExito = false;
      this.alertaServicioLocal.agregarMensaje(null);
    }, ConstantesExitoError.TIEMPO_MENSAJES_EXITO_ERROR);
    return true;
  }
}
