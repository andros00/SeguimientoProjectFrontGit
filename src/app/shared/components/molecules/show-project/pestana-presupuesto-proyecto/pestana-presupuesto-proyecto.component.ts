import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RubroProyecto } from '../rubro-proyecto';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InformacionGeneralProyecto } from '../informacion-general-proyecto';
import { ProyectoConstantes } from '../proyecto-constantes';
import { PresupuestalProyectoService } from 'src/app/shared/services/show-project/presupuestal-proyecto.service';
import { PresupuestalProyectoLocalService } from 'src/app/shared/services/show-project/presupuestal-proyecto-local.service';
import { PasosHabilitadosLocalService } from 'src/app/shared/services/show-project/pasos-habilitados-local.service';
import { ProyectoLocalService } from 'src/app/shared/services/show-project/proyecto-local.service';
import { AccionesPresupuestalLocalService } from 'src/app/shared/services/show-project/acciones-presupuestal-local.service';

@Component({
  selector: 'app-pestana-presupuesto-proyecto',
  templateUrl: './pestana-presupuesto-proyecto.component.html',
  styleUrls: ['./pestana-presupuesto-proyecto.component.css']
})
export class PestanaPresupuestoProyectoComponent implements OnInit, OnDestroy {

  @Input() editable = false;

  listadoCodigoMonedas: string[] = [];
  datosSoloLectura = true;
  porcentajeVisible = false;
  ampliado = false;
  mostrarComponentes: boolean;
  proyecto: InformacionGeneralProyecto;
  rubros: RubroProyecto[];
  pesos = 'COP';
  inconsistencias: string[] = [];
  mensajesTipoMoneda = ProyectoConstantes;

  private unsubscribe: Subject<void> = new Subject();

  constructor(public dialogo: MatDialog,
    private presupuestalProyectoService: PresupuestalProyectoService,
    private presupuestalProyectoLocalService: PresupuestalProyectoLocalService,
    private accionesFormularioService: AccionesPresupuestalLocalService,
    private pasosHabilitadosLocalService: PasosHabilitadosLocalService,
    private proyectoLocalServicio: ProyectoLocalService) { }

  ngOnInit() {
    this.proyecto = this.proyectoLocalServicio.obtenerInformacionGeneralProyecto();
    const esMacroproyecto = this.proyecto.tipoProyectoMacro;
    this.mostrarComponentes = this.pasosHabilitadosLocalService.esSoloLectura() && (!!esMacroproyecto);

    this.presupuestalProyectoLocalService.rubros$.subscribe(
      rubros => this.rubros = rubros );

    this.presupuestalProyectoService.consultarTiposDeMoneda().subscribe(
      monedas => this.listadoCodigoMonedas = monedas
    );

    this.subscribirHastaDestruccion(this.accionesFormularioService.accionVerResumen$, estado => this.datosSoloLectura = estado);
    this.subscribirHastaDestruccion(this.accionesFormularioService.accionVerPorcentaje$, estado => this.porcentajeVisible = estado);

    if (!this.editable && !this.datosSoloLectura) {
      this.emitirEventoVerResumen();
    }
  }

  abrirModalAgregarRubro() {
    // const options = {
    //   rubrosAgregados: this.rubros,
    //   proyecto: this.proyecto
    // };
    // this.dialogo.open(AgregarRubroComponent, { data: options });
  }

  guardarTablaPresupuesta() {
    this.accionesFormularioService.guardarPresupuesto();
  }

  emitirEventoVerResumen() {
    this.accionesFormularioService.verResumen();
  }

  emitirEventoVerPorcentaje() {
    this.accionesFormularioService.verPorcentaje();
  }

  onAmpliarSubrubros(evento) {
    if (!!evento && !!evento.checked) {
      this.ampliado = true;
      this.ampliarTodo();
    } else {
      this.ampliado = false;
      this.reducirTodo();
    }
  }

  reducirTodo() {
    this.accionesFormularioService.reducirTodo();
  }

  ampliarTodo() {
    this.accionesFormularioService.ampliarTodo();
  }

  onErroresValidacion(event: string[]) {
    this.inconsistencias = event;
  }

  rubrosVacios(): boolean {
    return !this.rubros || this.rubros.length === 0;
  }

  private subscribirHastaDestruccion<T>(observable$: Observable<T>, funcionDeSuscripcion: (next: T) => void) {
    observable$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(v => funcionDeSuscripcion(v));
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
