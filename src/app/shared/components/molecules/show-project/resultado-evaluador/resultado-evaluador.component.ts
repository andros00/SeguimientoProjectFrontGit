import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Evaluador } from '../evaluador-proyecto';

@Component({
  selector: 'app-resultado-evaluador',
  templateUrl: './resultado-evaluador.component.html',
  styleUrls: ['./resultado-evaluador.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ResultadoEvaluadorComponent implements OnInit, OnChanges {

  readonly registrosPorPagina = 6;
  @Input() listadoEvaluadores: Evaluador[] = [];
  @Output() emitirEvaluadorSeleccionado: EventEmitter<Evaluador> = new EventEmitter<Evaluador>();

  listaEvaluadoresPaginada: Evaluador[] = [];
  totalRegistros = 0;
  cantidadPaginas = 0;
  pagina = 0;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.listadoEvaluadores != null) {
      this.ordenarlistaResultados();
      this.paginarListaResultados();
      this.cargarPagina(this.pagina);
    }
  }

  private ordenarlistaResultados() {
    this.listaEvaluadoresPaginada = this.listadoEvaluadores;
    this.listaEvaluadoresPaginada.sort((p1, p2) => {
      if (p1.identificador > p2.identificador) {
        return 1;
      }
      if (p1.identificador < p2.identificador) {
        return -1;
      }
      return 0;
    });
  }

  private paginarListaResultados() {
    this.totalRegistros = this.listadoEvaluadores.length;
    this.cantidadPaginas = this.totalRegistros / this.registrosPorPagina;
  }

  cargarPagina(pagina: number) {
    const numeroResgitrosMaximo = this.registrosPorPagina * (pagina + 1);
    const numeroRegistrosMinimo = numeroResgitrosMaximo - this.registrosPorPagina;
    this.listaEvaluadoresPaginada = this.listadoEvaluadores.slice(numeroRegistrosMinimo, numeroResgitrosMaximo);
  }

  seleccionarEvaluador(evaluador: Evaluador) {
    this.emitirEvaluadorSeleccionado.emit(evaluador);
  }

}
