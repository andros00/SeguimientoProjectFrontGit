import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CondicionFormalProyectoLocalService } from 'src/app/shared/services/show-project/condicion-formal-proyecto-local.service';
import { CondicionFormalPorEvaluacion } from '../condicion-formal-por-evaluacion';

@Component({
  selector: 'app-tabla-condiciones-formales',
  templateUrl: './tabla-condiciones-formales.component.html',
  styleUrls: ['./tabla-condiciones-formales.component.css']
})
export class TablaCondicionesFormalesComponent implements OnInit {

  @Input() editable = false;

  listaCondiciones$: Observable<CondicionFormalPorEvaluacion[]> = new Observable;

  constructor(private condicionFormalServicioLocal: CondicionFormalProyectoLocalService) {
    this.condicionFormalServicioLocal.listaCondicionFormalPorEvaluacionObservable.subscribe(condiciones => {
      this.listaCondiciones$ = of(condiciones);
    });
  }

  ngOnInit() {
  }

  cambioCondicion(condicion: CondicionFormalPorEvaluacion) {
    const listaCondicionesLocal = this.condicionFormalServicioLocal.obtenerListaCondicionesPorEvaluacionInicial();
    const index = listaCondicionesLocal.indexOf(condicion);
    listaCondicionesLocal.splice(index, 1, condicion);
    this.condicionFormalServicioLocal.agregarCondicionesPorEvaluacionInicial(listaCondicionesLocal);
  }

}
