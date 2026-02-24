import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InformacionGeneralConvocatoria } from '../../components/molecules/show-project/informacion-general-convocatoria';
import { PersonaJuridica } from '../../components/molecules/show-project/persona-juridica';
import { ProgramaFinanciador } from '../../components/molecules/show-project/programa-financiador';
import { CronogramaConvocatoria } from '../../components/molecules/show-project/cronograma';
import { ModalidadConvocatoria } from '../../components/molecules/show-project/modalidad-convocatoria';
import { InformacionGeneral } from '../../components/molecules/show-project/informacion-general';
import { EtapaSeleccion } from '../../components/molecules/show-project/etapa-seleccion';
import { NivelInstancia } from '../../components/molecules/show-project/nivel-instancia';
import { CondicionFormalConvocatoria } from '../../components/molecules/show-project/condicion-formal-convocatoria';
import { Compromiso } from '../../components/molecules/show-project/compromiso';
import { EstructuraProyecto } from '../../components/molecules/show-project/estructura-proyecto';
import { RubroConvocatoria } from '../../components/molecules/show-project/rubro-convocatoria';
import { DocumentoSoporte } from '../../components/molecules/show-project/documento-soporte';
import { DocumentoConvocatoria } from '../../components/molecules/show-project/documento-convocatoria';
import { RubroPreautorizado } from '../../components/molecules/show-project/rubro-preautorizado';
import { FinanciadorConvocatoria } from '../../components/molecules/show-project/financiador-convocatoria';
import { PorcentajeMaximoRubros } from '../../components/molecules/show-project/porcentaje-maximo-rubros';
import { EstadoConvocatoria } from '../../components/molecules/show-project/estado-convocatoria';
import { NivelAdministrativo } from '../../components/molecules/show-project/nivel-administrativo';
import { InstanciaAdministrativa } from '../../components/molecules/show-project/instancia-administrativa';
import { TipoRubroPreautorizado } from '../../components/molecules/show-project/tipo-rubro-preautorizado';
import { TipoRubroPreaut } from '../../components/molecules/show-project/tipo-rubro-preaut';

@Injectable({
  providedIn: 'root'
})
export class ConvocatoriaLocalService {

  informacionGeneralConvocatoria: InformacionGeneralConvocatoria = {} as InformacionGeneralConvocatoria;
  listaPersonaJuridica!: PersonaJuridica[];
  programaFinanciadorConvocatoria!: ProgramaFinanciador;
  private cronograma: BehaviorSubject<CronogramaConvocatoria> =
    new BehaviorSubject<CronogramaConvocatoria>(new CronogramaConvocatoria());
  public cronogramaObservable = this.cronograma.asObservable();
  listaModalidadFinanciacion: ModalidadConvocatoria[] = [];
  private informacionGeneralProcesoSeleccion!: InformacionGeneral;
  private listaEtapasSeleccionProcesoSeleccion: EtapaSeleccion[] = [];
  private listaNivelInstanciaProcesoSeleccion: NivelInstancia[] = [];
  private listaCondicionesFormalesConvocatoria: CondicionFormalConvocatoria[] = [];

  public listaModalidadConvocatoria: BehaviorSubject<ModalidadConvocatoria[]> = new BehaviorSubject<ModalidadConvocatoria[]>(BehaviorSubject.create());
  public listaCompromisos: BehaviorSubject<Compromiso[]> = new BehaviorSubject<Compromiso[]>(BehaviorSubject.create());
  public listaCondicionesConvocatoria: BehaviorSubject<CondicionFormalConvocatoria[]> = new BehaviorSubject<CondicionFormalConvocatoria[]>(BehaviorSubject.create());
  private listaEstructuraProyectos: BehaviorSubject<EstructuraProyecto> = new BehaviorSubject<EstructuraProyecto>(BehaviorSubject.create());
  public listaEstructuraProyectosObservable = this.listaEstructuraProyectos.asObservable();
  private listaRubrosConvocatoria: BehaviorSubject<RubroConvocatoria[]> = new BehaviorSubject<RubroConvocatoria[]>(BehaviorSubject.create());
  public listaRubrosConvocatoriaObservable = this.listaRubrosConvocatoria.asObservable();
  public listaDocumentosSoporte: BehaviorSubject<DocumentoSoporte[]> = new BehaviorSubject<DocumentoSoporte[]>(BehaviorSubject.create());
  public listaDocumentosConvocatoria: BehaviorSubject<DocumentoConvocatoria[]> = new BehaviorSubject<DocumentoConvocatoria[]>(BehaviorSubject.create());
  public listaRubroPreautorizado: BehaviorSubject<RubroPreautorizado[]> = new BehaviorSubject<RubroPreautorizado[]>(BehaviorSubject.create());
  public listaFinanciadoresSeleccionados: BehaviorSubject<FinanciadorConvocatoria[]> = new BehaviorSubject<FinanciadorConvocatoria[]>(BehaviorSubject.create());
  private listaPorcentajeMaximoRubros: BehaviorSubject<PorcentajeMaximoRubros[]> = new BehaviorSubject<PorcentajeMaximoRubros[]>(BehaviorSubject.create());
  public listaPorcentajeMaximoRubrosObservable = this.listaPorcentajeMaximoRubros.asObservable();
  private estadoConvocatoria = EstadoConvocatoria.PRIVADA_EN_ELABORACION.toString();
  private cantidadProyectos = 0;

