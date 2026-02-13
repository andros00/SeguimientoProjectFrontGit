import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertaMensaje } from '../../components/molecules/show-project/mensaje-exito-error/alerta-mensaje';

@Injectable({
  providedIn: 'root'
})
export class AlertaLocalService {

  private alertaMensaje: BehaviorSubject<AlertaMensaje> = new BehaviorSubject<AlertaMensaje>(BehaviorSubject.create());
  public alertaMensajeObservable = this.alertaMensaje.asObservable();


  constructor() {
  }

  agregarMensaje(alertaMensaje: AlertaMensaje) {
    this.alertaMensaje.next(alertaMensaje);
  }
}
