import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActividadProyectoDTO } from 'src/app/core/interfaces/AnctividadProyectoDTO';
import { ActividadProyectoService } from 'src/app/shared/services/project/actividad/actividad-proyecto.service';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-actividad',
  // standalone: true,
  // imports: [ReactiveFormsModule, CommonModule, MatProgressSpinner, MatTableModule],
  templateUrl: './actividad.component.html',
  styleUrl: './actividad.component.scss'
})
export class ActividadComponent {


  actividades: ActividadProyectoDTO[] = [];
  displayedColumns: string[] = [
    'orden',
    'nombre',
    'detalle',
    'inicio',
    'fin'
  ];

  cargando: boolean = false;
  error: string | null = null;

  constructor(
    @Inject('projectCode') public projectCode: string,
    private actividadProyectoService: ActividadProyectoService
  ) { }

  ngOnInit(): void {
    this.obtenerActividades();
  }

  obtenerActividades(): void {
    this.cargando = true;
    this.error = null;

    this.actividadProyectoService.obtenerActividadPorProyecto(this.projectCode)
      .subscribe({
        next: (data) => {
          this.actividades = data;
          this.cargando = false;
        },
        error: (err) => {
          console.error('Error al obtener actividades:', err);
          this.error = 'No fue posible cargar las actividades del proyecto.';
          this.cargando = false;
        }
      });
  }

}
