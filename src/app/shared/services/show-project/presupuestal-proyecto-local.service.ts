import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AportanteProyectoLocalService } from './aportante-proyecto-local.service';
import { ProyectoLocalService } from './proyecto-local.service';
import { ServicioProyectoLocal } from './servicio-proyecto-local';
import { PorcentajeMaximoRubros } from '../../components/molecules/show-project/porcentaje-maximo-rubros';
import { RubroConvocatoria } from '../../components/molecules/show-project/rubro-convocatoria';
import { UdeaConstantes } from '../../components/molecules/show-project/udea-constantes';
import { PresupuestalConstantes } from '../../components/molecules/show-project/tabla-presupuesto';
import { AportanteProyecto } from '../../components/molecules/show-project/aportante-proyecto';
import { CeldaRubroPorAportante } from '../../components/molecules/show-project/celda-rubro-por-aportante';
import { RubroAportante } from '../../components/molecules/show-project/rubro-aportante';
import { RubroProyecto } from '../../components/molecules/show-project/rubro-proyecto';
import { TablaPresupuestal } from '../../components/molecules/show-project/tabla-presupuestal';
import { ProyectoConstantes } from '../../components/molecules/show-project/proyecto-constantes';
import { ProyectoMensajes } from '../../components/molecules/show-project/proyecto-mensajes';
import { PresupuestalOperacionesLocalService } from './presupuestal-operaciones-local.service';
import { PresupuestalProyectoService } from './presupuestal-proyecto.service';

@Injectable({
  providedIn: 'root'
})
export class PresupuestalProyectoLocalService implements ServicioProyectoLocal {

  private encabezadosSubject = new BehaviorSubject<CeldaRubroPorAportante[]>(new Array<CeldaRubroPorAportante>());
  encabezados$ = this.encabezadosSubject.asObservable();

  private subtotalesSubject = new BehaviorSubject<RubroProyecto>(new RubroProyecto());
  subtotales$ = this.subtotalesSubject.asObservable();

  private rubrosSubject = new BehaviorSubject<RubroProyecto[]>(new Array<RubroProyecto>());
  rubros$ = this.rubrosSubject.asObservable();

  private monedaSubject = new BehaviorSubject<string>('');

  private rubrosHabilitadosConvocatoria: RubroConvocatoria[] = [];
  private porcentajeMaximoRubros: PorcentajeMaximoRubros[] = [];

  private subsEncabezados: Subscription;
  private subsAportanteAgregado: Subscription;
  private subsAportanteEliminado: Subscription;

  constructor(
    private presupuestalProyectoService: PresupuestalProyectoService,
    private servicioLocalProyecto: ProyectoLocalService,
    private aportanteProyectoLocalService: AportanteProyectoLocalService,
    private operacionesLocalService: PresupuestalOperacionesLocalService) { }

  public configurarValores(rubros: any[], subtotales: any) {
      this.rubrosSubject.next(rubros);
      this.subtotalesSubject.next(subtotales);
    }


  guardarMoneda(moneda: string) {
    this.monedaSubject.next(moneda);
  }

  inicializarTabla() {
    this.cargarRubrosHabilitadosEnConvocatoria();
    this.cargarDeReglasPorcentajeMaximo();

    this.subsEncabezados = this.aportanteProyectoLocalService.listaAportanteObservable.subscribe(
      aportantesParametro => {
        const listadoAportantes = aportantesParametro.slice(0);
        listadoAportantes.sort((a, b) => this.operacionesLocalService.ordenarAportantes(a, b));

        const encabezadosAgrupados = this.agruparEncabezados(listadoAportantes);

        const subtotales = new RubroProyecto();
        subtotales.listaRubrosPorAportantes = encabezadosAgrupados;
        subtotales.totalFrescoSolicitado = 0;
        subtotales.totalEspecieSolicitado = 0;
        subtotales.porcentajeSubtotalFresco = 0;

        this.encabezadosSubject.next(encabezadosAgrupados);
        this.subtotalesSubject.next(subtotales);

        this.calcularPorcentajeDeTabla();
      });
    this.subsAportanteAgregado = this.aportanteProyectoLocalService.aportanteAgregado$.subscribe(
      aportante => {
        this.agregarAportanteProyecto(aportante);
      });

    this.subsAportanteEliminado = this.aportanteProyectoLocalService.aportanteEliminado$.subscribe(
      aportante => this.eliminarAportanteProyecto(aportante));
  }

