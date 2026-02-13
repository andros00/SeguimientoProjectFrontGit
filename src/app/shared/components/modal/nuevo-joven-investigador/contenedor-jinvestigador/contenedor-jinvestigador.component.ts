import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonaMaresDTO } from 'src/app/core/interfaces/PersonaMaresDTO';

@Component({
  selector: 'app-contenedor-jinvestigador',
  templateUrl: './contenedor-jinvestigador.component.html',
  styleUrls: ['./contenedor-jinvestigador.component.scss']
})
export class ContenedorJinvestigadorComponent implements OnInit {
  modoRegistro = false;
  permiteCrear = true;
  resultados: PersonaMaresDTO  = {} as PersonaMaresDTO;
  seleccion: PersonaMaresDTO | null = null;
  buscando = false;

  constructor(
    private dialogRef: MatDialogRef<ContenedorJinvestigadorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { permiteCrear?: boolean }
  ) {
    dialogRef.disableClose = true;
    if (data?.permiteCrear === false) this.permiteCrear = false;
  }

  ngOnInit(): void {}

  /**
   * Recibe la lista del filtro
   */
  onBusquedaRealizada(resultados: PersonaMaresDTO) {
    this.resultados = resultados ;
    this.seleccion = null;

    if (!this.resultados) {
      // Auto-selecciona si viene exactamente 1 resultado
      this.seleccion = this.resultados;
      // cerramos y devolvemos ese registro
      setTimeout(() => this.dialogRef.close(this.seleccion), 250);
    }
  }

  onSeleccion(jinvestigador: PersonaMaresDTO) {
    this.dialogRef.close(jinvestigador);
  }

  onFormularioModificado() {
    // reset states
    this.resultados = {} as PersonaMaresDTO;
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
