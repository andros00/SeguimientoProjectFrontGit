import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CompromisoProyectoDTO } from 'src/app/core/interfaces/CompromisoProyectoDTO';
import { CompromisoService } from 'src/app/shared/services/compromiso/compromiso.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MenuComponent } from '../../../atoms/menu/menu.component';
import { CompromisoFechaComponent } from '../../../modal/compromiso/compromiso-fecha/compromiso-fecha/compromiso-fecha.component';
import { CompromisoNotaComponent } from '../../../modal/compromiso/compromiso-nota/compromiso-nota/compromiso-nota.component';

@Component({
  selector: 'app-formal-start-mandatory',
  // standalone: true,
  // imports: [CommonModule, ReactiveFormsModule, MenuComponent, MatTableModule],
  templateUrl: './formal-start-mandatory.component.html',
  styleUrl: './formal-start-mandatory.component.scss'
})
export class FormalStartMandatoryComponent {

  displayedColumns: string[] = [
    'identificador',
    'descripcion',
    'comentario',
    'fechaEstimada',
    'actions'
  ];

  compromisos = new MatTableDataSource<CompromisoProyectoDTO>([]);
  form: FormGroup;
  modoEdicion = false;

  constructor(
    @Inject('projectCode') public projectCode: string,
    private fb: FormBuilder,
    private compromisoService: CompromisoService,
    private dialog: MatDialog
  ) {
    this.form = this.fb.group({
      identificador: [null],
      proyecto: [''],
      compromiso: [null],
      descripcionPropio: [''],
      comentario: [''],
      fechaEstimada: [null],
      estado: ['']
    });
    console.log(':::::projectCode:::' + this.projectCode);
  }

  ngOnInit(): void {
    this.cargarCompromisos();
  }

  cargarCompromisos(): void {
    this.compromisoService
      .buscarPorProyecto(this.projectCode)
      .subscribe({
        next: (data) => {
          if (data && data.length > 0) {
            this.compromisos.data = data.map((compromiso) => ({
              ...compromiso,
              menuItems: [
                {
                  icon: 'edit',
                  label: 'Editar compromiso',
                  action: () => this.abrirModalFecha(compromiso),
                },
                {
                  icon: 'note',
                  label: 'Nota',
                  action: () => this.abrirModalNota(compromiso),
                },
              ],
            }));

          } else {
            this.compromisos.data = [];
          }
        },
        error: (err) => console.error('Error cargando compromisos', err)
      });
  }

  guardar(): void {
    const compromiso = this.form.value as CompromisoProyectoDTO;
    const obs = this.modoEdicion
      ? this.compromisoService.actualizar(compromiso)
      : this.compromisoService.insertar(compromiso);

    obs.subscribe({
      next: () => {
        this.cargarCompromisos();
        this.form.reset();
        this.modoEdicion = false;
      },
      error: (err) => console.error('Error guardando compromiso', err)
    });
  }

  editar(compromiso: CompromisoProyectoDTO): void {
    this.modoEdicion = true;
    this.form.patchValue(compromiso);
  }

  buscarPorProyecto(codigo: string): void {
    this.compromisoService.buscarPorProyecto(codigo).subscribe({
      next: (data) => (this.compromisos.data = data),
      error: (err) => console.error('Error buscando por proyecto', err)
    });
  }

  abrirModalFecha(c: any): void {
    const dialogRef = this.dialog.open(CompromisoFechaComponent, {
      width: '400px',
      data: {
        id: c.identificador,
        usuario: '8061496' // reemplaza con el usuario actual autenticado
      }
    });

    dialogRef.afterClosed().subscribe((actualizado) => {
      if (actualizado) {
        this.cargarCompromisos();
      }
    });
  }

  abrirModalNota(compromiso: CompromisoProyectoDTO): void {
    const dialogRef = this.dialog.open(CompromisoNotaComponent, {
      width: '600px',
      data: { idCompromisoProyecto: compromiso.identificador }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.cargarCompromisos();
    });
  }




}

