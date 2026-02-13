import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RubroProyecto } from '../rubro-proyecto';
import { RubroAportante } from '../rubro-aportante';
import { CeldaRubroPorAportante } from '../celda-rubro-por-aportante';
import { MatDialog } from '@angular/material/dialog';
//import { AgregarRubroComponent } from '../agregar-rubro/agregar-rubro.component';
//import { EditarRubroComponent } from '../editar-rubro/editar-rubro.component';
import { RubroConvocatoria } from '../rubro-convocatoria';
import { TablaPresupuestal } from '../tabla-presupuestal';
import { takeUntil } from 'rxjs/operators';
//import { AjustePresupuestoConstantes } from 'src/app/ajuste-presupuesto/ajuste-presupuesto-constantes';
import { AccionesPresupuestalLocalService } from 'src/app/shared/services/show-project/acciones-presupuestal-local.service';
import { PresupuestalProyectoLocalService } from 'src/app/shared/services/show-project/presupuestal-proyecto-local.service';
import { PresupuestalProyectoService } from 'src/app/shared/services/show-project/presupuestal-proyecto.service';
import { ProyectoLocalService } from 'src/app/shared/services/show-project/proyecto-local.service';
import { AjustePresupuestoConstantes } from '../ajuste-presupuesto-constantes';

@Component({
  selector: 'app-tabla-presupuesto-proyecto',
  templateUrl: './tabla-presupuesto-proyecto.component.html',
  styleUrls: ['./tabla-presupuesto-proyecto.component.css']
})
export class TablaPresupuestoProyectoComponent implements OnInit, OnDestroy {

  readonly tiempoDeVidaMensaje = 10000;
  readonly numeroColumnasParaFresco = 1;
  readonly numeroColumnasParaAportante = 2;
  readonly numeroColumnasSubtotal = 3;
  numberPattern = '^[0-9]{0,11}$';

  @Input() editable: boolean;

  @Output() emitirErroresValidacion = new EventEmitter<string[]>();

  porcentajeVisible: boolean;
  datosSoloLectura: boolean;
  guardadoExitosamente: boolean;

  encabezados$: Observable<CeldaRubroPorAportante[]>;
  subtotales: RubroProyecto;
  listaRubrosProyecto: RubroProyecto[];

  listaAportantes: CeldaRubroPorAportante[];

