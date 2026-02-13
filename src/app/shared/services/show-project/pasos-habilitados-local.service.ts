import { Injectable } from '@angular/core';
import { SeccionProyecto } from '../../components/molecules/show-project/seccion-proyecto';

class Seccion {
  nombre: string ='';
  editable: boolean= false;
}

@Injectable({
  providedIn: 'root'
})
export class PasosHabilitadosLocalService {

  secciones: Seccion[] = [
    this.seccion(SeccionProyecto.DatoBasico, true),
    this.seccion(SeccionProyecto.Descripcion, true),
    this.seccion(SeccionProyecto.Participante, true),
    this.seccion(SeccionProyecto.Compromiso, true),
    this.seccion(SeccionProyecto.Cronograma, true),
    this.seccion(SeccionProyecto.Presupuestal, true),
    this.seccion(SeccionProyecto.Evaluador, true),
    this.seccion(SeccionProyecto.Componente, true),
    this.seccion(SeccionProyecto.PlanTrabajo, true),
    this.seccion(SeccionProyecto.Documento, true),
    this.seccion(SeccionProyecto.Actualizacion, false),
  ];

  soloLectura = false;

  constructor() { }

  habilitarTodos() {
    this.secciones.forEach(s => {
      if (s.nombre === SeccionProyecto.Actualizacion) {
        s.editable = false;
      } else {
        s.editable = true;
      }
    });
    this.soloLectura = false;
  }

  deshabilitarTodos() {
    this.secciones.forEach(s => s.editable = false);
    this.soloLectura = true;
  }

  habilitarSeccionesActulizacion(secciones: string[]) {
    this.secciones.forEach(seccion => {
      seccion.editable = !!secciones.find(s => s === seccion.nombre);
      if (seccion.nombre === SeccionProyecto.Actualizacion) {
        seccion.editable = true;
      }
    });
    this.soloLectura = false;
  }

  esEditable(seccion: SeccionProyecto): boolean {
    const item = this.secciones.find(s => s.nombre === seccion);
    return !!item ? item.editable : false;
  }

  private seccion(nombre: string, editable: boolean): Seccion {
    return {
      nombre: nombre,
      editable: editable
    } as Seccion;
  }

  esSoloLectura(): boolean {
    return this.soloLectura;
  }
}