  eliminarSubscripciones() {
    if (!!this.subsEncabezados && !this.subsEncabezados.closed) {
      this.subsEncabezados.unsubscribe();
      this.subsAportanteAgregado.unsubscribe();
      this.subsAportanteEliminado.unsubscribe();
    }
  }

  private cargarRubrosHabilitadosEnConvocatoria() {
    this.aportanteProyectoLocalService.obtenerRubrosHabilitadosConvocatoria(PresupuestalConstantes.codigoConvocatoria)
      .subscribe(
        listaRubros => {
          this.rubrosHabilitadosConvocatoria = listaRubros;
          this.evaluarAportantesHabilitados();
        }
      );
  }

  private cargarDeReglasPorcentajeMaximo() {
    if (this.esProyectoDeConvocatoria()) {
      const codigoConvocatoria = this.servicioLocalProyecto.obtenerInformacionGeneralProyecto().convocatoria.identificador;
      this.presupuestalProyectoService.consultarPorcentajesMaximos(codigoConvocatoria).subscribe(
        reglas => this.porcentajeMaximoRubros = reglas);
    }
  }

  private agruparEncabezados(aportantes: AportanteProyecto[]): CeldaRubroPorAportante[] {
    const encabezados: CeldaRubroPorAportante[] = [];
    aportantes.forEach(a => {
      const rubroPorAportante = new RubroAportante();
      rubroPorAportante.aportante = a;
      rubroPorAportante.frescoSolicitado = a.totalFrescoSolicitado || 0;
      rubroPorAportante.especieSolicitado = a.totalEspecieSolicitado || 0;
      rubroPorAportante.porcentaje = 0;

      if (this.operacionesLocalService.esUdeA(a)) {
        let encabeazadoUdea = encabezados.find(e => e.esUdea);
        if (!(!!encabeazadoUdea)) {
          encabeazadoUdea = new CeldaRubroPorAportante();
          encabeazadoUdea.frescos = [];
          encabeazadoUdea.esUdea = true;
        }
        if (a.dependencia === null && a.grupo === null) {
          encabeazadoUdea.aportanteEnEspecie = rubroPorAportante;
        } else {
          encabeazadoUdea.frescos.push(rubroPorAportante);
        }

        if (!encabezados.includes(encabeazadoUdea)) {
          encabezados.push(encabeazadoUdea);
        }
      } else {
        const encabezado = new CeldaRubroPorAportante();
        encabezado.frescos = [rubroPorAportante];

        encabezados.push(encabezado);
      }
    });

    const aportanteUdea = encabezados.find(a => a.esUdea);
    if (!!aportanteUdea) {
      aportanteUdea.frescos.sort((a, b) => this.ordenarDependenciasUdeA(a, b));
    }

    return encabezados;
  }

  cargarRubrosExistentes(presupuesto: TablaPresupuestal) {
    const listadoAportantes = this.aportanteProyectoLocalService.obtenerListaAportante();

    if (!!presupuesto) {
      presupuesto.rubros.forEach(rubro => {
        this.cargarRubroExistenteRecursivo(rubro, listadoAportantes);
      });
      this.operacionesLocalService.ordenarRubros(presupuesto.rubros);

      this.rubrosSubject.next(presupuesto.rubros);
    }
  }

  calcularPorcentajeDeTabla() {
    const rubros = this.rubrosSubject.getValue();
    if (rubros.length > 0) {
      const listadoAportantes = this.aportanteProyectoLocalService.obtenerListaAportante();
      listadoAportantes.forEach(aportante => {
        rubros.forEach(rubro => {
          const rubroAportantePadre = this.operacionesLocalService.buscarAportante(rubro, aportante);
          if (!!rubroAportantePadre) {
            this.calcularPorcentajesHijosRecursivo(rubro.rubrosHijos, rubroAportantePadre.frescoSolicitado, aportante);
          }
        });

        this.operacionesLocalService.recalcularPorcentajeDePadresEnColumna(
          rubros,
          this.subtotalesSubject.getValue(),
          aportante);
      });

      const subtotales = this.subtotalesSubject.getValue();
      this.operacionesLocalService.calcularSumatoriaSubtotalFresco(rubros, subtotales);
      this.operacionesLocalService.calcularSumatoriaSubtotalEspecie(rubros, subtotales);
      this.operacionesLocalService.calcularPorcentajesFrescoSeccionSubtotal(rubros, subtotales);
    }
  }

