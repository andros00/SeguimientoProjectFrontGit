import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CondicionesFormalesService } from './condiciones-formales.service';
import { ProyectoConstantes } from '../../components/molecules/show-project/proyecto-constantes';
import { ServicioProyectoLocal } from './servicio-proyecto-local';
import { CondicionFormalPorEvaluacion } from '../../components/molecules/show-project/condicion-formal-por-evaluacion';

@Injectable({
  providedIn: 'root'
})
export class CondicionFormalProyectoLocalService implements ServicioProyectoLocal {

  private listaCondicionFormalPorEvaluacion: BehaviorSubject<CondicionFormalPorEvaluacion[]> = new BehaviorSubject<CondicionFormalPorEvaluacion[]>([]);
  public listaCondicionFormalPorEvaluacionObservable = this.listaCondicionFormalPorEvaluacion.asObservable();

  constructor(private condicionFormalServicio: CondicionesFormalesService) {
  }

  obtenerListaCondicionesPorEvaluacionInicial(): CondicionFormalPorEvaluacion[] {
    return this.listaCondicionFormalPorEvaluacion.getValue();
  }

  agregarCondicionesPorEvaluacionInicial(listaCondiciones: CondicionFormalPorEvaluacion[]) {
    this.listaCondicionFormalPorEvaluacion.next(listaCondiciones);
  }

  validar() {
    if (this.listaCondicionFormalPorEvaluacion.getValue()) {
      const numeroCondicionesIncompletas = this.listaCondicionFormalPorEvaluacion.getValue()
        .filter(evaluacion => evaluacion.resultadoManual === 'n' || evaluacion.resultadoManual === 'i').length;
      if (numeroCondicionesIncompletas > 0) {
        return `La verificación de las condiciones formales está incompleta. Para matricular
          el proyecto debe completar la verificación de todas las condiciones formales.`;
      }
    }
    return '';
  }

  guardar() {
    return this.condicionFormalServicio.guardarCondicionesFormales(this.listaCondicionFormalPorEvaluacion.getValue(),
      ProyectoConstantes.ENVIADO_A_CENTRO);
  }

  postguardado(listaCondiciones: CondicionFormalPorEvaluacion[]) {
    this.agregarCondicionesPorEvaluacionInicial(listaCondiciones);
  }

}
