import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { ProyectoDetalleDTO } from 'src/app/core/interfaces/ProyectoDetalleDTO';
import { FilterService } from 'src/app/shared/services/project/filter/filter.service';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { CommonModule } from '@angular/common';
import { IProject } from 'src/app/core/interfaces/IProject';
import { MatCard } from "@angular/material/card";
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FinanciadorDTO } from 'src/app/core/interfaces/FinanciadorDTO';
import { GrupoDTO } from 'src/app/core/interfaces/GrupoDTO';
import { SolicitudAdminDTO } from 'src/app/core/interfaces/SolicitudAdminDTO';

@Component({
  selector: 'app-proyecto-detalle-modal',
  standalone: true,
  imports: [MatDialogContent, MatProgressSpinner, MatDialogActions, CommonModule, MatCard, MatTableModule],
  templateUrl: './proyecto-detalle-modal.component.html',
  styleUrl: './proyecto-detalle-modal.component.scss'
})
export class ProyectoDetalleModalComponent implements OnInit {

  fiadoresColumns: string[] = ['nit', 'razonSocial'];
  fiadores = new MatTableDataSource<FinanciadorDTO>([]);

  gruposColumns: string[] = ['nombreCorto'];
  grupos = new MatTableDataSource<GrupoDTO>([]);

  solicitudesColumns: string[] = ['id'];
  solicitudes = new MatTableDataSource<SolicitudAdminDTO>([]);

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
          this.fiadores.data = this.detalle?.listaFinanciadores ?? [];

          this.grupos.data = this.detalle?.listaGrupo ?? [];
          this.solicitudes.data = this.detalle?.prorrogasAplicadas ?? [];

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
}
