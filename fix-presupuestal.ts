// Temporary fix for presupuestal-operaciones-local.service.ts
// This file contains the corrected logic for recalcularEspecieEnColumna method

recalcularEspecieEnColumna(listaRubros: RubroProyecto[], subtotales: RubroProyecto, padre: RubroProyecto, aportanteModificado: AportanteProyecto) {
    this.calcularSeccionSubtotalEspecie(rubroModificado);
    // Revision
    this.calcularSumatoriaSubtotalEspecie(listaRubros, subtotales);

    // rubro padre del rubro actualizado
    const padreFinal = this.encontrarRubroPadre(rubroModificado, listaRubros);

    if (!!padreFinal) {
      let especieRecalculado = 0;

      // sumatoria de los valores hijos del mismo aportante
      padreFinal.rubrosHijos
        .map(h => this.buscarAportante(h, aportanteModificado))
        .forEach(aportante => {
          if (aportante) {
            especieRecalculado += aportante.especieSolicitado;
          }
        });

      // Actualización del valor fresco del padre
      const aportanteActualizar = this.buscarAportante(padreFinal, aportanteModificado);
      if (aportanteActualizar) {
        aportanteActualizar.especieSolicitado = especieRecalculado;
      }

      this.recalcularEspecieEnColumna(listaRubros, subtotales, padreFinal, aportanteModificado);
    } else {
      this.calcularSubtotalDelAportanteEspecie(listaRubros, subtotales, aportanteModificado);
    }
  }
