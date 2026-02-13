import { InformacionGeneralProyecto } from 'src/app/proyecto/modelo/informacion-general-proyecto';
import { Observable } from 'rxjs';
import { ActividadProyectoNodo } from './../../modelo/actividad-proyecto-nodo';
import { ActividadProyecto } from './../../modelo/actividad-proyecto';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { MatDialogRef } from '@angular/material/dialog';
import { FlatTreeControl } from '@angular/cdk/tree';
import { ProyectoLocalService } from '../../servicio-local/proyecto-local.service';
import { CronogramaProyectoLocalService } from '../../servicio-local/cronograma-proyecto-local.service';

@Component({
  selector: 'app-diagrama-actividad',
  templateUrl: './diagrama-actividad.component.html',
  styleUrls: ['./diagrama-actividad.component.scss']
})

export class DiagramaActividadComponent implements OnInit {
  TREE_DATA: ActividadProyecto[] = [];
  meses: number[] = [];
  listaCronogramaProyecto$: ActividadProyecto[] = [];
  duracion = 0;

  flatNodeMap: Map<ActividadProyectoNodo, ActividadProyecto> = new Map<ActividadProyectoNodo, ActividadProyecto>();
  nestedNodeMap: Map<ActividadProyecto, ActividadProyectoNodo> = new Map<ActividadProyecto, ActividadProyectoNodo>();

  treeControl: FlatTreeControl<ActividadProyectoNodo>;
  treeFlattener: MatTreeFlattener<ActividadProyecto, ActividadProyectoNodo>;
  dataSource: MatTreeFlatDataSource<ActividadProyecto, ActividadProyectoNodo>;

  constructor(private proyectoServicioLocal: ProyectoLocalService, private cronogramaServicioLocal: CronogramaProyectoLocalService,
    public modalDiagramaActividad: MatDialogRef<DiagramaActividadComponent>) {

    this.proyectoServicioLocal.proyectoGuardadoObservable.subscribe(proyectoGuardado$ => {
      this.cargarDuracion(proyectoGuardado$);
    });

    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel,
      this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<ActividadProyectoNodo>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    this.cronogramaServicioLocal.listaActividadProyectoObservable.subscribe(lista$ => {
      this.listaCronogramaProyecto$ = lista$;
      lista$.forEach(elemento => {
        this.obtenerRango(elemento);
      });
      this.dataSource.data = lista$;
    });
  }

  private cargarDuracion(proyectoGuardado$: InformacionGeneralProyecto) {
    this.meses = this.calcularRango(0, proyectoGuardado$.duracion);
  }

  obtenerRango(actividad: ActividadProyecto) {
    const rango: number[] = this.calcularRango(actividad.inicio, actividad.fin);
    actividad.rangoMeses = rango;
  }

  private calcularRango(inicio: number, fin: number) {
    const rango: number[] = [];
    for (let index = inicio; index <= fin; index++) {
      rango.push(index);
    }
    return rango;
  }


  transformer = (node: ActividadProyecto) => {
    const flatNode = new ActividadProyectoNodo(node.nombre, node.rangoMeses,
      node.inicio, node.fin);
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  private _getLevel = () => 0;

  private _isExpandable = () => false;

  private _getChildren = (): Observable<ActividadProyecto[]> => new Observable<ActividadProyecto[]>();

  hasChild = (_: number, _nodeData: ActividadProyectoNodo) => false;

  cerrarModal() {
    this.modalDiagramaActividad.close();
  }

  ngOnInit() {
  }
}

