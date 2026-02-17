import { Injectable } from '@angular/core';
import { RubroProyecto } from '../../components/molecules/show-project/rubro-proyecto';
import { RubroAportante } from '../../components/molecules/show-project/rubro-aportante';
import { AportanteProyecto } from '../../components/molecules/show-project/aportante-proyecto';
import { UdeaConstantes } from '../../components/molecules/show-project/udea-constantes';
import { CeldaRubroPorAportante } from '../../components/molecules/show-project/celda-rubro-por-aportante';
import { PorcentajeMaximoRubros } from '../../components/molecules/show-project/porcentaje-maximo-rubros';
import { RubroConvocatoria } from '../../components/molecules/show-project/rubro-convocatoria';
import { FinanciadorConvocatoria } from '../../components/molecules/show-project/financiador-convocatoria';
import { ProyectoConstantes } from '../../components/molecules/show-project/proyecto-constantes';
import { ProyectoMensajes } from '../../components/molecules/show-project/proyecto-mensajes';

@Injectable({
  providedIn: 'root'
})
export class PresupuestalOperacionesLocalService {

  readonly factorPorcentaje = 100;

  constructor() { }


  // ORDENAMIENTO

  ordenarRubrosPorAportante(a: CeldaRubroPorAportante, b: CeldaRubroPorAportante): number {
    if (a.esUdea) {
      return -1;
    }

    if (b.esUdea) {
      return 1;
    }

    return this.ordenarAportantesAlfabeticamente(a.frescos[0].aportante, b.frescos[0].aportante);
  }

  ordenarAportantes(a: AportanteProyecto, b: AportanteProyecto): number {
    if (this.esUdeA(a)) {
      return -1;
    }

    if (this.esUdeA(b)) {
      return 1;
    }

    return this.ordenarAportantesAlfabeticamente(a, b);
  }

  ordenarAportantesAlfabeticamente(a: AportanteProyecto, b: AportanteProyecto): number {
    const nombreA = !!a.personaJuridica ? a.personaJuridica.nombreCorto : a.grupo.nombreCompleto;
    const nombreB = !!b.personaJuridica ? b.personaJuridica.nombreCorto : b.grupo.nombreCompleto;

    return nombreA.localeCompare(nombreB);
  }

  esUdeA(aportante: AportanteProyecto): boolean {
    return aportante.personaJuridica.nit === UdeaConstantes.NIT_UDEA;
  }

