import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NivelProyectoId } from '../../components/molecules/show-project/nivel-proyecto-id';
import { PasosProyectoService } from './pasos-proyecto.service';
import { ActualizacionProyecto } from '../../components/molecules/show-project/actualizacion-proyecto';
import { EstructuraProyecto } from '../../components/molecules/show-project/estructura-proyecto';
import { InformacionGeneralProyecto } from '../../components/molecules/show-project/informacion-general-proyecto';
import { ActualizacionProyectoLocalService } from './actualizacion-proyecto-local.service';
import { AportanteProyectoLocalService } from './aportante-proyecto-local.service';
import { ComponenteProyectoLocalService } from './componente-proyecto-local.service';
import { CompromisosProyectoLocalService } from './compromisos-proyecto-local.service';
import { CondicionFormalProyectoLocalService } from './condicion-formal-proyecto-local.service';
import { DescripcionProyectoLocalService } from './descripcion-proyecto-local.service';
import { DocumentoSoporteProyectoLocalService } from './documento-soporte-proyecto-local.service';
import { EvaluadorProyectoLocalService } from './evaluador-proyecto-local.service';
import { ParticipanteProyectoLocalService } from './participante-proyecto-local.service';
import { PlanTrabajoProyectoLocalService } from './plan-trabajo-proyecto-local.service';
import { PresupuestalProyectoLocalService } from './presupuestal-proyecto-local.service';
import { ProyectoLocalService } from './proyecto-local.service';
import { InformacionGeneralProyectoService } from './informacion-general-proyecto.service';
import { InformacionComplementariaLocalService } from './informacion-complementaria-local.service';
import { CronogramaProyectoLocalService } from './cronograma-proyecto-local.service';
import { ActualizacionProyectoService } from './actualizacion-proyecto.service';

@Injectable({
  providedIn: 'root'
})
export class CargadorProyectoLocalService {

  constructor(
    private informacionGeneralproyectoService: InformacionGeneralProyectoService,
    private proyectoLocalServicio: ProyectoLocalService,
    private descripcionLocalServicio: DescripcionProyectoLocalService,
    private cronogramaLocalServicio: CronogramaProyectoLocalService,
    private cofinanciadoresLocalServicio: AportanteProyectoLocalService,
    private presupuestalLocalServicio: PresupuestalProyectoLocalService,
    private planTrabajoServicioLocal: PlanTrabajoProyectoLocalService,
    private participanteServicioLocal: ParticipanteProyectoLocalService,
    private compromisosProyectoServicioLocal: CompromisosProyectoLocalService,
    private condicionFormalServicioLocal: CondicionFormalProyectoLocalService,
    private documentoSoporteServicioLocal: DocumentoSoporteProyectoLocalService,
    private componenteServicioLocal: ComponenteProyectoLocalService,
    private evaluadorProyectoLocalService: EvaluadorProyectoLocalService,
    private actualizacionProyectoLocalService: ActualizacionProyectoLocalService,
    private actualizacionProyectoService: ActualizacionProyectoService,
    private informacionComplementariaLocalService: InformacionComplementariaLocalService,
    private pasosService: PasosProyectoService
  ) { }

  cargarProyecto(proyecto: InformacionGeneralProyecto, conActualizaciones = false, conPublicar = true): Observable<void> {
    const subject = new Subject<void>();

    this.limpiarDatosServiciosLocales();
    this.informacionComplementariaLocalService.actualizarInformacionComplementaria(proyecto.codigo);
    this.informacionGeneralproyectoService.obtenerProyectoPorCodigo(proyecto.codigo).subscribe(proyectoAEditar => {
      this.cargarServiciosLocalesDePasos(proyectoAEditar);

      if (conActualizaciones) {
        this.actualizacionProyectoService.consultarActualizacionesDeProyecto(proyecto.codigo).subscribe(
          actualizaciones => {
            this.asignarActualizaciones(actualizaciones);
            this.inicializarPasos(proyecto, actualizaciones, conPublicar, subject);
          });
      } else {
        this.inicializarPasos(proyecto, undefined, conPublicar, subject);
      }
    });

    return subject.asObservable();
  }

  private asignarActualizaciones(actualizaciones: ActualizacionProyecto[]) {
    this.actualizacionProyectoLocalService.asignarListaActualizaciones(actualizaciones);
    actualizaciones.forEach(actualizacion => {
      if (actualizacion.fechaActualizacion === '-1') {
        this.actualizacionProyectoLocalService.asignarActualizacionVigente(actualizacion);
      }
    });
  }

