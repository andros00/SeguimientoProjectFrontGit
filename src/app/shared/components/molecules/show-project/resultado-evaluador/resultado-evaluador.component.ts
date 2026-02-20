import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Evaluador } from '../evaluador-proyecto';

@Component({
  selector: 'app-resultado-evaluador',
  templateUrl: './resultado-evaluador.component.html',
  styleUrls: ['./resultado-evaluador.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatPaginatorModule]
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

  cargarPagina(pagina: any) {
    let paginaIndex: number;
    if (typeof pagina === 'number') {
      paginaIndex = pagina;
    } else if (pagina && typeof pagina.pageIndex === 'number') {
      paginaIndex = pagina.pageIndex;
    } else {
      paginaIndex = 0;
    }
    const numeroResgitrosMaximo = this.registrosPorPagina * (paginaIndex + 1);
    const numeroRegistrosMinimo = numeroResgitrosMaximo - this.registrosPorPagina;
    this.listaEvaluadoresPaginada = this.listadoEvaluadores.slice(numeroRegistrosMinimo, numeroResgitrosMaximo);
  }

  seleccionarEvaluador(evaluador: Evaluador) {
    this.emitirEvaluadorSeleccionado.emit(evaluador);
  }

}
