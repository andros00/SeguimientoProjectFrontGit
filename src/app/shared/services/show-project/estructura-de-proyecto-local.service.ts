import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
//import { CondicionFormalPorEvaluacion } from '../modelo/condicion-formal-por-evaluacion';
import { TextoDescriptivo } from '../../components/molecules/show-project/texto-descriptivo';
import { CompromisoProyecto } from '../../components/molecules/show-project/compromiso-proyecto';
import { EvaluacionTecnica } from '../../components/molecules/show-project/evaluacion-tecnica';

@Injectable({
  providedIn: 'root'
})
export class EstructuraDeProyectoLocalService {

  private listaTextosDescriptivos: BehaviorSubject<TextoDescriptivo[]> = new BehaviorSubject<TextoDescriptivo[]>([]);
  public listaTextosDescriptivosObservable = this.listaTextosDescriptivos.asObservable();
  private listaCompromisosProyecto: BehaviorSubject<CompromisoProyecto[]> = new BehaviorSubject<CompromisoProyecto[]>([]);
  public listaCompromisosProyectoObservable = this.listaCompromisosProyecto.asObservable();
  private listaPlanesDeTrabajo: BehaviorSubject<TextoDescriptivo[]> = new BehaviorSubject<TextoDescriptivo[]>([]);
  public listaPlanesDeTrabajoObservable = this.listaPlanesDeTrabajo.asObservable();
  private evaluacionTecnica: BehaviorSubject<EvaluacionTecnica> = new BehaviorSubject<EvaluacionTecnica>(BehaviorSubject.create());
  public evaluacionTecnicaObservable = this.evaluacionTecnica.asObservable();

  obtenerListaTextosDescriptivosInicial(): TextoDescriptivo[] {
    return this.listaTextosDescriptivos.getValue();
  }

  agregarTextosDescriptivosInicial(listaTextos: TextoDescriptivo[]) {
    this.listaTextosDescriptivos.next(listaTextos);
  }

  obtenerListaCompromisosProyectosInicial(): CompromisoProyecto[] {
    return this.listaCompromisosProyecto.getValue();
  }

  agregarCompromisosProyectosInicial(listaCompromiso: CompromisoProyecto[]) {
    this.listaCompromisosProyecto.next(listaCompromiso);
  }

  obtenerListaPlanesDeTrabajoInicial(): TextoDescriptivo[] {
    return this.listaPlanesDeTrabajo.getValue();
  }

  agregarListaPlanesDeTrabajoInicial(listaPlanes: TextoDescriptivo[]) {
    this.listaPlanesDeTrabajo.next(listaPlanes);
  }


  obtenerEvaluacionTecnicaInicial(): EvaluacionTecnica {
    return this.evaluacionTecnica.getValue();
  }

  agregarEvaluacionTecnicaInicial(evaluacion: EvaluacionTecnica) {
    this.evaluacionTecnica.next(evaluacion);
  }

}
