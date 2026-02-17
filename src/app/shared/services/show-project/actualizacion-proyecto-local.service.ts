import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProyectoConstantes } from '../../components/molecules/show-project/proyecto-constantes';
import { ActualizacionProyecto } from '../../components/molecules/show-project/actualizacion-proyecto';
import { ServicioProyectoLocal } from './servicio-proyecto-local';

@Injectable({
  providedIn: 'root'
})
export class ActualizacionProyectoLocalService implements ServicioProyectoLocal {

  private listaActualizaciones: BehaviorSubject<ActualizacionProyecto[]> = new BehaviorSubject<ActualizacionProyecto[]>([]);
  public listaActualizacionesObservable = this.listaActualizaciones.asObservable();
  private actualizacionVigente: BehaviorSubject<ActualizacionProyecto | null> =
    new BehaviorSubject<ActualizacionProyecto | null>(null);
  public actualizacionVigenteObservable = this.actualizacionVigente.asObservable();

  constructor() { }

  asignarListaActualizaciones(listaActualizaciones: ActualizacionProyecto[]) {
    this.listaActualizaciones.next(listaActualizaciones);
  }

  asignarActualizacionVigente(actualizacionProyecto: ActualizacionProyecto) {
    this.actualizacionVigente.next(actualizacionProyecto);
  }

  validar(): string {
    const actualizacion: ActualizacionProyecto | null = this.actualizacionVigente.getValue();
    if (!actualizacion) {
      return '';
    }
    const limiteActualizacion: Date = new Date(+actualizacion.fechaLimite);
    const fechaActual: Date = new Date();
    if (!!actualizacion && !!actualizacion.cambiosRealizados) {
      return '';
    } else if (limiteActualizacion < fechaActual) {
      return 'La autorización de actualización no se encuentra vigente.';
    }
    return 'Debe diligenciar el paso actualización con el comentario de los cambios realizados.';
  }

  // Comentado: guardar y postguardado no están implementados correctamente
  /*
  guardar() {
    return this.actualizacionProyectoServicio.guardarActualizacionProyectoInvestigador(
      this.actualizacionVigente.getValue(), ProyectoConstantes.ENVIADO_A_CENTRO);
  }
  */

  postguardado() {
  }

}
