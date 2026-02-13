import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConvocatoriaFormulario } from '../../components/molecules/show-project/convocatoria-formulario';
import { EstadoConvocatoria } from '../../components/molecules/show-project/estado-convocatoria';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  private convocatoriaFormulario: BehaviorSubject<ConvocatoriaFormulario> =
    new BehaviorSubject<ConvocatoriaFormulario>(new ConvocatoriaFormulario());
  public modoVerDetalle = false;

  constructor() { }

  public calcularFormularioConvocatoriaEdicionPorEstado(estado: string, cantidadProyectos: number): void {
    this.convocatoriaFormulario = new BehaviorSubject<ConvocatoriaFormulario>(new ConvocatoriaFormulario());
    if (this.modoVerDetalle) {
      this.cargarFormularioModoVerDetalle();
      return;
    }
    switch (estado) {
      case EstadoConvocatoria.PRIVADA_EN_ELABORACION:
        this.cargarFormularioPrivadaEnElaboracion();
        break;
      case EstadoConvocatoria.PUBLICA_ABIERTA:
        this.cargarFormularioPublicaAbierta(cantidadProyectos);
        break;
      case EstadoConvocatoria.PUBLICA_CERRADA:
        this.cargarFormularioPublicaCerrada(cantidadProyectos);
        break;
      case EstadoConvocatoria.PUBLICA_FINALIZADA:
        this.cargarFormularioPublicaFinalizada();
        break;
      case EstadoConvocatoria.PUBLICA_PROXIMA:
        this.cargarFormularioPublicaProxima();
        break;
      default:
        break;
    }
  }

  estadoPrivadaEnElaboracion(estado: string) {
    return EstadoConvocatoria.PRIVADA_EN_ELABORACION === estado;
  }
  estadoPublicaProxima(estado: string) {
    return EstadoConvocatoria.PUBLICA_PROXIMA === estado;
  }
  estadoPublicaAbierta(estado: string) {
    return EstadoConvocatoria.PUBLICA_ABIERTA === estado;
  }
  estadoPublicaCerrada(estado: string) {
    return EstadoConvocatoria.PUBLICA_CERRADA === estado;
  }

  private cargarFormularioPrivadaEnElaboracion(): void {
  }

  private cargarFormularioPublicaAbierta(cantidadProyectos: number): void {

    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.fechaApertura = true;
    if (cantidadProyectos > 0) {

      // Información general
      this.obtenerFormularioConvocatoria().informacionGeneralFormulario.nombreCorto = true;
      this.obtenerFormularioConvocatoria().informacionGeneralFormulario.nombre = true;
      this.obtenerFormularioConvocatoria().informacionGeneralFormulario.botonAgregarFinanciador = true;
      this.obtenerFormularioConvocatoria().informacionGeneralFormulario.botonEliminarFinanciador = true;
      this.obtenerFormularioConvocatoria().informacionGeneralFormulario.procesoSeleccion = true;
      this.obtenerFormularioConvocatoria().informacionGeneralFormulario.periodoPresupuesto = true;
      this.obtenerFormularioConvocatoria().informacionGeneralFormulario.totalPeriodosPresupuesto = true;
      this.obtenerFormularioConvocatoria().informacionGeneralFormulario.inicioPeriodoPresupuesto = true;

      // presupuestal
      this.obtenerFormularioConvocatoria().presupuestalFormulario.modalidadesFormulario.accionesModalidad = true;
      this.obtenerFormularioConvocatoria().presupuestalFormulario.modalidadesFormulario.mensajeEdicionConProyectos = true;
      this.obtenerFormularioConvocatoria().presupuestalFormulario.rubroConvocatoriaFormulario.accionesRubros = true;
      this.obtenerFormularioConvocatoria().presupuestalFormulario.rubroConvocatoriaFormulario.mensajeEdicionConProyectos = true;
      this.obtenerFormularioConvocatoria().presupuestalFormulario.rubroPreautorizadoFormulario.accionesRubrosPreautorizados = true;
      this.obtenerFormularioConvocatoria().presupuestalFormulario.rubroPreautorizadoFormulario.mensajeEdicionConProyectos = true;
      this.obtenerFormularioConvocatoria().presupuestalFormulario.porcentajeMaximoFormulario.accionesPorcentajeMaximo = true;
      this.obtenerFormularioConvocatoria().presupuestalFormulario.porcentajeMaximoFormulario.mensajeEdicionConProyectos = true;

      // cronograma
      this.obtenerFormularioConvocatoria().cronogramaFormulario.botonAgregar = true;
      this.obtenerFormularioConvocatoria().cronogramaFormulario.evento = true;
      this.obtenerFormularioConvocatoria().cronogramaFormulario.fechaProcesoSeleccion = true;

      // Condiciones Compromisos
      this.obtenerFormularioConvocatoria().compromisosCondiciones.compromisoFormulario.accionesCompromisos = true;
      this.obtenerFormularioConvocatoria().compromisosCondiciones.compromisoFormulario.mensajeEdicionConProyectos = true;
      this.obtenerFormularioConvocatoria().compromisosCondiciones.condicionesFormulario.accionesCondiciones = true;
      this.obtenerFormularioConvocatoria().compromisosCondiciones.condicionesFormulario.mensajeEdicionConProyectos = true;

      // estructura proyecto
      this.obtenerFormularioConvocatoria().estructuraProyectoFormulario.botonAgregar = true;
      this.obtenerFormularioConvocatoria().estructuraProyectoFormulario.botonEliminar = true;
      this.obtenerFormularioConvocatoria().estructuraProyectoFormulario.titulo = true;
      this.obtenerFormularioConvocatoria().estructuraProyectoFormulario.explicacion = true;
      this.obtenerFormularioConvocatoria().estructuraProyectoFormulario.opcional = true;
    }
  }

  private cargarFormularioPublicaCerrada(cantidadProyectos: number): void {

    // Información general
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.procesoSeleccion = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.fechaCreacion = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.fechaPublicacion = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.fechaCierre = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.fechaApertura = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.nombre = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.nombreCorto = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.objetoDescripcion = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.comentario = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.urlDetalle = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.periodoPresupuesto = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.totalPeriodosPresupuesto = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.selectorRegistrador = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.nombreEncuesta = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.horaCierre = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.habilitarRegistro = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.listaFinanciadores = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.botonEliminarFinanciador = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.botonAgregarFinanciador = true;

    // presupuestal
    this.obtenerFormularioConvocatoria().presupuestalFormulario.modalidadesFormulario.accionesModalidad = true;
    this.obtenerFormularioConvocatoria().presupuestalFormulario.modalidadesFormulario.mensajeEdicionConProyectos = true;
    this.obtenerFormularioConvocatoria().presupuestalFormulario.rubroConvocatoriaFormulario.accionesRubros = true;
    this.obtenerFormularioConvocatoria().presupuestalFormulario.rubroConvocatoriaFormulario.mensajeEdicionConProyectos = true;
    this.obtenerFormularioConvocatoria().presupuestalFormulario.rubroPreautorizadoFormulario.accionesRubrosPreautorizados = true;
    this.obtenerFormularioConvocatoria().presupuestalFormulario.rubroPreautorizadoFormulario.mensajeEdicionConProyectos = true;
    this.obtenerFormularioConvocatoria().presupuestalFormulario.porcentajeMaximoFormulario.accionesPorcentajeMaximo = true;
    this.obtenerFormularioConvocatoria().presupuestalFormulario.porcentajeMaximoFormulario.mensajeEdicionConProyectos = true;
    this.obtenerFormularioConvocatoria().compromisosCondiciones.compromisoFormulario.accionesCompromisos = true;
    this.obtenerFormularioConvocatoria().compromisosCondiciones.compromisoFormulario.mensajeEdicionConProyectos = true;
    this.obtenerFormularioConvocatoria().compromisosCondiciones.condicionesFormulario.accionesCondiciones = true;
    this.obtenerFormularioConvocatoria().compromisosCondiciones.condicionesFormulario.mensajeEdicionConProyectos = true;

    // estructura proyecto
    this.obtenerFormularioConvocatoria().estructuraProyectoFormulario.botonAgregar = true;
    this.obtenerFormularioConvocatoria().estructuraProyectoFormulario.botonGuardar = true;
    this.obtenerFormularioConvocatoria().estructuraProyectoFormulario.botonEditar = true;
    this.obtenerFormularioConvocatoria().estructuraProyectoFormulario.botonEliminar = true;
    this.obtenerFormularioConvocatoria().estructuraProyectoFormulario.mensaje = true;

    // cronograma
    if (cantidadProyectos > 0) {
      this.obtenerFormularioConvocatoria().cronogramaFormulario.botonAgregar = true;
      this.obtenerFormularioConvocatoria().cronogramaFormulario.evento = true;
      this.obtenerFormularioConvocatoria().cronogramaFormulario.fechaProcesoSeleccion = true;
    }
  }

  private cargarFormularioPublicaFinalizada(): void {
    // Información general
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.procesoSeleccion = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.fechaCreacion = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.fechaPublicacion = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.fechaCierre = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.fechaResultados = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.fechaApertura = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.nombre = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.nombreCorto = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.objetoDescripcion = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.comentario = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.urlDetalle = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.periodoPresupuesto = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.totalPeriodosPresupuesto = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.inicioPeriodoPresupuesto = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.selectorRegistrador = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.nombreEncuesta = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.horaCierre = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.habilitarRegistro = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.listaFinanciadores = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.botonEliminarFinanciador = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.botonAgregarFinanciador = true;

    this.obtenerFormularioConvocatoria().cronogramaFormulario.botonAgregar = true;
    this.obtenerFormularioConvocatoria().cronogramaFormulario.botonEditar = true;
    this.obtenerFormularioConvocatoria().cronogramaFormulario.botonEliminar = true;
    this.obtenerFormularioConvocatoria().cronogramaFormulario.botonGuardar = true;
    this.obtenerFormularioConvocatoria().cronogramaFormulario.accionesCronograma = true;
    this.obtenerFormularioConvocatoria().presupuestalFormulario.modalidadesFormulario.accionesModalidad = true;
    this.obtenerFormularioConvocatoria().presupuestalFormulario.modalidadesFormulario.mensajeEdicionConProyectos = true;
    this.obtenerFormularioConvocatoria().presupuestalFormulario.rubroConvocatoriaFormulario.accionesRubros = true;
    this.obtenerFormularioConvocatoria().presupuestalFormulario.rubroConvocatoriaFormulario.mensajeEdicionConProyectos = true;
    this.obtenerFormularioConvocatoria().presupuestalFormulario.rubroPreautorizadoFormulario.accionesRubrosPreautorizados = true;
    this.obtenerFormularioConvocatoria().presupuestalFormulario.rubroPreautorizadoFormulario.mensajeEdicionConProyectos = true;
    this.obtenerFormularioConvocatoria().presupuestalFormulario.porcentajeMaximoFormulario.accionesPorcentajeMaximo = true;
    this.obtenerFormularioConvocatoria().presupuestalFormulario.porcentajeMaximoFormulario.mensajeEdicionConProyectos = true;
    this.obtenerFormularioConvocatoria().compromisosCondiciones.compromisoFormulario.accionesCompromisos = true;
    this.obtenerFormularioConvocatoria().compromisosCondiciones.compromisoFormulario.mensajeEdicionConProyectos = true;
    this.obtenerFormularioConvocatoria().compromisosCondiciones.condicionesFormulario.accionesCondiciones = true;
    this.obtenerFormularioConvocatoria().compromisosCondiciones.condicionesFormulario.mensajeEdicionConProyectos = true;

    // estructura proyecto
    this.obtenerFormularioConvocatoria().estructuraProyectoFormulario.botonAgregar = true;
    this.obtenerFormularioConvocatoria().estructuraProyectoFormulario.botonGuardar = true;
    this.obtenerFormularioConvocatoria().estructuraProyectoFormulario.botonEditar = true;
    this.obtenerFormularioConvocatoria().estructuraProyectoFormulario.botonEliminar = true;
    this.obtenerFormularioConvocatoria().estructuraProyectoFormulario.mensaje = true;
  }

  private cargarFormularioPublicaProxima(): void {
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.nombre = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.nombreCorto = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.botonAgregarFinanciador = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.botonEliminarFinanciador = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.procesoSeleccion = true;
  }

  private cargarFormularioModoVerDetalle(): void {
    this.cargarVerDetalleInformacionGeneral();
    this.cargarVerDetalleCronograma();
    this.cargarVerDetallePresupuestal();
    this.cargarVerDetalleCompromiso();
    this.cargarVerDetalleEstructura();
    this.obtenerFormularioConvocatoria().documentoSoporteFromulario.accionesDocumento = true;
    this.obtenerFormularioConvocatoria().cronogramaFormulario.fechaFinal = true;
  }

  cargarVerDetalleInformacionGeneral() {
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.procesoSeleccion = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.fechaCreacion = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.fechaPublicacion = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.fechaCierre = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.fechaApertura = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.fechaResultados = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.nombre = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.nombreCorto = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.objetoDescripcion = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.comentario = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.urlDetalle = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.periodoPresupuesto = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.totalPeriodosPresupuesto = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.inicioPeriodoPresupuesto = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.selectorRegistrador = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.maxInicioFormal = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.maxProrrogaIniFormal = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.maxProrrogaEjecucion = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.inicioConNN = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.tiempoParaSuspender = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.maxTiempoSuspendido = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.tiempoParaCancelar = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.maxTieEntCompro = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.maxTieAplazCompro = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.maxTiempoElegible = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.nombreEncuesta = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.horaCierre = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.habilitarRegistro = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.listaFinanciadores = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.botonEliminarFinanciador = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.pasoInformacionGeneral = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.botonAgregarFinanciador = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.botonGuardar = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.botonSiguiente = true;
    this.obtenerFormularioConvocatoria().informacionGeneralFormulario.disponibilidad = true;
  }

  cargarVerDetalleCronograma() {
    this.obtenerFormularioConvocatoria().cronogramaFormulario.botonAgregar = true;
    this.obtenerFormularioConvocatoria().cronogramaFormulario.botonEditar = true;
    this.obtenerFormularioConvocatoria().cronogramaFormulario.botonEliminar = true;
    this.obtenerFormularioConvocatoria().cronogramaFormulario.botonGuardar = true;
    this.obtenerFormularioConvocatoria().cronogramaFormulario.accionesCronograma = true;
    this.obtenerFormularioConvocatoria().cronogramaFormulario.fechaFinal = true;
  }

  cargarVerDetallePresupuestal() {
    this.obtenerFormularioConvocatoria().presupuestalFormulario.modalidadesFormulario.botonGuardar = true;
    this.obtenerFormularioConvocatoria().presupuestalFormulario.modalidadesFormulario.botonAgregar = true;
    this.obtenerFormularioConvocatoria().presupuestalFormulario.modalidadesFormulario.botonEditar = true;
    this.obtenerFormularioConvocatoria().presupuestalFormulario.modalidadesFormulario.botonEliminar = true;
    this.obtenerFormularioConvocatoria().presupuestalFormulario.modalidadesFormulario.botonSiguiente = true;
    this.obtenerFormularioConvocatoria().presupuestalFormulario.modalidadesFormulario.accionesModalidad = true;

    this.obtenerFormularioConvocatoria().presupuestalFormulario.rubroConvocatoriaFormulario.accionesRubros = true;
    this.obtenerFormularioConvocatoria().presupuestalFormulario.rubroPreautorizadoFormulario.accionesRubrosPreautorizados = true;
    this.obtenerFormularioConvocatoria().presupuestalFormulario.porcentajeMaximoFormulario.accionesPorcentajeMaximo = true;
  }

  cargarVerDetalleCompromiso() {
    this.obtenerFormularioConvocatoria().compromisosCondiciones.compromisoFormulario.accionesCompromisos = true;
    this.obtenerFormularioConvocatoria().compromisosCondiciones.condicionesFormulario.accionesCondiciones = true;
  }

  cargarVerDetalleEstructura() {
    this.obtenerFormularioConvocatoria().estructuraProyectoFormulario.botonAgregar = true;
    this.obtenerFormularioConvocatoria().estructuraProyectoFormulario.botonEditar = true;
    this.obtenerFormularioConvocatoria().estructuraProyectoFormulario.botonEliminar = true;
    this.obtenerFormularioConvocatoria().estructuraProyectoFormulario.botonGuardar = true;
    this.obtenerFormularioConvocatoria().estructuraProyectoFormulario.mensaje = false;
  }

  public obtenerFormularioConvocatoria(): ConvocatoriaFormulario {
    return this.convocatoriaFormulario.getValue();
  }
}