  evaluarAportantesHabilitados() {
    const rubros = this.rubrosSubject.getValue();
    if (rubros.length > 0) {
      rubros.forEach(rubro => {
        rubro.listaRubrosPorAportantes.forEach(celda => {
          celda.frescos.forEach(rubroAportante => {
            rubroAportante.habilitado = this.aportanteHabilitadoParaRubro(rubroAportante.aportante, rubro);

            this.marcarHabilitadosEnRubrosHijosRecursivo(rubro.rubrosHijos, rubroAportante);
          });

          if (celda.esUdea) {
            celda.aportanteEnEspecie.habilitado = this.aportanteHabilitadoParaRubro(celda.aportanteEnEspecie.aportante, rubro);

            this.marcarHabilitadosEnRubrosHijosRecursivo(rubro.rubrosHijos, celda.aportanteEnEspecie);
          }
        });
      });
    }
  }

  private marcarHabilitadosEnRubrosHijosRecursivo(hijos: RubroProyecto[], rubroAportante: RubroAportante) {
    hijos.forEach(hijo => {
      const rubroAportanteHijo = this.operacionesLocalService.buscarAportante(hijo, rubroAportante.aportante);
      rubroAportanteHijo.habilitado = rubroAportante.habilitado;

      this.marcarHabilitadosEnRubrosHijosRecursivo(hijo.rubrosHijos, rubroAportante);
    });
  }

  private calcularPorcentajesHijosRecursivo(rubrosHijos: RubroProyecto[], frescoBasePadre: number, aportante: AportanteProyecto) {
    this.operacionesLocalService.recalcularPorcentajeDeHijos(
      rubrosHijos,
      frescoBasePadre,
      aportante);

    rubrosHijos.forEach(hijo => {
      const rubroAportantePadre = this.operacionesLocalService.buscarAportante(hijo, aportante);
      this.calcularPorcentajesHijosRecursivo(hijo.rubrosHijos, rubroAportantePadre.frescoSolicitado, aportante);
    });
  }

  private cargarRubroExistenteRecursivo(rubro: RubroProyecto, listadoAportantes: AportanteProyecto[]) {
    rubro.listaRubrosPorAportantes = this.crearFilaAportantesParaRubroExistente(rubro, listadoAportantes);

    rubro.rubrosHijos.forEach(hijo => this.cargarRubroExistenteRecursivo(hijo, listadoAportantes));
    this.operacionesLocalService.ordenarRubros(rubro.rubrosHijos);
  }

  private crearFilaAportantesParaRubroExistente(rubro: RubroProyecto, listadoAportantes: AportanteProyecto[]): CeldaRubroPorAportante[] {
    const celdas: CeldaRubroPorAportante[] = [];
    rubro.aportantes.forEach(rubroAportante => {

      const aportanteEncontrado = listadoAportantes.find(ap => ap.identificador === rubroAportante.aportante.identificador);
      rubroAportante.aportante = aportanteEncontrado;
      rubroAportante.porcentajeValido = true;
      rubroAportante.habilitado = true;

      if (this.operacionesLocalService.esUdeA(rubroAportante.aportante)) {
        let celdaUdea = celdas.find(e => e.esUdea);
        if (!(!!celdaUdea)) {
          celdaUdea = new CeldaRubroPorAportante();
          celdaUdea.frescos = [];
          celdaUdea.esUdea = true;
        }
        if (rubroAportante.aportante.dependencia === null && rubroAportante.aportante.grupo === null) {
          celdaUdea.aportanteEnEspecie = rubroAportante;
        } else {
          celdaUdea.frescos.push(rubroAportante);
        }

        if (!celdas.includes(celdaUdea)) {
          celdas.push(celdaUdea);
        }
      } else {
        const encabezado = new CeldaRubroPorAportante();
        encabezado.frescos = [rubroAportante];

        celdas.push(encabezado);
      }
    });

    const aportanteUdea = celdas.find(a => a.esUdea);
    if (!!aportanteUdea) {
      aportanteUdea.frescos.sort((a, b) => this.ordenarDependenciasUdeA(a, b));
    }

    this.ordenarCeldas(celdas);

    return celdas;
  }

  private ordenarCeldas(celdas: CeldaRubroPorAportante[]) {
    celdas.sort((a, b) => {
      const aportanteA = this.extarerAportante(a);
      const aportanteB = this.extarerAportante(b);
      return this.operacionesLocalService.ordenarAportantes(aportanteA, aportanteB);
    });
  }

  private extarerAportante(celda: CeldaRubroPorAportante): AportanteProyecto {
    if (celda.esUdea) {
      return celda.aportanteEnEspecie.aportante;
    } else {
      return celda.frescos[0].aportante;
    }
  }

  limpiarListadoRubros() {
    this.rubrosSubject.next([]);
  }

  // Operaciones sobre Rubros

