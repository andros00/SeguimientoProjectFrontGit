import { Injectable } from '@angular/core';
//import { Evaluador } from '../../proyecto/modelo/evaluador-proyecto';
import { BehaviorSubject } from 'rxjs';
import { EvaluadorRecomendado } from '../../components/molecules/show-project/evaluador-recomendado';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionLocalService {

  private evaluadorSeleccionadoSubject = new BehaviorSubject<EvaluadorRecomendado>({} as EvaluadorRecomendado);
  constructor() { }

  actualizarEvaluadorSeleccionado(evaluadorSeleccionado: EvaluadorRecomendado) {
    this.evaluadorSeleccionadoSubject.next(evaluadorSeleccionado);
  }

  obtenerEvaluadorSeleccionado(): EvaluadorRecomendado {
    return this.evaluadorSeleccionadoSubject.getValue();
  }
}
