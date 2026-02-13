import { DatosModal } from '../modal-dinamico/datos-modal';
import { MatDialog } from '@angular/material/dialog';
import { CompromisoProyecto } from '../compromiso-proyecto';
import { Component, OnInit, Input } from '@angular/core';
import { CompromisosProyectoLocalService } from 'src/app/shared/services/show-project/compromisos-proyecto-local.service';
import { ProyectoLocalService } from 'src/app/shared/services/show-project/proyecto-local.service';
import { CompromisosProyectoService } from 'src/app/shared/services/show-project/compromisos-proyecto.service';
import { ClaseAlerta } from '../clase-alerta';
import { ModalDinamicoComponent } from '../modal-dinamico/modal-dinamico.component';
import { CompromisoProyectoConstantes } from '../compromiso-proyecto-constantes';

@Component({
  selector: 'app-lista-compromisos-proyecto',
  templateUrl: './lista-compromisos-proyecto.component.html',
  styleUrls: ['./lista-compromisos-proyecto.component.css']
})
export class ListaCompromisosProyectoComponent implements OnInit {

  private readonly codigoProcesoSeleccion = 2;

  @Input() editable: boolean;

  listaCompromisosObligatorios: CompromisoProyecto[];
  listaCompromisosOpcionales: CompromisoProyecto[];
  mostrarTablaProcesoSeleccion = false;

  constructor(private compromisoServicioLocal: CompromisosProyectoLocalService, proyectoServicioLocal: ProyectoLocalService,
    public dialogo: MatDialog, public modalEliminar: MatDialog, private compromisoServicio: CompromisosProyectoService) {
    this.compromisoServicioLocal.listaCompromisosObligatoriosObservable.subscribe(listaCompromisos => {
      this.listaCompromisosObligatorios = listaCompromisos;
    });
    this.compromisoServicioLocal.listaCompromisosOpcionalesObservable.subscribe(listaCompromisos => {
      this.listaCompromisosOpcionales = listaCompromisos;
    });
    this.mostrarTablaProcesoSeleccion =
      proyectoServicioLocal.obtenerInformacionGeneralProyecto().claseProyecto === this.codigoProcesoSeleccion;
  }

  ngOnInit() {
  }

  abrirAgregarCompromiso() {
    // this.dialogo.open(AgregarCompromisoProyectoComponent);
  }

  editarCompromiso(compromiso: CompromisoProyecto) {
    // this.dialogo.open(EditarCompromisoProyectoComponent, {
    //   data: compromiso
    // });
  }

  abrirModalEliminarCompromiso(compromiso: CompromisoProyecto) {
    const datosModal: DatosModal = {
      titulo: CompromisoProyectoConstantes.TITULO_ALERTA_ELIMINAR_COMPROMISO,
      mensaje: CompromisoProyectoConstantes.ELIMINAR_COMPROMISO,
      textoPrimerBoton: ClaseAlerta.CANCELAR,
      textoSegundoBoton: ClaseAlerta.ELIMINAR,
      clase: ClaseAlerta.ALERTA_INFORMATIVA,
    };
    const modalEliminarCondicionRef = this.modalEliminar.open(ModalDinamicoComponent, {
      data: datosModal
    });

    modalEliminarCondicionRef.afterClosed().subscribe(result => {
      if (ClaseAlerta.ELIMINAR === result) {
        this.eliminarCompromiso(compromiso);
      }
    });
  }

  eliminarCompromiso(compromiso: CompromisoProyecto) {
    console.warn('eliminarCompromiso deshabilitado en modo solo lectura (lista-compromisos).', compromiso);
  }

}
