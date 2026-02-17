import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Injectable } from '@angular/core';
import { TextoDescriptivo } from '../../components/molecules/show-project/texto-descriptivo';
import { DescripcionProyectoService } from './descripcion-proyecto.service';
import { ServicioProyectoLocal } from './servicio-proyecto-local';
import { ProyectoConstantes } from '../../components/molecules/show-project/proyecto-constantes';

@Injectable({
  providedIn: 'root'
})
export class PlanTrabajoProyectoLocalService implements ServicioProyectoLocal {

  private listaPlanDeTrabajo: BehaviorSubject<TextoDescriptivo[]> = new BehaviorSubject<TextoDescriptivo[]>([]);
  public listaPlanDeTrabajoObservable = this.listaPlanDeTrabajo.asObservable();

  constructor(private textoDescriptivoServicio: DescripcionProyectoService) {

  }

  obtenerListaPlanDeTrabajo(): TextoDescriptivo[] {
    return this.listaPlanDeTrabajo.getValue();
  }

  agregarPlanDeTrabajo(listaPlanDeTrabajo: TextoDescriptivo[]) {
    this.listaPlanDeTrabajo.next(listaPlanDeTrabajo);
  }

  validar(): string {
    return '';
  }
  guardar() {
    return this.textoDescriptivoServicio.guardarListaTextoDescriptivo(this.listaPlanDeTrabajo.getValue(),
      ProyectoConstantes.ENVIADO_A_CENTRO);
  }

  postguardado(planTrabajo: TextoDescriptivo[]) {
    this.agregarPlanDeTrabajo(planTrabajo);
  }
}
