import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ServicioProyectoLocal } from './servicio-proyecto-local';
import { ActividadProyecto } from '../../components/molecules/show-project/actividad-proyecto';
import { ProyectoConstantes } from '../../components/molecules/show-project/proyecto-constantes';
import { CronogramaService } from './cronograma.service';

@Injectable({
  providedIn: 'root'
})
export class CronogramaProyectoLocalService implements ServicioProyectoLocal {

  private listaActividadProyecto: BehaviorSubject<ActividadProyecto[]> = new BehaviorSubject<ActividadProyecto[]>([]);
  public listaActividadProyectoObservable = this.listaActividadProyecto.asObservable();

  constructor(private cronogramaServicio: CronogramaService) {
  }

  obtenerListaActividadProyecto(): ActividadProyecto[] {
    return this.listaActividadProyecto.getValue();
  }

  agregarActividadProyecto(listaActividades: ActividadProyecto[]) {
    this.listaActividadProyecto.next(listaActividades);
  }

  validar() {
    const cantidadActividades = this.listaActividadProyecto.getValue().length;
    if (cantidadActividades === 0) {
      return `El cronograma de actividades del proyecto está incompleto: Debe ingresar al menos
      una actividad a realizar en su proyecto de acuerdo a los términos de la convocatoria.`;
    }
    return '';
  }

  guardar() {
    return this.cronogramaServicio.guardarActividades(this.listaActividadProyecto.getValue(), ProyectoConstantes.ENVIADO_A_CENTRO);
  }

  postguardado(listaCronograma: ActividadProyecto[]) {
    this.agregarActividadProyecto(listaCronograma);
  }
}
