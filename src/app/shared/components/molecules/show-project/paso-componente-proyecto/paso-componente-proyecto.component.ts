import { ConstantesExitoError } from '../mensaje-exito-error/constantes-exito-error';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatosModalInformativo } from '../modal-dinamico-informativo/datos-modal-informativo';
import { ModalDinamicoInformativoComponent } from '../modal-dinamico-informativo/modal-dinamico-informativo.component';
import { ClaseAlerta } from '../clase-alerta';
import { ComponenteProyectoConstantes } from '../componente-proyecto-constantes';
import { SeccionProyecto } from '../seccion-proyecto';
import { ComponenteMacroproyecto } from '../componente-macroproyecto';
import { AgregarComponenteComponent } from '../agregar-componente/agregar-componente.component';
import { AlertaMensaje } from './../mensaje-exito-error/alerta-mensaje';
import { ComponenteProyectoLocalService } from 'src/app/shared/services/show-project/componente-proyecto-local.service';
import { ComponenteProyectoService } from 'src/app/shared/services/show-project/componente-proyecto.service';
import { AlertaLocalService } from 'src/app/shared/services/show-project/alerta-local.service';
import { PasosHabilitadosLocalService } from 'src/app/shared/services/show-project/pasos-habilitados-local.service';

const MENSAJE_EXITO = 'Componentes del proyecto guardados con éxito.';
const MENSAJE_ERROR = 'Ocurrió un error guardando los componentes del proyecto.';

@Component({
  selector: 'app-paso-componente-proyecto',
  templateUrl: './paso-componente-proyecto.component.html',
  styleUrls: ['./paso-componente-proyecto.component.css'],
  standalone: true
})
export class PasoComponenteProyectoComponent implements OnInit {

  listaComponenteMacroProyecto$: ComponenteMacroproyecto[] = [];
  mostrarMensajeExito = false;
  mostrarMensajeError = false;
  editable = false;

  constructor(public dialogo: MatDialog,
    private componenteServicioLocal: ComponenteProyectoLocalService,
    private componenteServicio: ComponenteProyectoService,
    private modal: MatDialog, private alertaServicioLocal: AlertaLocalService,
    private pasosHabilitadosLocalService: PasosHabilitadosLocalService) { }

  ngOnInit() {
    this.editable = this.pasosHabilitadosLocalService.esEditable(SeccionProyecto.Componente);
    this.componenteServicioLocal.listaComponenteProyectoObservable.subscribe(lista$ => {
      this.listaComponenteMacroProyecto$ = lista$;
    });
  }

  abrirAgregarComponente() {
    this.dialogo.open(AgregarComponenteComponent);
  }

  guardarComponentes() {
    const mensaje = new AlertaMensaje();
    let listaComponentes: ComponenteMacroproyecto[];
    listaComponentes = this.componenteServicioLocal.obtenerListaComponenteProyecto();
    if (listaComponentes.length > 0) {
      this.componenteServicio.guardarComponentes(listaComponentes).subscribe(respuestaGuardado => {
        this.componenteServicioLocal.agregarComponenteProyecto(respuestaGuardado);
        mensaje.tipoMensaje = ConstantesExitoError.EXITO;
        mensaje.mensaje = MENSAJE_EXITO;
        this.alertaServicioLocal.agregarMensaje(mensaje);
      },
        _ => {
          mensaje.tipoMensaje = ConstantesExitoError.ERROR;
          mensaje.mensaje = MENSAJE_ERROR;
          this.alertaServicioLocal.agregarMensaje(mensaje);
        });
    }
  }

  validarComponente() {
    let mostrarAlerta = true;
    this.listaComponenteMacroProyecto$.forEach(componente => {
      if (componente.identificador !== 0) {
        mostrarAlerta = false;
      }
    });
    if (this.editable && mostrarAlerta) {
      this.abrirAlerta();
    }
  }

  private abrirAlerta() {
    const datosModal: DatosModalInformativo = {
      titulo: ComponenteProyectoConstantes.TITULO_ALERTA_AGREGAR,
      mensaje: ComponenteProyectoConstantes.MENSAJE_ALERTA_AGREGAR,
      clase: ClaseAlerta.ALERTA_ADVERTENCIA
    };
    this.modal.open(ModalDinamicoInformativoComponent, {
      data: datosModal
    });
  }
}
