import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TextoDescriptivo } from '../texto-descriptivo';
import { DescripcionProyectoService } from 'src/app/shared/services/show-project/descripcion-proyecto.service';
import { DescripcionProyectoLocalService } from 'src/app/shared/services/show-project/descripcion-proyecto-local.service';

@Component({
  selector: 'app-lista-descripcion-proyecto',
  templateUrl: './lista-descripcion-proyecto.component.html',
  styleUrls: ['./lista-descripcion-proyecto.component.css']
})
export class ListaDescripcionProyectoComponent implements OnInit {

  @Input()
  editable: boolean = false;
  @Input()
  esProyectoSeleccionInscritoOAvales: boolean = false;

  listadoTextoDescriptivos: TextoDescriptivo[] = [];

  constructor(
    private modal: MatDialog,
    private textoDescriptivoServicio: DescripcionProyectoService,
    private textoDescriptivoServicioLocal: DescripcionProyectoLocalService, ) {
    textoDescriptivoServicioLocal.listaTextoDescriptivoObligatorioObservable.subscribe(listaTexto => {
      this.listadoTextoDescriptivos = listaTexto;
    });
  }

  ngOnInit() {
  }

  editarDescripcion(textoDescriptivo: TextoDescriptivo) {
    // this.modal.open(EditarDescripcionProyectoComponent, {
    //   data: textoDescriptivo
    // });
  }

  eliminarDescripcion(textoDescriptivo: TextoDescriptivo) {
    // const datosModalCerrar: DatosModal = {
    //   titulo: 'Eliminar texto descriptivo',
    //   mensaje: '¿Realmente desea eliminar la descripción?',
    //   clase: ClaseAlerta.ALERTA_INFORMATIVA,
    //   textoPrimerBoton: ClaseAlerta.CANCELAR,
    //   textoSegundoBoton: ClaseAlerta.ACEPTAR
    // };

    // const modalCerrar = this.modal.open(ModalDinamicoComponent, {
    //   data: datosModalCerrar
    // });
    // modalCerrar.beforeClosed().subscribe(respuesta => {
    //   if (respuesta === ClaseAlerta.ACEPTAR) {
    //     const index = this.listadoTextoDescriptivos.indexOf(textoDescriptivo);
    //     this.listadoTextoDescriptivos.splice(index, 1);
    //     this.textoDescriptivoServicioLocal.agregarTextoDescriptivoObligatorio(this.listadoTextoDescriptivos);
    //     if (textoDescriptivo.textoSolicitado != null && textoDescriptivo.textoSolicitado.opcional === 1) {
    //       textoDescriptivo.textoIngresado = null;
    //       this.textoDescriptivoServicioLocal.obtenerListaTextoDescriptivoOpcional().push(textoDescriptivo);
    //     }
    //     this.textoDescriptivoServicio.eliminarTextoDescriptivo(textoDescriptivo.identificador);
    //   }
    // });
  }
}
