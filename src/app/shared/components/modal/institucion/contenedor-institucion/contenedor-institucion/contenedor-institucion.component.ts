import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InstitucionDTO } from 'src/app/core/interfaces/InstitucionDTO';

@Component({
  selector: 'app-contenedor-institucion',
  templateUrl: './contenedor-institucion.component.html',
  styleUrls: ['./contenedor-institucion.component.scss']
})
export class ContenedorInstitucionComponent implements OnInit {
  modoRegistro = false;
  permiteCrear = true;
  resultados: InstitucionDTO[] = [];
  seleccion: InstitucionDTO | null = null;
  buscando = false;

  constructor(
    private dialogRef: MatDialogRef<ContenedorInstitucionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { permiteCrear?: boolean }
  ) {
    dialogRef.disableClose = true;
    if (data?.permiteCrear === false) this.permiteCrear = false;
  }

  ngOnInit(): void {}

  /**
   * Recibe la lista del filtro
   */
  onBusquedaRealizada(resultados: InstitucionDTO[]) {
    this.resultados = resultados || [];
    this.seleccion = null;

    if (this.resultados.length === 1) {
      // Auto-selecciona si viene exactamente 1 resultado
      this.seleccion = this.resultados[0];
      // cerramos y devolvemos ese registro
      setTimeout(() => this.dialogRef.close(this.seleccion), 250);
    }
  }

  onSeleccion(institucion: InstitucionDTO) {
    this.dialogRef.close(institucion);
  }

  onFormularioModificado() {
    // reset states
    this.resultados = [];
    this.seleccion = null;
    this.modoRegistro = false;
  }

  cancelar() {
    this.dialogRef.close();
  }

  abrirModoRegistro() {
    this.modoRegistro = true;
  }
}