  private cargarServiciosLocalesDePasos(proyectoAEditar: EstructuraProyecto) {
    if (proyectoAEditar.informacionGeneralProyecto.subnivelProyecto === NivelProyectoId.Subproyecto) {
      proyectoAEditar.informacionGeneralProyecto.nivelProyecto = NivelProyectoId.Subproyecto;
    }
    this.proyectoLocalServicio.agregarInformacionGeneralProyecto(proyectoAEditar.informacionGeneralProyecto);
    this.proyectoLocalServicio.guardarModalidadSeleccionada(proyectoAEditar.informacionGeneralProyecto.modalidadConvocatoria!);
    this.proyectoLocalServicio.guardarComponenteProyecto(proyectoAEditar.componenteProyecto);
    this.proyectoLocalServicio.guardarDatosSubproyecto(proyectoAEditar.datosSubproyecto);
    this.descripcionLocalServicio.agregarTextosDescriptivosOpcionalesYObligatorios(proyectoAEditar.textosDescriptivos);
    this.cronogramaLocalServicio.agregarActividadProyecto(proyectoAEditar.actividadesProyecto);
    proyectoAEditar.aportantesProyecto.forEach(a => a.aportanteGuardado = true);
    this.cofinanciadoresLocalServicio.agregarListaAportanteProyecto(proyectoAEditar.aportantesProyecto);
    this.cofinanciadoresLocalServicio.agregarListaAportanteTemporal(proyectoAEditar.aportantesProyecto);
    this.presupuestalLocalServicio.cargarRubrosExistentes(proyectoAEditar.presupuesto);
    this.presupuestalLocalServicio.guardarMoneda(proyectoAEditar.informacionGeneralProyecto.moneda!);
    this.planTrabajoServicioLocal.agregarPlanDeTrabajo(proyectoAEditar.planesDeTrabajo);
    this.participanteServicioLocal.agregarParticipanteProyecto(proyectoAEditar.participantes);
    const listaGrupo = (proyectoAEditar.participantes || [])
      .filter(participante => participante.grupoInvestigacion !== null)
      .map(participante => participante.grupoInvestigacion);
    this.participanteServicioLocal.agregarListaGrupo(listaGrupo);
    this.compromisosProyectoServicioLocal.cargarCompromisos(proyectoAEditar.compromisoProyecto);
    this.condicionFormalServicioLocal.agregarCondicionesPorEvaluacionInicial(proyectoAEditar.condicionFormalPorEvaluacion);
    this.documentoSoporteServicioLocal.agregarListaDocumentosProyecto(proyectoAEditar.documentos);
    this.componenteServicioLocal.agregarComponenteProyecto(proyectoAEditar.componentes);
    this.evaluadorProyectoLocalService.agregarListaEvaluadoresRecomendados(proyectoAEditar.evaluadores);
  }

  private inicializarPasos(
    proyecto: InformacionGeneralProyecto,
    actualizaciones: ActualizacionProyecto[] | undefined,
    conPasoPublicar: boolean,
    subject: Subject<void>) {

    this.pasosService.inicializarPasos();
    this.pasosService.calcularPasos(proyecto, proyecto.procesoSeleccion!.identificador, actualizaciones, conPasoPublicar);
    subject.next();
  }

  limpiarDatosServiciosLocales() {
    this.proyectoLocalServicio.agregarInformacionGeneralProyecto(null as any);
    this.actualizacionProyectoLocalService.asignarListaActualizaciones([]);
    this.proyectoLocalServicio.guardarComponenteProyecto(null as any);
    this.proyectoLocalServicio.guardarDatosSubproyecto(null as any);
    this.descripcionLocalServicio.agregarTextoDescriptivoObligatorio([]);
    this.descripcionLocalServicio.agregarTextoDescriptivoOpcional([]);
    this.cronogramaLocalServicio.agregarActividadProyecto([]);
    this.presupuestalLocalServicio.limpiarListadoRubros();
    this.cofinanciadoresLocalServicio.agregarListaAportanteProyecto([]);
    this.cofinanciadoresLocalServicio.agregarListaAportanteTemporal([]);
    this.planTrabajoServicioLocal.agregarPlanDeTrabajo([]);
    this.participanteServicioLocal.agregarParticipanteProyecto([]);
    this.participanteServicioLocal.agregarListaGrupo([]);
    this.compromisosProyectoServicioLocal.agregarListaCompromisosObligatorios([]);
    this.compromisosProyectoServicioLocal.agregarListaCompromisosOpcionales([]);
    this.condicionFormalServicioLocal.agregarCondicionesPorEvaluacionInicial([]);
    this.documentoSoporteServicioLocal.agregarListaDocumentosProyecto([]);
    this.componenteServicioLocal.agregarComponenteProyecto([]);
    this.evaluadorProyectoLocalService.agregarListaEvaluadoresRecomendados([]);
  }
}
