import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProyectoLocalService } from './proyecto-local.service';
import { AportanteProyecto } from '../../components/molecules/show-project/aportante-proyecto';
import { ParticipanteProyecto } from '../../components/molecules/show-project/participante-proyecto';
import { ServicioProyectoLocal } from './servicio-proyecto-local';
import { GrupoInvestigacion } from '../../components/molecules/show-project/grupo-investigacion';
import { ParticipanteProyectoService } from './participante-proyecto.service';
import { ProyectoConstantes } from '../../components/molecules/show-project/proyecto-constantes';

@Injectable({
  providedIn: 'root'
})
export class ParticipanteProyectoLocalService implements ServicioProyectoLocal {

  private listaGrupoInvestigacion: BehaviorSubject<GrupoInvestigacion[]> = new BehaviorSubject<GrupoInvestigacion[]>([]);
  public listaGrupoObservable = this.listaGrupoInvestigacion.asObservable();
  private listaParticipanteProyecto: BehaviorSubject<ParticipanteProyecto[]> = new BehaviorSubject<ParticipanteProyecto[]>([]);
  public listaParticipanteProyectoObservable = this.listaParticipanteProyecto.asObservable();
  private listaInstitucion: BehaviorSubject<AportanteProyecto[]> = new BehaviorSubject<AportanteProyecto[]>([]);
  public listaInstitucionObservable = this.listaInstitucion.asObservable();

  constructor(private proyectoServicioLocal: ProyectoLocalService, private participanteServicio: ParticipanteProyectoService) {
  }

  obtenerListaGrupo(): GrupoInvestigacion[] {
    return this.listaGrupoInvestigacion.getValue();
  }

  agregarListaGrupo(listaGrupoInvestigacion: GrupoInvestigacion[]) {
    this.listaGrupoInvestigacion.next(listaGrupoInvestigacion);
  }

  obtenerListaParticipanteProyecto(): ParticipanteProyecto[] {
    return this.listaParticipanteProyecto.getValue();
  }

  agregarParticipanteProyecto(listaParticipantes: ParticipanteProyecto[]) {
    this.listaParticipanteProyecto.next(listaParticipantes);
  }

  obtenerListaInstitucion(): AportanteProyecto[] {
    return this.listaInstitucion.getValue();
  }

  agregarListaInstitucion(listaInstitucion: AportanteProyecto[]) {
    this.listaInstitucion.next(listaInstitucion);
  }

  validar() {
    const cantidadParticipantes = this.listaParticipanteProyecto.getValue().length;
    if (cantidadParticipantes === 0) {
      return `Los participantes en el proyecto están incompletos: No ha ingresado participante alguno.
      Para matricular el proyecto e iniciar el proceso de selección
      ${this.proyectoServicioLocal.obtenerInformacionGeneralProcesoSeleccion().getValue().nombre}
      debe ingresar al menos un participante.`;
    }
    return '';
  }

  guardar() {
    return this.participanteServicio.guardarParticipanteProyecto(this.listaParticipanteProyecto.getValue(),
      ProyectoConstantes.ENVIADO_A_CENTRO);
  }

  postguardado(listaParticipantes: ParticipanteProyecto[]) {
    this.agregarParticipanteProyecto(listaParticipantes);
  }

}