  rubrosHabilitadosConvocatoria: RubroConvocatoria[] = [];

  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private dialogo: MatDialog,
    private accionesFormularioService: AccionesPresupuestalLocalService,
    private presupuestalProyectoLocalService: PresupuestalProyectoLocalService,
    private presupuestalProyectoService: PresupuestalProyectoService,
    private proyectoLocalServicio: ProyectoLocalService) {
  }

  ngOnInit() {
    this.encabezados$ = this.presupuestalProyectoLocalService.encabezados$;

    this.presupuestalProyectoLocalService.rubros$.subscribe(
      rubros => this.listaRubrosProyecto = rubros);

    this.presupuestalProyectoLocalService.subtotales$.subscribe(
      valor => this.subtotales = valor
    );

    this.presupuestalProyectoLocalService.inicializarTabla();

    // Acciones modal
    this.subscribirHastaDestruccion(this.accionesFormularioService.accionRubroAgregado$, rubro => this.agregarRubroPadre(rubro));
    this.subscribirHastaDestruccion(this.accionesFormularioService.accionSubrubroAgregado$,
      tuplaRubro => this.agregarRubroHijo(tuplaRubro[0], tuplaRubro[1]));

    this.subscribirHastaDestruccion(this.accionesFormularioService.accionEdicionFinalizada$,
      tuplaRubro => this.edicionRealizada(tuplaRubro[0], tuplaRubro[1]));

    // Acciones contenedor (pestaña)
    this.subscribirHastaDestruccion(this.accionesFormularioService.accionVerResumen$, estado => this.datosSoloLectura = estado);
    this.subscribirHastaDestruccion(this.accionesFormularioService.accionGuardar$, _ => this.guardarTablaPresupuestal());
    this.subscribirHastaDestruccion(this.accionesFormularioService.accionVerPorcentaje$, estado => this.porcentajeVisible = estado);
    this.subscribirHastaDestruccion(this.accionesFormularioService.accionAmpliarTodo$,
      _ => this.presupuestalProyectoLocalService.ampliarTodo());
    this.subscribirHastaDestruccion(this.accionesFormularioService.accionReducirTodo$,
      _ => this.presupuestalProyectoLocalService.reducirTodo());
  }

  guardarTablaPresupuestal() {
    const inconsistenciasReglas = this.presupuestalProyectoLocalService.validarPorcentajes();
    const inconsistenciasModalidad = this.presupuestalProyectoLocalService.validarFinanciadorConModalidad();

    const inconsistencias = inconsistenciasReglas.concat(inconsistenciasModalidad);
    this.emitirErroresValidacion.emit(inconsistencias);

    const proyecto = this.proyectoLocalServicio.obtenerInformacionGeneralProyecto();

    if (inconsistencias.length === 0) {
      const tabla = new TablaPresupuestal();

      this.generarListaAportantesModelo(this.listaRubrosProyecto);
      this.generarModeloAportantesEnRubro(this.subtotales);

      tabla.rubros = this.listaRubrosProyecto;
      tabla.subtotales = this.subtotales;
      tabla.moneda = AjustePresupuestoConstantes.MONEDA_NACIONAL;

      this.presupuestalProyectoService.guardarTablaPresupuestal(tabla)
        .subscribe(r => {
          this.presupuestalProyectoLocalService.actualizarIdentificadores(r);
          this.presupuestalProyectoLocalService.actualizarTotalAportantes();
          this.guardadoExitosamente = true;
          this.programarEsconderMensaje();
        });
    }
  }

  private programarEsconderMensaje() {
    setInterval(() => this.guardadoExitosamente = false , this.tiempoDeVidaMensaje);
  }

  private generarListaAportantesModelo(rubros: RubroProyecto[]) {
    rubros.forEach(rubro => {
      this.generarModeloAportantesEnRubro(rubro);
      this.generarListaAportantesModelo(rubro.rubrosHijos);
    });
  }

  private generarModeloAportantesEnRubro(rubro: RubroProyecto) {
    rubro.aportantes = [];
    rubro.listaRubrosPorAportantes.forEach(
      a => {
        a.frescos.forEach(f => rubro.aportantes.push(f));
        if (a.esUdea) {
          rubro.aportantes.push(a.aportanteEnEspecie);
        }
      });
  }

  // Acciones de subrubros

  abrirModalAgregarRubro(padre: RubroProyecto) {
    // const options = {
    //   padre: padre,
    //   proyecto: this.proyectoLocalServicio.obtenerInformacionGeneralProyecto()
    // };
    // this.dialogo.open(AgregarRubroComponent, { data: options });
  }

  abrirModalEdicion(rubro: RubroProyecto) {
    const esSubrubro = this.presupuestalProyectoLocalService.esSubrubro(rubro);
    let padre: RubroProyecto;

    if (!esSubrubro) {
      padre = this.presupuestalProyectoLocalService.encontrarRubroPadre(rubro);
    }

    const options = {
      rubro: rubro,
      esSubrubro: !esSubrubro,
      padre: padre,
    };
    this.dialogo.open(EditarRubroComponent, { data: options });
  }

  eliminarRubro(rubro: RubroProyecto) {
    this.presupuestalProyectoLocalService.eliminarRubro(rubro);
  }

  agregarRubroPadre(rubro: RubroProyecto) {
    this.presupuestalProyectoLocalService.agregarRubro(rubro);
  }

  agregarRubroHijo(rubro: RubroProyecto, padre: RubroProyecto) {
    this.presupuestalProyectoLocalService.agregarSubrubro(rubro, padre);
  }

  private edicionRealizada(rubro: RubroProyecto, padre: RubroProyecto): void {
    this.presupuestalProyectoLocalService.actualizarRubro(rubro, padre);
  }

  mostrarOcultarHijos(rubro: RubroProyecto) {
    rubro.hijosVisibles = !rubro.hijosVisibles;
  }

  // Utilidades

  extraerTitulo(encabezado: CeldaRubroPorAportante) {
    const rubro = encabezado.aportanteEnEspecie || encabezado.frescos[0];
    return rubro.aportante.personaJuridica.nombreCorto;
  }

  extraerTituloDependencia(encabezado: RubroAportante) {
    return this.presupuestalProyectoLocalService.extraerTituloDependencia(encabezado);
  }

  numeroDeColumnas(encabezado: CeldaRubroPorAportante): number {
    const columnasPorAportante = !!this.porcentajeVisible ? this.numeroColumnasParaAportante + 1 : this.numeroColumnasParaAportante;
    const columnasPorFresco = !!this.porcentajeVisible ? this.numeroColumnasParaFresco + 1 : this.numeroColumnasParaFresco;
    return encabezado.esUdea ? ((encabezado.frescos || []).length * columnasPorFresco) + 1 : columnasPorAportante;
  }

  numeroDeColumnasSeccionSubtotales(): number {
    return !!this.porcentajeVisible ? this.numeroColumnasSubtotal + 1 : this.numeroColumnasSubtotal;
  }

  deshabilitarRubroAportante(rubro: RubroProyecto, rubroAportante: RubroAportante) {
    return (!!rubro.rubrosHijos && rubro.rubrosHijos.length > 0)
      || !rubroAportante.habilitado;
  }

  esUltimoHijo(rubro: RubroProyecto): boolean {
    return this.presupuestalProyectoLocalService.esUltimoHijo(rubro);
  }

  // Sumatorias

  recalcularFresco(rubroModificado: RubroProyecto, rubroPorAportanteActualizar: RubroAportante) {
    this.presupuestalProyectoLocalService.recalcularFrescosPadrePorAportante(rubroModificado, rubroPorAportanteActualizar.aportante);
  }

  recalcularEspecie(rubroModificado: RubroProyecto, rubroPorAportanteActualizar: RubroAportante) {
    this.presupuestalProyectoLocalService.recalcularEspeciePadrePorAportante(rubroModificado, rubroPorAportanteActualizar.aportante);
  }

  private subscribirHastaDestruccion<T>(observable$: Observable<T>, funcionDeSubscripcion: (next: T) => void) {
    observable$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(v => funcionDeSubscripcion(v));
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.presupuestalProyectoLocalService.eliminarSubscripciones();
  }
}
