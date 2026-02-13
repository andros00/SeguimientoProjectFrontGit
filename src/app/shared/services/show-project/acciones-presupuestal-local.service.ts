import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { RubroProyecto } from '../../components/molecules/show-project/rubro-proyecto';

@Injectable({
  providedIn: 'root'
})
export class AccionesPresupuestalLocalService {

  private accionVerResumenSubject = new BehaviorSubject<boolean>(false);
  accionVerResumen$ = this.accionVerResumenSubject.asObservable();

  private accionVerPorcentajeSubject = new BehaviorSubject<boolean>(false);
  accionVerPorcentaje$ = this.accionVerPorcentajeSubject.asObservable();

  private accionGuardarSubject = new Subject();
  accionGuardar$ = this.accionGuardarSubject.asObservable();

  private accionConfirmarPresupuestoSubject = new Subject();
  accionConfirmarPresupuesto$ = this.accionConfirmarPresupuestoSubject.asObservable();

  private accionRubroAgregadoSubject = new Subject<RubroProyecto>();
  accionRubroAgregado$ = this.accionRubroAgregadoSubject.asObservable();

  private accionSubrubroAgregadoSubject = new Subject<[RubroProyecto, RubroProyecto]>();
  accionSubrubroAgregado$ = this.accionSubrubroAgregadoSubject.asObservable();

  private accionEdicionFinalizadaSubject = new Subject<[RubroProyecto, RubroProyecto]>();
  accionEdicionFinalizada$ = this.accionEdicionFinalizadaSubject.asObservable();

  private accionAmpliarTodoSubject = new Subject();
  accionAmpliarTodo$ = this.accionAmpliarTodoSubject.asObservable();

  private accionReducirTodoSubject = new Subject();
  accionReducirTodo$ = this.accionReducirTodoSubject.asObservable();

  constructor() { }

  verResumen() {
    const currentState = this.accionVerResumenSubject.getValue();
    this.accionVerResumenSubject.next(!currentState);
  }

  verPorcentaje() {
    const currentState = this.accionVerPorcentajeSubject.getValue();
    this.accionVerPorcentajeSubject.next(!currentState);
  }

  guardarPresupuesto() {
    this.accionGuardarSubject.next();
  }

  confirmarPresupuesto() {
    this.accionConfirmarPresupuestoSubject.next();
  }

  agregarRubro(rubro: RubroProyecto) {
    this.accionRubroAgregadoSubject.next(rubro);
  }

  agregarSubrubro(subrubro: RubroProyecto, padre: RubroProyecto) {
    this.accionSubrubroAgregadoSubject.next([subrubro, padre]);
  }

  finalizarEdicion(rubro: RubroProyecto, padre: RubroProyecto) {
    this.accionEdicionFinalizadaSubject.next([rubro, padre]);
  }

  ampliarTodo() {
    this.accionAmpliarTodoSubject.next();
  }

  reducirTodo() {
    this.accionReducirTodoSubject.next();
  }
}
