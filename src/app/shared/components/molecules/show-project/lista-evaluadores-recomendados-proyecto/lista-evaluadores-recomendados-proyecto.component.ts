import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EvaluadorRecomendado } from '../evaluador-recomendado';
import { EvaluadorProyectoLocalService } from 'src/app/shared/services/show-project/evaluador-proyecto-local.service';
import { EvaluadorService } from 'src/app/shared/services/show-project/evaluador.service';

const TITULO_ELIMINAR_EVALUADOR = 'Eliminar evaluador recomendado';
const ELIMINAR_EVALUADOR = '¿Realmente desea eliminar el evaluador?';
const MENSAJE_EXITO_ELIMINAR = 'Evaluador recomendado eliminado con éxito.';
const MENSAJE_ERROR_ELIMINAR = 'Ocurrió un error eliminando el evaluador recomendado del proyecto.';

@Component({
  selector: 'app-lista-evaluadores-recomendados-proyecto',
  templateUrl: './lista-evaluadores-recomendados-proyecto.component.html',
  styleUrls: ['./lista-evaluadores-recomendados-proyecto.component.css']
})
export class ListaEvaluadoresRecomendadosProyectoComponent implements OnInit {

  @Input() editable: boolean = false;

  mostrarMensajeExitoEliminar = false;
  mostrarMensajeErrorEliminar = false;
  listaEvaluadoresRecomendados$: EvaluadorRecomendado[] = {} as EvaluadorRecomendado[];

  constructor(private evaluadorProyectoLocal: EvaluadorProyectoLocalService,
    // private modal: MatDialog, private alertaServicioLocal: AlertaLocalService,
    private evaluadorServicio: EvaluadorService) { }

  ngOnInit() {
    this.evaluadorProyectoLocal.listaEvaluadoresRecomendadosObservable.subscribe(lista$ => {
      this.listaEvaluadoresRecomendados$ = lista$;
    });
  }

  abrirEliminarEvaluadorRecomendado(evaluador: EvaluadorRecomendado) {

  }

  eliminarEvaluador(evaluador: EvaluadorRecomendado) {

  }


}