  constructor() {
    const listaEstructuraProyectos = {} as EstructuraProyecto;
    this.listaEstructuraProyectos.next(listaEstructuraProyectos);
  }

  guardarEstadoConvocatoria(estado: string) {
    this.estadoConvocatoria = estado;
  }

  obtenerEstadoConvocatoria(): string {
    return this.estadoConvocatoria;
  }

  guardarCantidadProyectosAsociados(proyectos: number) {
    this.cantidadProyectos = proyectos;
  }

  obtenerCantidadProyectosAsociados(): number {
    return this.cantidadProyectos;
  }

  guardarInformacionGeneralConvocatoria(informacionGeneralConvocatoria: InformacionGeneralConvocatoria) {
    this.informacionGeneralConvocatoria = informacionGeneralConvocatoria;
  }

  guardarFinanciadoresConvocatoria(listaPersonaJuridica: PersonaJuridica[]) {
    this.listaPersonaJuridica = listaPersonaJuridica;
  }

  obtenerInformacionGeneralConvocatoria() {
    return this.informacionGeneralConvocatoria;
  }

  obtenerListaFinanciadores() {
    return this.listaPersonaJuridica;
  }

  guardarProgramaFinanciadorConvocatoria(programaFinanciador: ProgramaFinanciador) {
    this.programaFinanciadorConvocatoria = programaFinanciador;
  }

  obtenerProgramaFinanciadorConvocatoria(): ProgramaFinanciador {
    return this.programaFinanciadorConvocatoria;
  }

  obtenerCronograma(): CronogramaConvocatoria {
    return this.cronograma.getValue();
  }

  guardarCronograma(cronograma: CronogramaConvocatoria) {
    this.cronograma.next(cronograma);
  }

  obtenerListaCompromisos(): Compromiso[] {
    return this.listaCompromisos.getValue();
  }

  obtenerListaModalidadesConvocatoria(): ModalidadConvocatoria[] {
    return this.listaModalidadConvocatoria.getValue();
  }

  agregarModalidadConvocatoria(listaModalidadesConvocatoria: ModalidadConvocatoria[]) {
    this.listaModalidadConvocatoria.next(listaModalidadesConvocatoria);
  }

  guardarInformacionGeneralProcesoSeleccion(informacion: InformacionGeneral) {
    this.informacionGeneralProcesoSeleccion = informacion;
  }

  guardarEtapaSeleccion(etapaSeleccion: EtapaSeleccion): void {
    const nivelAdministrativo: NivelAdministrativo = etapaSeleccion.nivelAdministrativo;
    const instanciaAdministrativa: InstanciaAdministrativa = etapaSeleccion.instanciaAdministrativa;
    this.guardarNivelInstancia(nivelAdministrativo, instanciaAdministrativa);
    this.listaEtapasSeleccionProcesoSeleccion.push(etapaSeleccion);
  }

  guardarNivelInstancia(nivel: NivelAdministrativo, instancia: InstanciaAdministrativa): void {
    const nivelInstancia: NivelInstancia = {
      nivelAdministrativo: nivel,
      instanciaAdministrativa: instancia
    };

    if (!this.listaNivelInstanciaProcesoSeleccion.some((item) => item.instanciaAdministrativa.identificador
      === instancia.identificador && item.nivelAdministrativo.identificador === nivel.identificador)) {
      this.listaNivelInstanciaProcesoSeleccion.push(nivelInstancia);
    }
  }

