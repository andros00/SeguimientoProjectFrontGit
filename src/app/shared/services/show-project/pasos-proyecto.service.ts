import { Injectable } from '@angular/core';
import { InformacionComplementariaLocalService } from './informacion-complementaria-local.service';
import { ComponenteProyectoLocalService } from './componente-proyecto-local.service';
import { DocumentoSoporteProyectoLocalService } from './documento-soporte-proyecto-local.service';
import { ActualizacionProyectoLocalService } from './actualizacion-proyecto-local.service';
import { PlanTrabajoProyectoLocalService } from './plan-trabajo-proyecto-local.service';
import { CompromisosProyectoLocalService } from './compromisos-proyecto-local.service';
import { CondicionFormalProyectoLocalService } from './condicion-formal-proyecto-local.service';
import { ParticipanteProyectoLocalService } from './participante-proyecto-local.service';
import { AportanteProyectoLocalService } from './aportante-proyecto-local.service';
import { DescripcionProyectoLocalService } from './descripcion-proyecto-local.service';
import { ServicioProyectoLocal } from './servicio-proyecto-local';
import { InformacionGeneral } from '../../components/molecules/show-project/informacion-general';
import { InformacionGeneralProyecto } from '../../components/molecules/show-project/informacion-general-proyecto';
import { Paso } from '../../components/molecules/show-project/paso';
import { PasosProyectoFormulario } from '../../components/molecules/show-project/pasos-proyecto-formulario';
import { ProcesoSeleccionService } from './proceso-seleccion.service';
import { CondicionFormal } from '../../components/molecules/show-project/condicion-formal';
import { ProyectoMensajes } from '../../components/molecules/show-project/proyecto-mensajes';
import { ProyectoLocalService } from './proyecto-local.service';
import { EvaluadorProyectoLocalService } from './evaluador-proyecto-local.service';
import { ActualizacionProyecto } from '../../components/molecules/show-project/actualizacion-proyecto';
import { PresupuestalProyectoLocalService } from './presupuestal-proyecto-local.service';

@Injectable({
  providedIn: 'root'
})
export class PasosProyectoService {

  private pasos: PasosProyectoFormulario = new PasosProyectoFormulario();

  constructor(
    private procesoSeleccionService: ProcesoSeleccionService,
    private proyectoLocalServicio: ProyectoLocalService,
    private cronogramaLocalServicio: CondicionFormalProyectoLocalService,
    private descripcionLocalServicio: DescripcionProyectoLocalService,
    private aportanteLocalServicio: AportanteProyectoLocalService,
    private presupuestalLocalServicio: PresupuestalProyectoLocalService,
    private componentesLocalServicio: ComponenteProyectoLocalService,
    private planTrabajoLocalServicio: PlanTrabajoProyectoLocalService,
    private participanteLocalServicio: ParticipanteProyectoLocalService,
    private evaluadoresLocalServicio: EvaluadorProyectoLocalService,
    private condicionFormalLocalServicio: CondicionFormalProyectoLocalService,
    private compromisosLocalServicio: CompromisosProyectoLocalService,
    private documentoSoporte: DocumentoSoporteProyectoLocalService,
    private actualizacionProyecto: ActualizacionProyectoLocalService,
    private informacionComplementariaLocalService: InformacionComplementariaLocalService) { }

