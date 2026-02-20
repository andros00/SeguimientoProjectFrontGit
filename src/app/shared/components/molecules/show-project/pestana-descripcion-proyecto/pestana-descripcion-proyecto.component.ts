import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TextoDescriptivo } from '../texto-descriptivo';
//import { EditarDescripcionProyectoComponent } from '../editar-descripcion-proyecto/editar-descripcion-proyecto.component';
//import { AgregarDescripcionComponent } from './../agregar-descripcion/agregar-descripcion.component';
import { Subscription } from 'rxjs';
import { DescripcionProyectoLocalService } from 'src/app/shared/services/show-project/descripcion-proyecto-local.service';
import { ProyectoLocalService } from 'src/app/shared/services/show-project/proyecto-local.service';
import { ProyectoConstantes } from '../proyecto-constantes';

@Component({
  selector: 'app-pestana-descripcion-proyecto',
  templateUrl: './pestana-descripcion-proyecto.component.html',
  styleUrls: ['./pestana-descripcion-proyecto.component.css']
})
export class PestanaDescripcionProyectoComponent implements OnInit {
  @Input() editable!: boolean;

  subscription!: Subscription;

  permiteAgregarDescripcion = false;
  habilitarAgregarDescripcion = false;
  esProyectoSeleccionInscritoOAvales = false;
  textoDescriptivoControl = new FormControl();
  listaTextoDescriptivoOpcional: TextoDescriptivo[] = [];

  @ViewChild('listaTextos', { static: true })
  listaTextosRef!: ElementRef;

  constructor(
    public dialogo: MatDialog,
    private proyectoServicioLocal: ProyectoLocalService,
    private textoDescriptivoServicioLocal: DescripcionProyectoLocalService) { }

  ngOnInit() {
    this.permitirAgregarDescripcion();
    this.subscription = this.proyectoServicioLocal.obtenerInformacionGeneralProcesoSeleccion().subscribe(informacionGeneral => {
      this.habilitarAgregarDescripcion = !informacionGeneral.limitaDescripciones;
      this.esProyectoSeleccionInscritoOAvales =
        informacionGeneral.identificador == ProyectoConstantes.PROCESO_SELECCION_INSCRITO ||
        informacionGeneral.identificador == ProyectoConstantes.PROCESO_SELECCION_AVALES;
    });
    this.listaTextoDescriptivoOpcional = this.textoDescriptivoServicioLocal.obtenerListaTextoDescriptivoOpcional();
  }

  ngOnDestroy(){
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  permitirAgregarDescripcion() {
    this.permiteAgregarDescripcion = true;
  }

  abrirModalAgregarDescripcion() {
    // const modalAgregarDescripcion = this.dialogo.open(AgregarDescripcionComponent);
    // modalAgregarDescripcion.beforeClosed().subscribe(respuesta => {
    // });
  }

  agregarTextoDescriptivoOpcional() {
    // const textoDescriptivo: TextoDescriptivo = this.textoDescriptivoControl.value;
    // this.dialogo.open(EditarDescripcionProyectoComponent, {
    //   data: textoDescriptivo
    // });
    // this.textoDescriptivoControl.reset();
  }

  scrollToListaTextos(): void {
  this.listaTextosRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
}

}
