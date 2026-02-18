import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ProyectoLocalService } from './proyecto-local.service';
import { AportanteProyectoService } from './aportante-proyecto.service';
import { AportanteProyecto } from '../../components/molecules/show-project/aportante-proyecto';
import { RubroConvocatoria } from '../../components/molecules/show-project/rubro-convocatoria';
import { ProyectoConstantes } from '../../components/molecules/show-project/proyecto-constantes';
import { ServicioProyectoLocal } from './servicio-proyecto-local';
import { UdeaConstantes } from '../../components/molecules/show-project/udea-constantes';

@Injectable({
  providedIn: 'root'
})
export class AportanteProyectoLocalService implements ServicioProyectoLocal {

  private listaAportante: BehaviorSubject<AportanteProyecto[]> = new BehaviorSubject<AportanteProyecto[]>([]);
  public listaAportanteObservable = this.listaAportante.asObservable();

  private listaAportanteTemporal: BehaviorSubject<AportanteProyecto[]> = new BehaviorSubject<AportanteProyecto[]>([]);
  public listaAportanteTemporalObservable = this.listaAportanteTemporal.asObservable();

  private aportanteAgregadoSubject = new Subject<AportanteProyecto>();
  public aportanteAgregado$ = this.aportanteAgregadoSubject.asObservable();

  private aportanteEliminadoSubject = new Subject<AportanteProyecto>();
  public aportanteEliminado$ = this.aportanteEliminadoSubject.asObservable();

  constructor(
    private aportanteProyectoService: AportanteProyectoService,
    private servicioLocalProyecto: ProyectoLocalService) { }

  agregarListaAportanteProyecto(listaAportante: AportanteProyecto[]) {
    this.listaAportante.next(listaAportante);
  }

  obtenerListaAportante(): AportanteProyecto[] {
    return this.listaAportante.getValue();
  }

  agregarListaAportanteTemporal(listaAportante: AportanteProyecto[]) {
    this.listaAportanteTemporal.next(listaAportante);
  }

  obtenerListaAportanteTemporal(): AportanteProyecto[] {
    return this.listaAportanteTemporal.getValue();
  }

  agregarAportanteTemporal(aportanteProyecto: AportanteProyecto) {
    const listaTemporal = this.listaAportanteTemporal.getValue();
    listaTemporal.push(aportanteProyecto);
    this.listaAportanteTemporal.next(listaTemporal);
  }

  obtenerRubrosHabilitadosConvocatoria(codigoConvocatoria: number): Observable<RubroConvocatoria[]> {
    if (this.servicioLocalProyecto.obtenerInformacionGeneralProyecto().claseProyecto === codigoConvocatoria) {
      return this.aportanteProyectoService.consultarRubrosConvocatoria(
        this.servicioLocalProyecto.obtenerInformacionGeneralProyecto().convocatoria!.identificador!);
    } else {
      return this.aportanteProyectoService.consultarRubrosHabilitados();
    }
  }

  agregarAportanteProyecto(aportante: AportanteProyecto) {
    this.aportanteAgregadoSubject.next(aportante);
  }

  eliminarAportanteProyecto(aportante: AportanteProyecto) {
    this.aportanteEliminadoSubject.next(aportante);
  }

  validar() {
    const numeroFinanciadores = this.listaAportante.getValue()
      .filter(aportante => aportante.tipo === 'financiador').length;
    if (numeroFinanciadores === 0) {
      return `Los aportantes del proyecto están incompletos: No ha definido ningún
      aportante en el proyecto como financiador.`;
    }
    return '';
  }

  guardar() {
    return this.aportanteProyectoService.guardarAportanteProyecto(this.listaAportante.getValue(), ProyectoConstantes.ENVIADO_A_CENTRO);
  }

  postguardado(listaAportante: AportanteProyecto[]) {
    listaAportante.forEach(aportante => aportante.aportanteGuardado = true);
    this.agregarListaAportanteProyecto(listaAportante);
  }

  validarSiExisteFinanciador():boolean {
    return this.obtenerListaAportante().some(
      (financiador) => financiador.tipo === UdeaConstantes.TIPO_FINANCIADOR
    );
  }
}