  inicializarPasos() {
    let indice = 1;
    this.pasos.informacionGeneral = this.crearPaso(indice, ProyectoMensajes.PASO_INFORMACION_GENERAL, true);
    this.pasos.actualizaciones = this.crearPaso(indice++, ProyectoMensajes.PASO_ACTUALIZACION, false);
    this.pasos.complementaria = this.crearPaso(indice++, ProyectoMensajes.PASO_COMPLEMENTARIA,false);
    this.pasos.cronograma = this.crearPaso(indice++, ProyectoMensajes.PASO_CRONOGRAMA, false);
    this.pasos.presupuestal = this.crearPaso(indice++, ProyectoMensajes.PASO_PRESUPUESTAL, false);
    this.pasos.componentes = this.crearPaso(indice++, ProyectoMensajes.PASO_COMPONENTES, false, this.componentesLocalServicio);
    this.pasos.planTrabajo = this.crearPaso(indice++, ProyectoMensajes.PASO_PLAN_DE_TRABAJO, false, this.planTrabajoLocalServicio);
    this.pasos.participantes = this.crearPaso(indice++, ProyectoMensajes.PASO_PARTICIPANTES, false,
      this.participanteLocalServicio);
    this.pasos.evaluadores = this.crearPaso(indice++, ProyectoMensajes.PASO_EVALUADORES_RECOMENDADOS, false,
      this.evaluadoresLocalServicio);
    this.pasos.compromisos = this.crearPaso(indice++, ProyectoMensajes.PASO_COMPROMISOS_CONDICIONES, false);
    this.pasos.documento = this.crearPaso(indice++, ProyectoMensajes.PASO_DOCUMENTO_SOPORTE, false, this.documentoSoporte);
    this.pasos.publicar = this.crearPaso(indice + 1, ProyectoMensajes.PASO_PUBLICAR, false);

    return this.pasos;
  }

  esPestanaVisible(nombrePaso: string, nombrePestana: string): boolean {
    let pestana = null;

    const keys = Object.keys(this.pasos);
    const pasoKey = keys.find(k => {
      const key = k as keyof PasosProyectoFormulario;
      return this.pasos[key].titulo === nombrePaso;
    }) as keyof PasosProyectoFormulario | undefined;
    
    const paso: Paso | undefined = pasoKey ? this.pasos[pasoKey] : undefined;

    if (!!paso && !!paso.tabs) {
      pestana = paso.tabs.find(p => p.titulo === nombrePestana);
    }

    return !!pestana && pestana.visible;
  }

  esPasoVisible(nombrePaso: string): boolean {
    const paso: Paso | undefined = Object.keys(this.pasos).find(k => {
      const key = k as keyof PasosProyectoFormulario;
      return this.pasos[key].titulo === nombrePaso;
    }) as any;
    return paso?.visible || false;
  }

  calcularPasos(proyecto: InformacionGeneralProyecto,
    idProcesoSeleccion: number,
    actualizaciones?: ActualizacionProyecto[],
    mostrarPublicar = true) {

    this.reiniciarPasos();
    this.procesoSeleccionService.obtenerProcesoSeleccionPorId(idProcesoSeleccion)
      .subscribe(procesoSeleccion => {
        this.proyectoLocalServicio.agregarInformacionGeneralProcesoSeleccion(procesoSeleccion.informacionGeneral);
        this.habilitarInformacionGeneral(this.pasos);
        this.habilitarInformacionComplementaria(this.pasos,  procesoSeleccion.informacionGeneral);
        this.habilitarActualizaciones(this.pasos, actualizaciones || []);
        this.habilitacionPorCheckDeProceso(this.pasos, procesoSeleccion.informacionGeneral);
        this.habilitarComponentes(this.pasos, proyecto);
        this.habilitarCondicionesFormales(this.pasos, proyecto, procesoSeleccion.listaCondicionesFormales);
        this.habilitarDocumentoSoporte(this.pasos);
        this.habilitarPublicar(this.pasos, mostrarPublicar);
        this.modificarNumeroDePaso();
      });
  }

  private habilitarInformacionComplementaria(pasos: PasosProyectoFormulario, proyecto: InformacionGeneral){
    if(!!proyecto.requeridoInformacionComplementaria){
      pasos.complementaria = {
        ...pasos.complementaria,
        visible: true,
      };
    }
  }

  private habilitarInformacionGeneral(pasos: PasosProyectoFormulario) {
    pasos.informacionGeneral.visible = true;
  }

  private habilitarActualizaciones(pasos: PasosProyectoFormulario, actualizaciones: ActualizacionProyecto[]) {
    pasos.actualizaciones.visible = !!actualizaciones && actualizaciones.length > 0;
  }

  private habilitarPublicar(pasos: PasosProyectoFormulario, mostrarPublicar: boolean) {
    pasos.publicar.visible = mostrarPublicar;
  }

