import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ComponenteProyectoService } from './componente-proyecto.service';
import { ServicioProyectoLocal } from './servicio-proyecto-local';
import { ComponenteMacroproyecto } from '../../components/molecules/show-project/componente-macroproyecto';
import { ProyectoConstantes } from '../../components/molecules/show-project/proyecto-constantes';
import { ComponenteProyecto } from '../../components/molecules/show-project/componente-proyecto';

@Injectable({
  providedIn: 'root'
})
export class ComponenteProyectoLocalService implements ServicioProyectoLocal {

  private listaComponenteProyecto: BehaviorSubject<ComponenteMacroproyecto[]> = new BehaviorSubject(([]));
  public listaComponenteProyectoObservable = this.listaComponenteProyecto.asObservable();

  constructor(private componenteServicio: ComponenteProyectoService) {
  }

  obtenerListaComponenteProyecto(): ComponenteMacroproyecto[] {
    return this.listaComponenteProyecto.getValue();
  }

  agregarComponenteProyecto(listaComponentes: ComponenteMacroproyecto[]) {
    this.consultarProyectosAsociadosAComponentes(listaComponentes);
    this.listaComponenteProyecto.next(listaComponentes);
  }

  private consultarProyectosAsociadosAComponentes(componentes: ComponenteMacroproyecto[]) {
    if (!!componentes && componentes.length > 0) {
      const codigoProyecto = componentes[0].macroproyecto;
      this.componenteServicio.consultarProyectosAsociadosAComponentes(codigoProyecto).subscribe(
        listadoProyectosAsociados => this.asignarProyectosAComponentes(listadoProyectosAsociados));
    }
  }

  private asignarProyectosAComponentes(listadoProyectosAsociados: ComponenteProyecto[]) {
    this.listaComponenteProyecto.getValue().forEach(
      componente => {
        const proyectosDelComponente = listadoProyectosAsociados.filter(cp => cp.componente === componente.identificador);
        componente.proyectos = proyectosDelComponente;
      });
  }

  validar(): string {
    return this.listaComponenteProyecto.getValue().length > 0 ? '' : 'Debe agregar al menos un componente para el macroproyecto.';
  }
  guardar() {
    return this.componenteServicio.guardarComponentes(this.listaComponenteProyecto.getValue(), ProyectoConstantes.ENVIADO_A_CENTRO );
  }
  postguardado(listaComponenteProyecto: ComponenteMacroproyecto[]) {
    this.agregarComponenteProyecto(listaComponenteProyecto);
  }
}
