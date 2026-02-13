import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { JovenInvestigadorDTO } from 'src/app/core/interfaces/JovenInvestigadorDTO';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatFormField, MatLabel, MatFormFieldModule } from "@angular/material/form-field";
import { JovenInvestigadorService } from 'src/app/shared/services/investigador/joven-investigador.service';
import { MatIcon } from "@angular/material/icon";
import { HojaVidaJinvestComponent } from '../hoja-vida-jinvest/hoja-vida-jinvest/hoja-vida-jinvest.component';
import { MatDialog } from '@angular/material/dialog';
import { MenuComponent } from '../../atoms/menu/menu.component';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-joven-investigador',
  // standalone: true,
  // imports: [ReactiveFormsModule, CommonModule, MatProgressSpinner, MenuComponent, MatTableModule, MatTabGroup],
  templateUrl: './joven-investigador.component.html',
  styleUrl: './joven-investigador.component.scss'
})
export class JovenInvestigadorComponent {

  displayedColumns: string[] = [
    'identificacion',
    'nombreCompleto',
    'correoElectronico',
    'celular',
    'programa',
    'semestre',
    'nombreGrupoTutor',
    'nombreTutor',
    'confirmado',
    'acciones'
  ]

  dataSource = new MatTableDataSource<JovenInvestigadorDTO>();
  filtro = new FormControl('');
  cargando = false;

  constructor(@Inject('projectCode') public projectCode: string,
    private jovenInvestigadorService: JovenInvestigadorService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    // ejemplo de consulta con identificador
    this.consultarJovenesInvestigadores();
  }

  consultarJovenesInvestigadores(): void {
    this.cargando = true;
    this.jovenInvestigadorService.consultarJovenes(this.projectCode).subscribe({
      next: (data) => {

        this.dataSource.data = [data].map((jov) => ({
          ...jov,
          menuItems: [
            {
              icon: 'edit',
              label: 'Editar HV',
              action: () => this.abrirActualizarJInvestigador(jov),
            },
          ],
        }));
        this.cargando = false;
       // console.log('Joven:::::::::::::::::::' + JSON.stringify(this.dataSource.data, null, 2));
      },
      error: (err) => {
        console.error('Error al obtener etapas:', err);
        this.cargando = false;
      }
    });
  }

  aplicarFiltro(): void {
    const filtroValor = this.filtro.value?.trim().toLowerCase() || '';
    this.dataSource.filter = filtroValor;
  }

  verDetalle(joven: JovenInvestigadorDTO): void {
    alert(`Detalle de ${joven.nombrePila} ${joven.apellido1}`);
  }

  abrirActualizarJInvestigador(jInvestigador: JovenInvestigadorDTO) {
    const dialogRef = this.dialog.open(HojaVidaJinvestComponent, {
      width: '960px',
      maxHeight: '90vh',
      data: {
        // proyecto: this.proyectoSeleccionado,
        jInvestigador
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Buscar participante y actualizarlo dentro del dataSource
        const index = this.dataSource.data.findIndex(p => p.identificacion === jInvestigador.identificacion);
        if (index !== -1) {
          this.dataSource.data[index] = { ...this.dataSource.data[index], ...result };
          // Importante: notificar al MatTable que los datos cambiaron
          this.dataSource._updateChangeSubscription();
          this.consultarJovenesInvestigadores();
        }
      }
    });
  }

}