  private habilitarCondicionesFormales(pasos: PasosProyectoFormulario,
    proyecto: InformacionGeneralProyecto,
    listaCondicionesFormales: CondicionFormal[]) {

    if (!!proyecto.convocatoria) {
      this.validarPestana(pasos.compromisos, true, ProyectoMensajes.PESTANA_CONDICIONES_FORMALES,
        this.condicionFormalLocalServicio);
      pasos.compromisos.visible = true;
    } else {
      const condicionFormalVisible = !!listaCondicionesFormales && listaCondicionesFormales.length > 0;
      this.validarPestana(pasos.compromisos, condicionFormalVisible, ProyectoMensajes.PESTANA_CONDICIONES_FORMALES,
        this.condicionFormalLocalServicio);
      pasos.compromisos.visible = pasos.compromisos.tabs.length > 0;
    }
  }

  private habilitarComponentes(pasos: PasosProyectoFormulario, proyecto: InformacionGeneralProyecto) {
    pasos.componentes.visible = !!proyecto.tipoProyectoMacro;
  }

  private habilitarDocumentoSoporte(pasos: PasosProyectoFormulario) {
    pasos.documento.visible = true;
  }

  private habilitacionPorCheckDeProceso(pasos: PasosProyectoFormulario, proceso: InformacionGeneral) {
    this.validarPestana(pasos.cronograma, !!proceso.requeridoDescripcion, ProyectoMensajes.PESTANA_DESCRIPCION,
      this.descripcionLocalServicio);
    this.validarPestana(pasos.cronograma, !!proceso.requeridoCronograma, ProyectoMensajes.PESTANA_CRONOGRAMA,
      this.cronogramaLocalServicio);
    pasos.cronograma.visible = !!proceso.requeridoDescripcion || !!proceso.requeridoCronograma;
    this.validarPestana(pasos.complementaria, !!proceso.requeridoInformacionComplementaria, ProyectoMensajes.PESTANA_COMPLEMENTARIA);
    this.validarPestana(pasos.presupuestal, true, ProyectoMensajes.PESTANA_COFINANCIADORES, this.aportanteLocalServicio);
    this.validarPestana(pasos.presupuestal, !!proceso.requeridoPresupuesto, ProyectoMensajes.PESTANA_PRESUPUESTO,
      this.presupuestalLocalServicio);
    pasos.presupuestal.visible = true;

    this.validarPestana(pasos.compromisos, !!proceso.requeridoCompromiso, ProyectoMensajes.PESTANA_COMPROMISOS,
      this.compromisosLocalServicio);

    pasos.evaluadores.visible = !!proceso.requeridoEvaluador;
    pasos.participantes.visible = !!proceso.requeridoParticipante;
    pasos.planTrabajo.visible = !!proceso.requeridoPlanTrabajo;
  }

  private modificarNumeroDePaso() {
    const pasosOrdenInicio = this.ordenInicialDePasos();
    let indice = 1;
    pasosOrdenInicio.forEach(p => {
      if (p.visible) {
        p.numero = indice++;
      }
    });
  }

  private reiniciarPasos() {
    const pasos = this.ordenInicialDePasos();
    pasos.forEach(p => {
      if (p !== this.pasos.informacionGeneral) {
        p.visible = false;
        p.numero = 0;
        p.tabs = [];
      }
    });
  }

  private validarPestana(paso: Paso, condicion: boolean, nombreTab: string, servicio?: ServicioProyectoLocal) {
    if (condicion) {
      paso.tabs = paso.tabs || [];
      paso.tabs.push({ visible: true, titulo: nombreTab, servicio: servicio } as Paso);
    }
  }

  private ordenInicialDePasos(): Paso[] {
    return [
      this.pasos.informacionGeneral,
      this.pasos.actualizaciones,
      this.pasos.complementaria,
      this.pasos.cronograma,
      this.pasos.presupuestal,
      this.pasos.componentes,
      this.pasos.planTrabajo,
      this.pasos.participantes,
      this.pasos.evaluadores,
      this.pasos.compromisos,
      this.pasos.documento,
      this.pasos.publicar
    ];
  }

  private crearPaso(index: number, nombre: string, visible: boolean, servicio?: ServicioProyectoLocal): Paso {
    return {
      numero: index,
      titulo: nombre,
      visible: visible,
      valido: true,
      servicio: servicio,
      tabs: []
    } as Paso;
  }

  obtenerPasos() {
    return this.pasos;
  }
}
