import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ServicioProyectoLocal } from './servicio-proyecto-local';
import { ProyectoConstantes } from '../../components/molecules/show-project/proyecto-constantes';
import { EvaluadorService } from './evaluador.service';
import { EvaluadorRecomendado } from '../../components/molecules/show-project/evaluador-recomendado';
import { EvaluadorEvaluacionCientifica } from '../../components/molecules/show-project/evaluador-evaluacion-cientifica';

@Injectable({
  providedIn: 'root'
})
export class EvaluadorProyectoLocalService implements ServicioProyectoLocal {

  private listaEvaluadoresRecomendados: BehaviorSubject<EvaluadorRecomendado[]> = new BehaviorSubject<EvaluadorRecomendado[]>([]);
  public listaEvaluadoresRecomendadosObservable = this.listaEvaluadoresRecomendados.asObservable();

  private listaEvaluadoresEvaluacion: BehaviorSubject<EvaluadorEvaluacionCientifica[]> = new BehaviorSubject<EvaluadorEvaluacionCientifica[]>([]);
  public listaEvaluadoresEvaluacionObservable = this.listaEvaluadoresEvaluacion.asObservable();

  constructor(private evaluadorService: EvaluadorService) {
  }

  obtenerListaEvaluadoresRecomendados(): EvaluadorRecomendado[] {
    return this.listaEvaluadoresRecomendados.getValue();
  }

  agregarListaEvaluadoresRecomendados(listaEvaluadores: EvaluadorRecomendado[]) {
    this.listaEvaluadoresRecomendados.next(listaEvaluadores);
  }

  validar() {
    return '';
  }

  guardar() {
    return this.evaluadorService.guardarEvaluadorRecomendado(this.listaEvaluadoresRecomendados.getValue(),
      ProyectoConstantes.ENVIADO_A_CENTRO);
  }

  postguardado(listaEvaluadores: EvaluadorRecomendado[]) {
    this.agregarListaEvaluadoresRecomendados(listaEvaluadores);
  }

  agregarListaEvaluadoresEvaluacion(listaEvaluadoresEvaluacion: EvaluadorEvaluacionCientifica[]) {
    this.listaEvaluadoresEvaluacion.next(listaEvaluadoresEvaluacion);
  }

  obtenerListaEvaluadoresEvaluacion(): EvaluadorEvaluacionCientifica[] {
    return this.listaEvaluadoresEvaluacion.getValue();
  }
}
