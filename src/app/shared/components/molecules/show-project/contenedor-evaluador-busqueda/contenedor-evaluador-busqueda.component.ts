import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Evaluador } from '../evaluador-proyecto';
import { InformacionGeneralProyecto } from '../informacion-general-proyecto';
import { EvaluadorRecomendado } from '../evaluador-recomendado';
//import { CreacionEvaluadorComponent } from '../creacion-evaluador/creacion-evaluador.component';
import { EvaluadorProyectoLocalService } from 'src/app/shared/services/show-project/evaluador-proyecto-local.service';
import { ProyectoLocalService } from 'src/app/shared/services/show-project/proyecto-local.service';
import { EvaluacionLocalService } from 'src/app/shared/services/show-project/evaluacion-local.service';
import { MatIcon } from "@angular/material/icon";
import { FiltroEvaluadorComponent } from '../filtro-evaluador/filtro-evaluador.component';
import { ResultadoEvaluadorComponent } from '../resultado-evaluador/resultado-evaluador.component';

@Component({
  selector: 'app-contenedor-evaluador-busqueda',
  templateUrl: './contenedor-evaluador-busqueda.component.html',
  styleUrls: ['./contenedor-evaluador-busqueda.component.css'],
  standalone: true,
  imports: [MatIcon, FiltroEvaluadorComponent, ResultadoEvaluadorComponent, CommonModule]
})
export class ContenedorEvaluadorBusquedaComponent implements OnInit {

  mostrarAgregarEvaluador = false;
  evaluadorNoEncontrado = false;
  modoRegistro = false;
  listadoEvaluadores: Evaluador[] = [];
  identificacionConsultada: string = '';
  informacionGeneralProyecto: InformacionGeneralProyecto = {
    codigo: '',
    claseProyecto: 0,
    nivelProyecto: 0
  };

  constructor(public modalBusquedaEvaluadores: MatDialogRef<ContenedorEvaluadorBusquedaComponent>,
    private evaluadorServicioLocal: EvaluadorProyectoLocalService,
    private proyectoLocalServicio: ProyectoLocalService,
    private evaluacionServicioLocal: EvaluacionLocalService,
    @Inject(MAT_DIALOG_DATA) public desde: string

  ) {
    modalBusquedaEvaluadores.disableClose = true;
  }

  ngOnInit() {
    this.informacionGeneralProyecto = this.proyectoLocalServicio.obtenerInformacionGeneralProyecto();
  }

  public cerrarModal() {
    this.modalBusquedaEvaluadores.close();
  }

  formularioModificado() {
    this.evaluadorNoEncontrado = false;
    this.mostrarAgregarEvaluador = false;
  }

  busquedaRealizada(evento: any) {
    this.listadoEvaluadores = evento.evaluadores;
    this.identificacionConsultada = evento.identificacion;

    this.evaluadorNoEncontrado = !this.hayResultadosEnBusqueda(this.listadoEvaluadores);

    this.mostrarAgregarEvaluador = !!this.identificacionConsultada;
  }

  private hayResultadosEnBusqueda(listadoResultados: Evaluador[]): boolean {
    return !!listadoResultados && listadoResultados.length > 0;
  }

  cambiarModoRegistrar() {
    this.modoRegistro = true;
  }

  evaluadorSeleccionado(evaluador: Evaluador) {
    if (this.desde === 'asignarEvaluador') {
      const evaluadorRecomendado: EvaluadorRecomendado = this.crearEvaluadorRecomendado(evaluador);
      this.evaluacionServicioLocal.actualizarEvaluadorSeleccionado(evaluadorRecomendado);
      this.modalBusquedaEvaluadores.close(evaluadorRecomendado);
    } else {
      const evaluadorRecomendado: EvaluadorRecomendado = this.crearEvaluadorRecomendado(evaluador);
      const evaluadoresRecomendados = this.evaluadorServicioLocal.obtenerListaEvaluadoresRecomendados();
      evaluadoresRecomendados.push(evaluadorRecomendado);
      this.evaluadorServicioLocal.agregarListaEvaluadoresRecomendados(evaluadoresRecomendados);
      this.modalBusquedaEvaluadores.close();
    }
  }

  crearEvaluadorRecomendado(evaluador: Evaluador): EvaluadorRecomendado {
    const evaluadorRecomendado: EvaluadorRecomendado = {

      evaluador: evaluador,
      asignacion: '',
      proyecto: this.informacionGeneralProyecto.codigo,
      comentarioEvaluador: evaluador.comentarioEvaluador,
      correoNotificacion: evaluador.correoElectronico,
      nombreCompleto: evaluador.nombres.concat(' ', evaluador.primerApellido, ' ', evaluador.segundoApellido),

    }
    return evaluadorRecomendado;
  }
}
