import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EtapaProyectoDTO } from 'src/app/core/interfaces/EtapaProyectoDTO';
import { EtapaProyectoService } from 'src/app/shared/services/project/etapa/etapa-proyecto.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-etapa-modal',
  // standalone: true,
  // imports: [ReactiveFormsModule, CommonModule, MatDatepickerModule, MatTableModule, MatProgressSpinner],
  templateUrl: './etapa-modal.component.html',
  styleUrl: './etapa-modal.component.scss'
})
export class EtapaModalComponent {

  etapas: EtapaProyectoDTO[] = [];
  displayedColumns: string[] = [
    'identificador',
    'nombre',
    'descripcion',
    'duracion',
    'ejecucionPresupuestal',
    'fechaInicio',
    'fechaFin'
  ];
  cargando = false;
  error: string | null = null;

  constructor(
    @Inject('projectCode') public projectCode: string,
    private etapaProyectoService: EtapaProyectoService
  ) { }

  ngOnInit(): void {
    if (this.projectCode) {
      this.obtenerEtapas();
    }
  }

  obtenerEtapas(): void {
    this.cargando = true;
    this.error = null;

    this.etapaProyectoService.obtenerEtapaPorProyecto(this.projectCode).subscribe({
      next: (data) => {
        this.etapas = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al obtener etapas:', err);
        this.error = 'No fue posible cargar las etapas del proyecto.';
        this.cargando = false;
      }
    });
  }

}
