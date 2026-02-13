import { DatosModalInformativo } from './datos-modal-informativo';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClaseAlerta } from '../clase-alerta';

@Component({
  selector: 'app-modal-dinamico-informativo',
  templateUrl: './modal-dinamico-informativo.component.html',
  styleUrls: ['./modal-dinamico-informativo.component.css']
})
export class ModalDinamicoInformativoComponent implements OnInit {

  iconoAlerta = ClaseAlerta.ICONO_ADVERTENCIA;

  constructor(public modalDinamicoInformativo: MatDialogRef<ModalDinamicoInformativoComponent>,
    @Inject(MAT_DIALOG_DATA) public datosModalInformativo: DatosModalInformativo) {
    this.calcularIconoAlerta();
  }

  ngOnInit() {
  }

  calcularIconoAlerta() {
    if (this.datosModalInformativo.clase === ClaseAlerta.ALERTA_EXITO) {
      this.iconoAlerta = ClaseAlerta.ICONO_EXITO;
    } else if (this.datosModalInformativo.clase === ClaseAlerta.ALERTA_ERROR) {
      this.iconoAlerta = ClaseAlerta.ICONO_ERROR;
    } else if (this.datosModalInformativo.clase === ClaseAlerta.ALERTA_INFORMATIVA) {
      this.iconoAlerta = ClaseAlerta.ICONO_INFORMATIVO;
    }
  }

  clickBoton(): void {
    this.modalDinamicoInformativo.close(this.datosModalInformativo);
  }

}
