import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
//import { InformacionGeneralProyectoService } from '../servicios/informacion-general-proyecto.service';
import { DatosSubproyecto } from '../../components/molecules/show-project/datos-subproyecto';
import { ComponenteProyecto } from '../../components/molecules/show-project/componente-proyecto';
import { InformacionGeneralConvocatoria } from '../../components/molecules/show-project/informacion-general-convocatoria';
import { InformacionGeneralProyecto } from '../../components/molecules/show-project/informacion-general-proyecto';
import { InformacionGeneral } from '../../components/molecules/show-project/informacion-general';
import { ModalidadConvocatoria } from '../../components/molecules/show-project/modalidad-convocatoria';
import { FinanciadorConvocatoria } from '../../components/molecules/show-project/financiador-convocatoria';

@Injectable({
  providedIn: 'root'
})
export class ProyectoLocalService {

  private listaFinanciador: BehaviorSubject<FinanciadorConvocatoria[]> = new BehaviorSubject<FinanciadorConvocatoria[]>([]);
  public listaFinanciadoresObservable = this.listaFinanciador.asObservable();
  private proyectoGuardado: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  informacionGeneralProyecto: BehaviorSubject<InformacionGeneralProyecto> =
    new BehaviorSubject<InformacionGeneralProyecto>(BehaviorSubject.create());
  public proyectoGuardadoObservable = this.informacionGeneralProyecto.asObservable();
  private informacionGeneralProcesoSeleccion: BehaviorSubject<InformacionGeneral> =
    new BehaviorSubject<InformacionGeneral>(BehaviorSubject.create());
  private informacionGeneralConvocatoria: BehaviorSubject<InformacionGeneralConvocatoria> =
    new BehaviorSubject<InformacionGeneralConvocatoria>(BehaviorSubject.create());
  private componenteProyecto: BehaviorSubject<ComponenteProyecto> = new BehaviorSubject<ComponenteProyecto>(BehaviorSubject.create());
  private datosSubproyecto: BehaviorSubject<DatosSubproyecto> = new BehaviorSubject<DatosSubproyecto>(BehaviorSubject.create());
  private modalidadSeleccionadaSubject = new BehaviorSubject<ModalidadConvocatoria | null>(null);

  obtenerInformacionGeneralProyecto(): InformacionGeneralProyecto {
    return this.informacionGeneralProyecto.getValue();
  }

  agregarInformacionGeneralProyecto(informacionGeneral: InformacionGeneralProyecto) {
    this.informacionGeneralProyecto.next(informacionGeneral);
  }

  obtenerListaFinanciador(): FinanciadorConvocatoria[] {
    return this.listaFinanciador.getValue();
  }

  agregarlistaFinanciador(listaFinanciador: FinanciadorConvocatoria[]) {
    this.listaFinanciador.next(listaFinanciador);
  }

  notificarProyectoGuardado() {
    this.proyectoGuardado.next(true);
  }

  observableProyectoGuardado(): Observable<boolean> {
    return this.proyectoGuardado.asObservable();
  }

  obtenerInformacionGeneralProcesoSeleccion(): BehaviorSubject<InformacionGeneral> {
    return this.informacionGeneralProcesoSeleccion;
  }

  agregarInformacionGeneralProcesoSeleccion(informacionGeneral: InformacionGeneral) {
    this.informacionGeneralProcesoSeleccion.next(informacionGeneral);
  }

  obtenerInformacionGeneralConvocatoria(): BehaviorSubject<InformacionGeneralConvocatoria> {
    return this.informacionGeneralConvocatoria;
  }

  agregarInformacionGeneralConvocatoria(informacionGeneral: InformacionGeneralConvocatoria) {
    this.informacionGeneralConvocatoria.next(informacionGeneral);
  }

  guardarModalidadSeleccionada(modalidad: ModalidadConvocatoria) {
    this.modalidadSeleccionadaSubject.next(modalidad);
  }

  obtenerModalidadSeleccionada(): ModalidadConvocatoria | null {
    return this.modalidadSeleccionadaSubject.getValue();
  }

  guardarComponenteProyecto(componenteProyecto: ComponenteProyecto) {
    this.componenteProyecto.next(componenteProyecto);
  }

  obtenerComponenteProyecto(): ComponenteProyecto {
    return this.componenteProyecto.getValue();
  }

  guardarDatosSubproyecto(datosSubproyecto: DatosSubproyecto) {
    this.datosSubproyecto.next(datosSubproyecto);
  }

  obtenerDatosSubproyecto(): DatosSubproyecto {
    return this.datosSubproyecto.getValue();
  }
}
