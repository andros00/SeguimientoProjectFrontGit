import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
//import { ActualizacionProyectoService } from './../servicios/actualizacion-proyecto.service';
import { ProyectoConstantes } from '../../components/molecules/show-project/proyecto-constantes';
import { ActualizacionProyecto } from '../../components/molecules/show-project/actualizacion-proyecto';
import { ServicioProyectoLocal } from './servicio-proyecto-local';

@Injectable({
  providedIn: 'root'
})
export class ActualizacionProyectoLocalService implements ServicioProyectoLocal {

  private listaActualizaciones: BehaviorSubject<ActualizacionProyecto[]> = new BehaviorSubject(([]));
  public listaActualizacionesObservable = this.listaActualizaciones.asObservable();
  private actualizacionVigente: BehaviorSubject<ActualizacionProyecto> =
    new BehaviorSubject<ActualizacionProyecto>(BehaviorSubject.create());
  public actualizacionVigenteObservable = this.actualizacionVigente.asObservable();

  constructor(private actualizacionProyectoServicio: ActualizacionProyectoService) { }

  asignarListaActualizaciones(actualizacionProyecto: ActualizacionProyecto[]) {
    this.listaActualizaciones.next(actualizacionProyecto);
  }

  asignarActualizacionVigente(actualizacionProyecto: ActualizacionProyecto) {
    this.actualizacionVigente.next(actualizacionProyecto);
  }

  validar(): string {
    const actualizacion: ActualizacionProyecto = this.actualizacionVigente.getValue();
    const limiteActualizacion: Date = new Date(+actualizacion.fechaLimite);
    const fechaActual: Date = new Date();
    if (!!actualizacion && !!actualizacion.cambiosRealizados) {
      return '';
    } else if (limiteActualizacion < fechaActual) {
      return 'La autorización de actualización no se encuentra vigente.';
    }
    return 'Debe diligenciar el paso actualización con el comentario de los cambios realizados.';
  }

  guardar() {
    return this.actualizacionProyectoServicio.guardarActualizacionProyectoInvestigador(
      this.actualizacionVigente.getValue(), ProyectoConstantes.ENVIADO_A_CENTRO);
  }

  postguardado() {
  }

}