  obtenerNivelInstancia(): NivelInstancia[] {
    return this.listaNivelInstanciaProcesoSeleccion;
  }
  guardarlistaCondicionesFormalesConvocatoria(listaCondicionesFormalesConvocatoria: CondicionFormalConvocatoria[]) {
    this.listaCondicionesFormalesConvocatoria = listaCondicionesFormalesConvocatoria;
  }

  guardarCondicionesConvocatoria(listaCondiciones: CondicionFormalConvocatoria[]) {
    this.listaCondicionesConvocatoria.next(listaCondiciones);
  }

  obtenerListaCondicionesFormalesConvocatoria(): CondicionFormalConvocatoria[] {
    return this.listaCondicionesConvocatoria.getValue();
  }

  editarCondicionFormalConvocatoria(condicionEditar: CondicionFormalConvocatoria, condicionEditada: CondicionFormalConvocatoria) {
    if (this.listaCondicionesFormalesConvocatoria.some((item) => item === condicionEditar)) {
      const index = this.listaCondicionesFormalesConvocatoria.indexOf(condicionEditar);
      this.listaCondicionesFormalesConvocatoria.splice(index, 1);
      this.listaCondicionesFormalesConvocatoria.push(condicionEditada);
    }
  }

  agregarCompromisos(listaCompromisos: Compromiso[]) {
    this.listaCompromisos.next(listaCompromisos);
  }

  obtenerListaRubrosConvocatoria(): RubroConvocatoria[] {
    return this.listaRubrosConvocatoria.getValue();
  }

  agregarRubrosConvocatoria(listaRubros: RubroConvocatoria[]) {
    this.listaRubrosConvocatoria.next(listaRubros);
  }

  obtenerEstructuraProyecto() {
    return this.listaEstructuraProyectos;

  }

  obtenerListaDocumentosConvocatoria(): DocumentoConvocatoria[] {
    return this.listaDocumentosConvocatoria.getValue();
  }

  guardarDocumentosConvocatoria(listaDocumentos: DocumentoConvocatoria[]) {
    this.listaDocumentosConvocatoria.next(listaDocumentos);
  }

  agregarRubrosPreautorizados(listaRubros: RubroPreautorizado[]) {
    this.listaRubroPreautorizado.next(listaRubros);
  }

  obtenerListaRubrosPreautorizados(): RubroPreautorizado[] {
    return this.listaRubroPreautorizado.getValue();
  }

  obtenerListaTipoRubrosPreautorizados(): TipoRubroPreautorizado[] {
    const listaTipoRubro: TipoRubroPreautorizado[] = [
      { nombre: 'Valor fresco aprobado por el financiador', tipoRubroPreaut: TipoRubroPreaut.FRESCO_FINANCIADOR },
      { nombre: 'Valor fresco aprobado para el proyecto', tipoRubroPreaut: TipoRubroPreaut.FRESCO_PROYECTO },
      { nombre: 'Valor fresco aprobado del rubro destino', tipoRubroPreaut: TipoRubroPreaut.FRESCO_RUBRO_DESTINO },
      { nombre: 'Valor total aprobado por el financiador', tipoRubroPreaut: TipoRubroPreaut.TOTAL_FINANCIADOR },
      { nombre: 'Valor total aprobado para el proyecto', tipoRubroPreaut: TipoRubroPreaut.TOTAL_PROYECTO },
      { nombre: 'Valor total aprobado del rubro destino', tipoRubroPreaut: TipoRubroPreaut.TOTAL_RUBRO_DESTINO },
    ];
    return listaTipoRubro;
  }

  agregarListaFinanciadoresSeleccionados(listaFinanciadores: FinanciadorConvocatoria[]) {
    this.listaFinanciadoresSeleccionados.next(listaFinanciadores);
  }

  obtenerListaFinanciadoresSeleccionados(): FinanciadorConvocatoria[] {
    return this.listaFinanciadoresSeleccionados.getValue();
  }

  obtenerListaPorcenajeMaximoRubros(): PorcentajeMaximoRubros[] {
    return this.listaPorcentajeMaximoRubros.getValue();
  }

  agregarPorcentajeMaximoRubros(listaPorcentaje: PorcentajeMaximoRubros[]) {
    this.listaPorcentajeMaximoRubros.next(listaPorcentaje);
  }

}