  ordenarRubros(rubros: RubroProyecto[]) {
    rubros.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  // BÚSQUEDAS

  private encontrarRubroPadre(rubro: RubroProyecto, listaRubrosProyecto: RubroProyecto[]): RubroProyecto | undefined {
    let padre: RubroProyecto | undefined;

    for (const r of listaRubrosProyecto) {
      if (r.rubrosHijos.some(h => h === rubro)) {
        padre = r;
      } else {
        padre = this.encontrarRubroPadre(rubro, r.rubrosHijos);
      }

      if (!!padre) {
        break;
      }
    }

    return padre;
  }

  encontrarRubroPadreRecursivo(rubro: RubroProyecto, listaRubrosProyecto: RubroProyecto[]): RubroProyecto | undefined {
    let padre: RubroProyecto | undefined;

    for (const r of listaRubrosProyecto) {
      if (r.rubrosHijos.some(h => h === rubro)) {
        padre = r;
      } else {
        padre = this.encontrarRubroPadreRecursivo(rubro, r.rubrosHijos);
      }

      if (!!padre) {
        break;
      }
    }

    return padre;
  }

  buscarAportante(padre: RubroProyecto, aportante: AportanteProyecto): RubroAportante | null | undefined {
    let aportantePadre: RubroAportante | null | undefined = null;

    for (const a of padre.listaRubrosPorAportantes) {
      aportantePadre = a.frescos.find(f => f.aportante.identificador === aportante.identificador);

      if (!(!!aportantePadre) && !!a.aportanteEnEspecie && a.aportanteEnEspecie.aportante.identificador === aportante.identificador) {
        aportantePadre = a.aportanteEnEspecie;
      }

      if (!!aportantePadre) {
        break;
      }
    }

    return aportantePadre;
  }

  buscarRubroEnConvocatoria(rubroBuscado: RubroProyecto,
    listaRubrosConvocatoria: RubroConvocatoria[]): RubroConvocatoria | undefined {

    let rubroConvocatoriaEncontrado: RubroConvocatoria | undefined;

    for (const r of listaRubrosConvocatoria) {
      if (r.identificador === rubroBuscado.rConvocatoria.identificador) {
        rubroConvocatoriaEncontrado = r;
      } else {
        rubroConvocatoriaEncontrado = this.buscarRubroEnConvocatoria(rubroBuscado, r.listaRubrosHijos || []);
      }

      if (!!rubroConvocatoriaEncontrado) {
        break;
      }
    }

    return rubroConvocatoriaEncontrado;
  }

  // SUMATORIAS

  recalcularFrescosEnColumna(listaRubros: RubroProyecto[], subtotales: RubroProyecto, reglas: PorcentajeMaximoRubros[],
    rubroModificado: RubroProyecto, aportanteModificado: AportanteProyecto) {

    this.calcularSeccionSubtotalFresco(rubroModificado);

    // rubro padre del rubro actualizado
    const padre = this.encontrarRubroPadre(rubroModificado, listaRubros);

    this.calcularSumatoriaSubtotalFresco(listaRubros, subtotales);

    if (!!padre) {
      let frescoRecalculado = 0;

      // sumatoria de los valores hijos del mismo aportante
      padre.rubrosHijos
        .map(h => this.buscarAportante(h, aportanteModificado))
        .filter(a => !!a)
        .forEach(aportante => {
          if (aportante) {
            frescoRecalculado += aportante.frescoSolicitado;
          }
        });

      // Actualización del valor fresco del padre
      const aportanteActualizar = this.buscarAportante(padre, aportanteModificado);
      if (aportanteActualizar) {
        aportanteActualizar.frescoSolicitado = frescoRecalculado;
      }

      this.recalcularPorcentajeDeHijos(padre.rubrosHijos, frescoRecalculado, aportanteModificado);

      this.recalcularFrescosEnColumna(listaRubros, subtotales, reglas, padre, aportanteModificado);
    } else {
      this.calcularSubtotalDelAportanteFresco(listaRubros, subtotales, aportanteModificado);
      this.recalcularPorcentajeDePadresEnColumna(listaRubros, subtotales, aportanteModificado);
    }
  }

  recalcularEspecieEnColumna(listaRubros: RubroProyecto[], subtotales: RubroProyecto,
    rubroModificado: RubroProyecto, aportanteModificado: AportanteProyecto) {

    this.calcularSeccionSubtotalEspecie(rubroModificado);
    // Revision
    this.calcularSumatoriaSubtotalEspecie(listaRubros, subtotales);

    // rubro padre del rubro actualizado
    const padre = this.encontrarRubroPadre(rubroModificado, listaRubros);

    if (!!padre) {
      let especieRecalculado = 0;

      // sumatoria de los valores hijos del mismo aportante
      padre.rubrosHijos
        .map(h => this.buscarAportante(h, aportanteModificado))
        .filter(a => !!a)
        .forEach(aportante => {
          if (aportante) {
            especieRecalculado += aportante.especieSolicitado;
          }
        });

      // Actualización del valor fresco del padre
      const aportanteActualizar = this.buscarAportante(padre, aportanteModificado);
      if (aportanteActualizar) {
        aportanteActualizar.especieSolicitado = especieRecalculado;
      }

      this.recalcularEspecieEnColumna(listaRubros, subtotales, padre, aportanteModificado);
    } else {
      this.calcularSubtotalDelAportanteEspecie(listaRubros, subtotales, aportanteModificado);
    }
  }

  calcularSeccionSubtotalFresco(rubroProyecto: RubroProyecto) {
    let subtotalFresco = 0;
    rubroProyecto.listaRubrosPorAportantes.forEach(a => {
      a.frescos.forEach(f => subtotalFresco += f.frescoSolicitado);
    });

    rubroProyecto.totalFrescoSolicitado = subtotalFresco;
  }

  calcularSeccionSubtotalEspecie(rubroProyecto: RubroProyecto) {
    let subtotalEspecie = 0;

    rubroProyecto.listaRubrosPorAportantes
      .filter(a => !a.esUdea)
      .forEach(a => {
        a.frescos.forEach(f => subtotalEspecie += f.especieSolicitado);
      });

    const aportanteUdea = rubroProyecto.listaRubrosPorAportantes.find(a => a.esUdea);
    if (!!aportanteUdea) {
      subtotalEspecie += aportanteUdea.aportanteEnEspecie.especieSolicitado;
    }

    rubroProyecto.totalEspecieSolicitado = subtotalEspecie;
  }

  calcularSumatoriaSubtotalFresco(listaRubros: RubroProyecto[], subtotales: RubroProyecto) {
    let subtotal = 0;
    listaRubros.forEach(r => subtotal += r.totalFrescoSolicitado);
    subtotales.totalFrescoSolicitado = subtotal;

    this.calcularPorcentajesFrescoSeccionSubtotal(listaRubros, subtotales);
  }

  calcularSumatoriaSubtotalEspecie(listaRubros: RubroProyecto[], subtotales: RubroProyecto) {
    let subtotal = 0;
    listaRubros.forEach(r => subtotal += r.totalEspecieSolicitado);
    subtotales.totalEspecieSolicitado = subtotal;
  }

  private calcularSubtotalDelAportanteFresco(listaRubros: RubroProyecto[], subtotales: RubroProyecto, aportante: AportanteProyecto) {
    let subtotalAportante = 0;
    listaRubros.forEach(rubro => {
      const aportanteProcesadoEnRubro = this.buscarAportante(rubro, aportante);
      if (aportanteProcesadoEnRubro) {
        subtotalAportante += aportanteProcesadoEnRubro.frescoSolicitado;
      }
    });

    const subtotal = this.buscarAportante(subtotales, aportante);
    if (subtotal) {
      subtotal.frescoSolicitado = subtotalAportante;
    }
  }

  calcularSubtotalDelAportanteEspecie(listaRubros: RubroProyecto[], subtotales: RubroProyecto, aportante: AportanteProyecto) {
    let subtotalAportante = 0;
    listaRubros.forEach(rubro => {
      const aportanteProcesadoEnRubro = this.buscarAportante(rubro, aportante);
      if (aportanteProcesadoEnRubro) {
        subtotalAportante += aportanteProcesadoEnRubro.especieSolicitado;
      }
    });

    const subtotal = this.buscarAportante(subtotales, aportante);
    if (subtotal) {
      subtotal.especieSolicitado = subtotalAportante;
    }
  }


  // PORCENTAJES

  recalcularPorcentajeDePadresEnColumna(listaRubros: RubroProyecto[], subtotales: RubroProyecto,
    aportanteModificado: AportanteProyecto) {

    const subtotal = this.buscarAportante(subtotales, aportanteModificado);
    if (!subtotal) {
      return;
    }
    const base = subtotal.frescoSolicitado;
    let porcentajeAcumulado = 0;

    listaRubros
        .map(r => this.buscarAportante(r, aportanteModificado))
        .filter(f => !!f)
        .forEach(f => {
          if (f) {
            f.porcentaje = this.formulaSimplePorcentaje(f.frescoSolicitado, base);
            porcentajeAcumulado += f.porcentaje;
          }
        });

    if (subtotal) {
      subtotal.porcentaje = porcentajeAcumulado;
    }
  }

  recalcularPorcentajeDeHijos(rubros: RubroProyecto[], valorFrescoPadre: number,
      aportante: AportanteProyecto) {

    rubros
      .map(r => this.buscarAportante(r, aportante))
      .forEach(f => f.porcentaje = this.formulaSimplePorcentaje(f.frescoSolicitado, valorFrescoPadre));
  }

  private formulaSimplePorcentaje(valor: number, base: number): number {
    return !!base ? valor / base * this.factorPorcentaje : 0;
  }

  calcularPorcentajesFrescoSeccionSubtotal(listaRubros: RubroProyecto[], subtotales: RubroProyecto): void {
    let porcentajeAcumulado = 0;

    listaRubros.forEach(rubro => {
      rubro.porcentajeSubtotalFresco = this.formulaSimplePorcentaje(rubro.totalFrescoSolicitado, subtotales.totalFrescoSolicitado);
      porcentajeAcumulado += rubro.porcentajeSubtotalFresco;

      this.calcularPorcentajesSubrubrosSeccionSubtotal(rubro.rubrosHijos, rubro.totalFrescoSolicitado);
    });

    subtotales.porcentajeSubtotalFresco = porcentajeAcumulado;
  }

  private calcularPorcentajesSubrubrosSeccionSubtotal(listaRubros: RubroProyecto[], base: number) {
    listaRubros.forEach(rubro => {
      rubro.porcentajeSubtotalFresco = this.formulaSimplePorcentaje(rubro.totalFrescoSolicitado, base);
      this.calcularPorcentajesSubrubrosSeccionSubtotal(rubro.rubrosHijos, rubro.totalFrescoSolicitado);
    });
  }

  private calcularPorcentajeValidandoRegla(rubro: RubroProyecto, subtotales: RubroProyecto,
      aportante: RubroAportante, regla: PorcentajeMaximoRubros): boolean {

    let resultadoEvaluacion = true;

    // subtotal fresco
    const subtotal = this.buscarAportante(subtotales, aportante.aportante);

    const numerador = aportante.frescoSolicitado;
    let denominadorBase = subtotal.frescoSolicitado;
    let denominadorResta = 0;
    let porcentaje = 0;

    if (!!regla) {
      const subtotalEspecie = this.buscarAportanteEspecie(subtotales, aportante);
      denominadorBase = regla.calcularSobre.identificador ===  ProyectoConstantes.CALCULAR_SOBRE_SUBTOTAL ?
        subtotal.frescoSolicitado :
        subtotal.frescoSolicitado + subtotalEspecie.especieSolicitado;

      if (rubro.rConvocatoria.esAdministracion) {
        const aportanteEspecie = this.buscarAportanteEspecie(rubro, aportante);
        denominadorResta = regla.calcularSobre.identificador ===  ProyectoConstantes.CALCULAR_SOBRE_SUBTOTAL ?
          aportante.frescoSolicitado :
          aportante.frescoSolicitado + aportanteEspecie.especieSolicitado;
      }

      const denominador = denominadorBase - denominadorResta;
      if (!!denominador) {
        porcentaje = numerador / denominador * this.factorPorcentaje;
      }

      aportante.porcentajeValido = porcentaje <= regla.porcentajeMax;
      resultadoEvaluacion = aportante.porcentajeValido;
    }
    return resultadoEvaluacion;
  }

  private buscarAportanteEspecie(rubro: RubroProyecto, aportante: RubroAportante): RubroAportante | undefined {
    let especie: RubroAportante | undefined;
    if (this.esUdeA(aportante.aportante)) {
      const udeaRow = rubro.listaRubrosPorAportantes.find(r => r.esUdea);
      especie = udeaRow?.aportanteEnEspecie;
    } else {
      for (const fila of rubro.listaRubrosPorAportantes) {
        especie = fila.frescos.find(f => f.aportante.personaJuridica.nit === aportante.aportante.personaJuridica.nit);
        if (!!especie) {
          break;
        }
      }
    }
    return especie;
  }

  private compararFinanciador(financiador: FinanciadorConvocatoria, aportante: AportanteProyecto): boolean {
    const mismoFinanciador = aportante.personaJuridica.nit === financiador.financiador.nit;
    return mismoFinanciador || this.compararDependencia(financiador, aportante);
  }

  private compararDependencia(financiador: FinanciadorConvocatoria, aportante: AportanteProyecto): boolean {
    return !!aportante.dependencia
      && !!financiador.dependenciaFinanciadora
      && aportante.dependencia.nombreCorto === financiador.dependenciaFinanciadora.nombreCorto;
  }

  // REGLAS PORCENTAJE MAXIMO

  evaluarReglaPorcentaje(regla: PorcentajeMaximoRubros, rubros: RubroProyecto[], subtotales: RubroProyecto): string | null {
    let inconsistencia: string | null = null;

    // Objeto rubro en la tabla
    const rubroEnTabla = rubros.find(r => r.rConvocatoria.identificador === regla.rubro.identificador);

    if (!!rubroEnTabla) {
      // aportante que estamos evaluando
      const aportanteEvaluado = this.encontrarRubroAportanteDesdeFinanciador(rubroEnTabla, regla.financiador);
      if (!!aportanteEvaluado) {
        const evaluacionExitosa = this.calcularPorcentajeValidandoRegla(rubroEnTabla, subtotales, aportanteEvaluado, regla);
        inconsistencia = this.crearInconsistenciaRegla(evaluacionExitosa, inconsistencia, regla, aportanteEvaluado);
      }
    }
    return inconsistencia;
  }

  private crearInconsistenciaRegla(evaluacionExitosa: boolean, inconsistencia: string,
    regla: PorcentajeMaximoRubros, aportanteEvaluado: RubroAportante) {

    if (!evaluacionExitosa) {
      inconsistencia = ProyectoMensajes.MENSAJE_EVALUACION_REGLA(
        regla.porcentajeMax,
        regla.rubro.nombre,
        this.nombreAportante(aportanteEvaluado));
    }
    return inconsistencia;
  }

  private nombreAportante(aportanteEvaluado: RubroAportante): any {
    let nombre = aportanteEvaluado.aportante.personaJuridica.nombreCorto;
    if (!!aportanteEvaluado.aportante.dependencia) {
      nombre = ` - ${aportanteEvaluado.aportante.dependencia.nombre}`;
    }
    if (!!aportanteEvaluado.aportante.grupo) {
      nombre = ` - ${aportanteEvaluado.aportante.grupo.nombreCorto}`;
    }
    return nombre;
  }

  private encontrarRubroAportanteDesdeFinanciador(rubro: RubroProyecto, financiador: FinanciadorConvocatoria): RubroAportante | undefined {
    let aportanteEvaluado: RubroAportante | undefined;

    for (const agrupador of rubro.listaRubrosPorAportantes) {
      aportanteEvaluado = agrupador.frescos
        .find(aportanteFresco =>
          this.compararFinanciador(financiador, aportanteFresco.aportante)
          && aportanteFresco.aportante.tipo === UdeaConstantes.TIPO_FINANCIADOR);

      if (!!aportanteEvaluado) {
        break;
      }
    }

    return aportanteEvaluado;
  }
}
