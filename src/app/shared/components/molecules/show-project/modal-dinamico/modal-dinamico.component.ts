import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClaseAlerta } from '../clase-alerta';
import { DatosModal } from './datos-modal';
import { DatoAdicionalAportante } from '../dato-adicional-aportante';

@Component({
  selector: 'app-modal-dinamico',
  templateUrl: './modal-dinamico.component.html',
  styleUrls: ['./modal-dinamico.component.css']
})
export class ModalDinamicoComponent implements OnInit {

  estiloBotonConfirmar = ClaseAlerta.CLASE_ACEPTAR;

  constructor(public modalDinamico: MatDialogRef<ModalDinamicoComponent>,
    @Inject(MAT_DIALOG_DATA) public datosModal: DatosModal) {
    this.calcularEstiloBotonConfirmar();
  }

  ngOnInit() {
  }

  calcularEstiloBotonConfirmar() {
    if (this.datosModal.textoSegundoBoton === ClaseAlerta.ELIMINAR) {
      this.estiloBotonConfirmar = ClaseAlerta.CLASE_ELIMINAR;
    }
  }

  clickModalPrimerBoton(): void {
    this.modalDinamico.close(this.datosModal.textoPrimerBoton);
  }

  clickModalSegundoBoton(): void {
    this.modalDinamico.close(this.datosModal.textoSegundoBoton);
  }

  recibirAportante($event: DatoAdicionalAportante): void {
    this.datosModal.editarAportante.tipoFinanciacion = $event.tipoFinanciacion;
    this.datosModal.editarAportante.sectorAportante = $event.sectorAportante;
    console.log($event);
  }

  validarEnvioDatosModal(): void {
    if(this.datosModal.editarAportante != undefined){
      this.modalDinamico.close(this.datosModal);
    }else{
      this.modalDinamico.close(this.datosModal.textoSegundoBoton);
    }
  }

  habilitarEditarFinanciador(): boolean{
    if(this.datosModal.editarAportante != undefined){
      return true;
    }
    return false;
  }
}