  agregarRubro(rubro: RubroProyecto) {
    this.precargarAportantesActualesEnRubro(rubro, null);

    const rubros = this.rubrosSubject.getValue();
    rubros.push(rubro);
    rubros.sort((a, b) => a.nombre.localeCompare(b.nombre));
    this.rubrosSubject.next(rubros);

    this.operacionesLocalService.calcularSeccionSubtotalEspecie(rubro);
    this.operacionesLocalService.calcularSeccionSubtotalFresco(rubro);
  }

  agregarSubrubro(rubro: RubroProyecto, padre: RubroProyecto) {
    this.precargarAportantesActualesEnRubro(rubro, padre);

    padre.rubrosHijos.push(rubro);
    padre.rubrosHijos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    padre.hijosVisibles = true;

    this.operacionesLocalService.calcularSeccionSubtotalEspecie(rubro);
    this.operacionesLocalService.calcularSeccionSubtotalFresco(rubro);
  }

  actualizarRubro(rubro: RubroProyecto, padre: RubroProyecto): void {
    if (!!padre) {
      padre.rubrosHijos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else {
      this.rubrosSubject.getValue().sort((a, b) => a.nombre.localeCompare(b.nombre));
    }
  }

  eliminarRubro(rubro: RubroProyecto) {
    this.eliminarRubroRecursivo(rubro, this.rubrosSubject.getValue());
  }

  eliminarRubroRecursivo(rubro: RubroProyecto, listadoRubros: RubroProyecto[]): boolean {
    const indice = listadoRubros.indexOf(rubro);

    if (indice > -1) {
      // sólo recalcular si hay más de un hijo
      const padre = this.encontrarRubroPadre(rubro);
      if (!padre || padre.rubrosHijos.length > 1) {
        this.recalcularTodosLosAportantes(rubro);
      }
      if (!!listadoRubros[indice].identificador) {
        this.presupuestalProyectoService.eliminarRubroProyecto(listadoRubros[indice].identificador)
          .subscribe(_ => listadoRubros.splice(indice, 1));
      } else {
        listadoRubros.splice(indice, 1);
      }
      return true;
    } else {
      return listadoRubros.some(r => this.eliminarRubroRecursivo(rubro, r.rubrosHijos));
    }
  }

  ampliarTodo() {
    this.toggleHijosVisibles(true);
  }

  reducirTodo() {
    this.toggleHijosVisibles(false);
  }

  private toggleHijosVisibles(hijosVisibles: boolean) {
    const rubros = this.rubrosSubject.getValue();
    rubros.forEach(r => r.hijosVisibles = hijosVisibles);
  }

  // Agregar aportante

  agregarAportanteProyecto(aportante: AportanteProyecto) {
    if (aportante.personaJuridica.nit === UdeaConstantes.NIT_UDEA) {
      this.agregarAportanteUdeaRecursivo(aportante, this.rubrosSubject.getValue());
    } else {
      this.agregarAportanteRecursivo(aportante, this.rubrosSubject.getValue());
    }
  }

  private agregarAportanteRecursivo(aportante: AportanteProyecto, listadoRubros: RubroProyecto[]) {
    listadoRubros.forEach(rubro => {
      const rubroPorAportante = this.nuevoRubroAportante(aportante);

      const contenedorAportante = new CeldaRubroPorAportante();
      contenedorAportante.esUdea = false;
      contenedorAportante.frescos = [rubroPorAportante];
      rubro.listaRubrosPorAportantes = rubro.listaRubrosPorAportantes || [];
      rubro.listaRubrosPorAportantes.push(contenedorAportante);
      rubro.listaRubrosPorAportantes.sort((a, b) => this.operacionesLocalService.ordenarRubrosPorAportante(a, b));
      if (!!rubro.identificador) {
        this.presupuestalProyectoService.precargarPresupuesto(aportante.identificador, rubro.identificador)
          .subscribe(idRubroAportante => {
            rubroPorAportante.identificador = idRubroAportante;
          });
      }

      this.agregarAportanteRecursivo(aportante, rubro.rubrosHijos);
    });
  }

  private agregarAportanteUdeaRecursivo(aportante: AportanteProyecto, listadoRubros: RubroProyecto[]) {
    listadoRubros.forEach(
      rubro => {
        const rubroPorAportante = this.nuevoRubroAportante(aportante);

        rubro.listaRubrosPorAportantes = rubro.listaRubrosPorAportantes || [];
        const aportanteUdea = rubro.listaRubrosPorAportantes.find(rxa => rxa.esUdea);
        if (!!aportanteUdea) {
          aportanteUdea.frescos.push(rubroPorAportante);
          aportanteUdea.frescos.sort((a, b) => this.extraerTituloDependencia(a).localeCompare(this.extraerTituloDependencia(b)));
          if (!!rubro.identificador) {
            this.presupuestalProyectoService.precargarPresupuesto(aportante.identificador, rubro.identificador)
              .subscribe(idRubroAportante => {
                rubroPorAportante.identificador = idRubroAportante;

              });
          }
        } else {
          const nuevoAportanteUdea = new CeldaRubroPorAportante();
          nuevoAportanteUdea.esUdea = true;
          nuevoAportanteUdea.frescos = [];
          nuevoAportanteUdea.frescos.push(rubroPorAportante);

          rubro.listaRubrosPorAportantes.push(nuevoAportanteUdea);
        }

        this.agregarAportanteUdeaRecursivo(aportante, rubro.rubrosHijos);
      }
    );
  }

  private nuevoRubroAportante(aportante: AportanteProyecto): RubroAportante {
    const rubroPorAportante = new RubroAportante();
    rubroPorAportante.aportante = aportante;
    rubroPorAportante.frescoSolicitado = 0;
    rubroPorAportante.especieSolicitado = 0;
    rubroPorAportante.porcentaje = 0;
    rubroPorAportante.habilitado = true;
    rubroPorAportante.porcentajeValido = true;

    return rubroPorAportante;
  }

  encontrarRubroPadre(rubro: RubroProyecto): RubroProyecto {
    return this.operacionesLocalService.encontrarRubroPadreRecursivo(rubro, this.rubrosSubject.getValue());
  }

  eliminarAportanteProyecto(aportante: AportanteProyecto) {
    this.eliminarAportanteProyectoRecursivo(aportante, this.rubrosSubject.getValue());
  }

  eliminarAportanteProyectoRecursivo(aportante: AportanteProyecto, rubros: RubroProyecto[]) {
    rubros.forEach(rubro => {
      rubro.listaRubrosPorAportantes.forEach(celda => {
        celda.frescos.forEach(fresco => {
          if (fresco.aportante.identificador === aportante.identificador) {
            if (this.operacionesLocalService.esUdeA(aportante)) {
              // eliminar fresco
              const index = celda.frescos.indexOf(fresco);
              celda.frescos.splice(index, 1);
            } else {
              // eliminar celda completa
              const index = rubro.listaRubrosPorAportantes.indexOf(celda);
              rubro.listaRubrosPorAportantes.splice(index, 1);
            }
          }
        });
      });

      this.eliminarAportanteProyectoRecursivo(aportante, rubro.rubrosHijos);
    });
  }

  private recalcularTodosLosAportantes(rubro: RubroProyecto) {
    rubro.listaRubrosPorAportantes.forEach(a => {
      // se recalculan los frescos
      a.frescos.forEach(f => {
        f.frescoSolicitado = 0;
        this.operacionesLocalService.recalcularFrescosEnColumna(this.rubrosSubject.getValue(),
          this.subtotalesSubject.getValue(), this.porcentajeMaximoRubros, rubro, f.aportante);
      });

      // se recalcula el aportante en especie
      if (a.esUdea) {
        a.aportanteEnEspecie.especieSolicitado = 0;
        this.operacionesLocalService.recalcularEspecieEnColumna(this.rubrosSubject.getValue(),
          this.subtotalesSubject.getValue(), rubro, a.aportanteEnEspecie.aportante);
      } else {
        a.frescos[0].especieSolicitado = 0;
        this.operacionesLocalService.recalcularEspecieEnColumna(this.rubrosSubject.getValue(),
          this.subtotalesSubject.getValue(), rubro, a.frescos[0].aportante);
      }
    });
  }

  actualizarIdentificadores(tablaPresupuestal: TablaPresupuestal) {
    const rubros = this.rubrosSubject.getValue();
    const rubrosPersistidos = tablaPresupuestal.rubros;

    this.actualizarIdentificadorDeRubros(rubrosPersistidos, rubros);
  }

  actualizarIdentificadorDeRubros(rubrosPersistidos: RubroProyecto[], rubrosEnVista: RubroProyecto[]) {
    rubrosPersistidos.forEach(
      rubroPersistido => {
        // buscar rubro respuesta en listado de rubros en vista (busqueda por rConvocatoria o rFinanciable)
        const rubroEnVista = this.buscarRubroProyectoPorNombre(rubroPersistido, rubrosEnVista);
        if (!!rubroEnVista) {
          rubroEnVista.identificador = rubroPersistido.identificador;

          // actualizar identificadores de RubroAportantes en vista
          this.actualizarRubrosAportantes(rubroPersistido.aportantes, rubroEnVista.listaRubrosPorAportantes);
        }

        // recursivamente actualizar los rubros hijos
        this.actualizarIdentificadorDeRubros(rubroPersistido.rubrosHijos, rubroEnVista.rubrosHijos);
      });
  }

  actualizarRubrosAportantes(aportantesPersistidos: RubroAportante[], aportantesEnVista: CeldaRubroPorAportante[]) {
    aportantesPersistidos.forEach(aportantePersistido => {
      // buscar RubroAportante en vista por financiador (grupo, dependencia)
      const rubroAportanteEnVista = this.buscarRubroAportantePorFinanciador(aportantePersistido.aportante, aportantesEnVista);

      if (!!rubroAportanteEnVista) {
        rubroAportanteEnVista.identificador = aportantePersistido.identificador;
      }
    });
  }

  actualizarTotalAportantes() {
    const subtotales = this.subtotalesSubject.getValue();
    subtotales.listaRubrosPorAportantes.forEach(c => {
      // actualización de frescos
      c.frescos.forEach(f => {
        f.aportante.totalFrescoSolicitado = f.frescoSolicitado;
        f.aportante.totalFresco = f.frescoSolicitado;
        f.aportante.totalEspecieSolicitado = f.especieSolicitado;
        f.aportante.totalEspecie = f.especieSolicitado;
      });

      // actualizacion de especie udea
      if (c.esUdea) {
        c.aportanteEnEspecie.aportante.totalFrescoSolicitado = c.aportanteEnEspecie.frescoSolicitado;
        c.aportanteEnEspecie.aportante.totalFresco = c.aportanteEnEspecie.frescoSolicitado;
        c.aportanteEnEspecie.aportante.totalEspecieSolicitado = c.aportanteEnEspecie.especieSolicitado;
        c.aportanteEnEspecie.aportante.totalEspecie = c.aportanteEnEspecie.especieSolicitado;
      }
    });
  }

  // Funciones helpers

  private buscarRubroProyectoPorNombre(rubro: RubroProyecto, listaRubros: RubroProyecto[]): RubroProyecto {
    return listaRubros.find(r => r.nombre === rubro.nombre);
  }

  private buscarRubroAportantePorFinanciador(aportantePersistido: AportanteProyecto,
    listaAportantesEnVista: CeldaRubroPorAportante[]): RubroAportante {

    let aportante: RubroAportante;

    for (const celda of listaAportantesEnVista) {
      aportante = celda.frescos.find(f => this.igualFinanciador(f.aportante, aportantePersistido));

      if (!!aportante) {
        break;
      }

      if (celda.esUdea && this.igualFinanciador(celda.aportanteEnEspecie.aportante, aportantePersistido)) {
        aportante = celda.aportanteEnEspecie;
        break;
      }
    }
    return aportante;
  }

  private igualFinanciador(aportanteComparado: AportanteProyecto, aportanteBuscar: AportanteProyecto): boolean {
    const mismoFinanciador = aportanteComparado.personaJuridica.nit === aportanteBuscar.personaJuridica.nit;

    if (!mismoFinanciador) {
      return false;
    }

    if (aportanteComparado.personaJuridica.nit === UdeaConstantes.NIT_UDEA) {
      return (this.esEspecie(aportanteComparado) && this.esEspecie(aportanteBuscar))
        || (this.igualDependencia(aportanteBuscar, aportanteComparado))
        || (this.igualGrupo(aportanteBuscar, aportanteComparado));
    } else {
      return true;
    }
  }

  private igualDependencia(aportanteBuscar: AportanteProyecto, aportanteBuscado: AportanteProyecto) {
    return !!aportanteBuscar.dependencia && !!aportanteBuscado.dependencia
      && aportanteBuscar.dependencia.nombre === aportanteBuscado.dependencia.nombre;
  }

  private igualGrupo(aportanteBuscar: AportanteProyecto, aportanteBuscado: AportanteProyecto) {
    return !!aportanteBuscar.grupo && !!aportanteBuscado.grupo
      && aportanteBuscar.grupo.nombreCorto === aportanteBuscado.grupo.nombreCorto;
  }

  private esEspecie(aportante: AportanteProyecto): boolean {
    return !aportante.dependencia && !aportante.grupo;
  }

  igualRubroFinanciable(rubro: RubroProyecto, item: RubroConvocatoria): boolean {
    return !!rubro.rFinanciable && rubro.rFinanciable.identificador === item.identificador;
  }

  igualRubroConvocatoria(rubro: RubroProyecto, item: RubroConvocatoria): boolean {
    return !!rubro.rConvocatoria && rubro.rConvocatoria.identificador === item.identificador;
  }

  esProyectoDeConvocatoria(): boolean {
    return this.servicioLocalProyecto.obtenerInformacionGeneralProyecto().claseProyecto === PresupuestalConstantes.codigoConvocatoria;
  }

  ordenarDependenciasUdeA(a: RubroAportante, b: RubroAportante): number {
    return this.extraerTituloDependencia(a).localeCompare(this.extraerTituloDependencia(b));
  }

  extraerTituloDependencia(encabezado: RubroAportante) {
    if (!!encabezado.aportante.grupo) {
      return encabezado.aportante.grupo.nombreCompleto;
    } else {
      return encabezado.aportante.dependencia.nombreCorto;
    }
  }

  esSubrubro(rubro: RubroProyecto): boolean {
    return this.rubrosSubject.getValue().some(r => r === rubro);
  }

  esUltimoHijo(rubro: RubroProyecto): boolean {
    const rubros = this.rubrosSubject.getValue();
    const padre = this.operacionesLocalService.encontrarRubroPadreRecursivo(rubro, rubros);

    if (!padre) {
      return false;
    }

    return padre.rubrosHijos.indexOf(rubro) === (padre.rubrosHijos.length - 1);
  }

  private precargarAportantesActualesEnRubro(rubro: RubroProyecto, padre: RubroProyecto) {
    rubro.listaRubrosPorAportantes = [];
    rubro.totalEspecieSolicitado = 0;
    rubro.totalFrescoSolicitado = 0;
    rubro.porcentajeSubtotalFresco = 0;
    rubro.hijosVisibles = true;

    this.encabezadosSubject.getValue().forEach(encabezado => {
      const contenedorAportante = new CeldaRubroPorAportante();
      contenedorAportante.esUdea = encabezado.esUdea;
      contenedorAportante.frescos = [];

      if (encabezado.esUdea) {
        encabezado.frescos.forEach(a => {
          const dependencia = this.crearRubroPorAportante(a.aportante, rubro, padre);
          contenedorAportante.frescos.push(dependencia);
        });

        const enEspecie = this.crearRubroPorAportante(encabezado.aportanteEnEspecie.aportante, rubro, padre);
        contenedorAportante.aportanteEnEspecie = enEspecie;
      } else {
        const dependencia = this.crearRubroPorAportante(encabezado.frescos[0].aportante, rubro, padre);
        contenedorAportante.frescos.push(dependencia);
      }

      rubro.listaRubrosPorAportantes.push(contenedorAportante);
    }
    );
  }

  private crearRubroPorAportante(aportante: AportanteProyecto, rubro: RubroProyecto, padre: RubroProyecto): RubroAportante {
    const rubroPorAportante = new RubroAportante();
    rubroPorAportante.aportante = aportante;
    rubroPorAportante.frescoSolicitado = 0;
    rubroPorAportante.especieSolicitado = 0;
    rubroPorAportante.porcentaje = 0;
    rubroPorAportante.porcentajeValido = true;

    if (!!padre) {
      // buscar en el padre el mismo aportante
      const aportantePadre = this.operacionesLocalService.buscarAportante(padre, aportante);
      rubroPorAportante.habilitado = aportantePadre.habilitado;

      if (padre.rubrosHijos.length === 0) {
        rubroPorAportante.frescoSolicitado = !!aportantePadre ? aportantePadre.frescoSolicitado : 0;
        rubroPorAportante.especieSolicitado = !!aportantePadre ? aportantePadre.especieSolicitado : 0;
        rubroPorAportante.porcentaje = !!aportantePadre ? aportantePadre.porcentaje : 0;
      }
    } else {
      rubroPorAportante.habilitado = !padre && this.aportanteHabilitadoParaRubro(aportante, rubro);
    }

    return rubroPorAportante;
  }

  private aportanteHabilitadoParaRubro(aportante: AportanteProyecto, rubro: RubroProyecto): boolean {
    if (this.servicioLocalProyecto.obtenerInformacionGeneralProyecto().claseProyecto === ProyectoConstantes.TIPO_PROCESO_SELECCION) {
      return true;
    }

    const rubroConvocatoria = this.operacionesLocalService.buscarRubroEnConvocatoria(rubro, this.rubrosHabilitadosConvocatoria);

    if (!!rubroConvocatoria) {
      if (aportante.tipo === UdeaConstantes.TIPO_COFINANCIADOR && rubroConvocatoria.aplicacion === 1) {
        return true;
      }

      // buscar si aportante está en lista de permitidos
      const aportanteHabilitado = rubroConvocatoria.listaFinanciadorConvocatoria
        .find(f => aportante.personaJuridica.nit === f.financiador.nit);
      return !!aportanteHabilitado;
    }
    return true;
  }

  // sumatorias

  recalcularFrescosPadrePorAportante(rubroModificado: RubroProyecto, aportante: AportanteProyecto) {
    this.operacionesLocalService.recalcularFrescosEnColumna(this.rubrosSubject.getValue(),
      this.subtotalesSubject.getValue(), this.porcentajeMaximoRubros, rubroModificado, aportante);
  }

  recalcularEspeciePadrePorAportante(rubroModificado: RubroProyecto, aportante: AportanteProyecto) {
    this.operacionesLocalService.recalcularEspecieEnColumna(this.rubrosSubject.getValue(),
      this.subtotalesSubject.getValue(), rubroModificado, aportante);
  }

  // cálculo de porcentajes

  validarFinanciadorConModalidad(): string[] {
    const inconsistencias = new Array<string>();

    const modalidad = this.servicioLocalProyecto.obtenerModalidadSeleccionada();

    if (this.esProyectoDeConvocatoria()) {
      const aportantes = this.subtotalesSubject.getValue();
      let sumaFrescosFinanciador = 0;
      aportantes.listaRubrosPorAportantes.forEach(a => {
        a.frescos.filter(f => f.aportante.tipo === UdeaConstantes.TIPO_FINANCIADOR).forEach(c => {
          (sumaFrescosFinanciador += c.frescoSolicitado);
        });
      });
      if (sumaFrescosFinanciador > modalidad.montoMaximo) {
        const nombreFinanciadores = aportantes.listaRubrosPorAportantes.map(
          c => c.frescos
            .filter(a => a.aportante.tipo === UdeaConstantes.TIPO_FINANCIADOR)
            .map(f => f.aportante.personaJuridica.nombreCorto)
            .join(' - ')
        ).join(' - ');
        const mensajeError = ProyectoMensajes.MENSAJE_EVALUACION_MODALIDAD(nombreFinanciadores, modalidad.montoMaximo);
        inconsistencias.push(mensajeError);
      }
    }
    return inconsistencias;
  }

  validarPorcentajes(): string[] {
    const reglasInvalidas = new Array<string>();

    const rubros = this.rubrosSubject.getValue();
    const subtotales = this.subtotalesSubject.getValue();

    this.porcentajeMaximoRubros.forEach(regla => {
      const inconsistencia = this.operacionesLocalService.evaluarReglaPorcentaje(regla, rubros, subtotales);
      if (!!inconsistencia) {
        reglasInvalidas.push(inconsistencia);
      }
    });
    return reglasInvalidas;
  }

  // Implementación de interfaz: validación de datos del servicio
  validar(): string {
    const rubros = this.rubrosSubject.getValue();

    if (!rubros || rubros.length === 0) {
      return ProyectoMensajes.MENSAJE_VALIDACION_PRESUPUESTAL;
    }

    const pestanaValida = rubros.find(r => this.rubroConValores(r));
    return pestanaValida ? '' : ProyectoMensajes.MENSAJE_VALIDACION_PRESUPUESTAL;
  }


  private rubroConValores(r: RubroProyecto): boolean {
    // encontrar una celda en la existan valores
    return !!r.listaRubrosPorAportantes.find(c => {
      // tiene algún valor en frescos
      const valorEnFresco = !!c.frescos.find(f => !!f.frescoSolicitado || !!f.especieSolicitado);
      // tiene algún valor en especie
      const valorEnEspecie = !!c.aportanteEnEspecie && !!c.aportanteEnEspecie.especieSolicitado;
      return valorEnFresco || valorEnEspecie;
    });
  }

  guardar() {
    const tabla = new TablaPresupuestal();

    this.generarListaAportantesModelo(this.rubrosSubject.getValue());
    this.generarModeloAportantesEnRubro(this.subtotalesSubject.getValue());

    tabla.rubros = this.rubrosSubject.getValue();
    tabla.subtotales = this.subtotalesSubject.getValue();
    tabla.moneda = this.monedaSubject.getValue();

    return this.presupuestalProyectoService.guardarTablaPresupuestal(tabla, ProyectoConstantes.ENVIADO_A_CENTRO);
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

  postguardado(presupuestalGuardado: TablaPresupuestal) {
    this.actualizarIdentificadores(presupuestalGuardado);
  }
}
