import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { ProyectoDetalleDTO } from 'src/app/core/interfaces/ProyectoDetalleDTO';
import { FilterService } from 'src/app/shared/services/project/filter/filter.service';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { CommonModule } from '@angular/common';
import { IProject } from 'src/app/core/interfaces/IProject';
import { MatCard } from "@angular/material/card";

@Component({
  selector: 'app-proyecto-detalle-modal',
  standalone: true,
  imports: [MatDialogContent, MatProgressSpinner, MatDialogActions, CommonModule, MatCard],
  templateUrl: './proyecto-detalle-modal.component.html',
  styleUrl: './proyecto-detalle-modal.component.scss'
})
export class ProyectoDetalleModalComponent implements OnInit {

  detalle?: ProyectoDetalleDTO;
  cargando = true;

  constructor(
    private dialogRef: MatDialogRef<ProyectoDetalleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idProyecto: string },
    private proyectoService: FilterService
  ) { }

  ngOnInit(): void {
    this.cargarDetalle();
  }

  private cargarDetalle(): void {
    this.proyectoService.getDetalleByProjectCode(this.data.idProyecto)
      .subscribe({
        next: resp => {
          this.detalle = resp;
          this.cargando = false;

          console.log("Detalle: ", this.detalle);
        },
        error: () => {
          this.cargando = false;
        }
      });
  }

  cerrar(): void {
    this.dialogRef.close();
  }

  // redirigir(id: string): void {
  //   const url = `https://asone.udea.edu.co/siiuFront/#/ver-proyecto/${id}`; window.open(url, '_blank'); // abre en nueva pestaña
  // }

  redirigir(id: string): void {
  const url = `https://asone.udea.edu.co/siiuFront/#/ver-proyecto/${id}`;

  window.open(
    url,
    'verProyecto',
    'width=1200,height=800,resizable=yes,scrollbars=yes'
  );
}



}
