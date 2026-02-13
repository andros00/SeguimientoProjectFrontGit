import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectIformalService } from 'src/app/shared/services/project/project-iformal/project-iformal.service';
import { IProjectIFormalDTO } from 'src/app/core/interfaces/IProjectIFormalDTO';

@Component({
  selector: 'app-formal-start-general-info',
  templateUrl: './formal-start-general-info.component.html',
  styleUrls: ['./formal-start-general-info.component.scss']
})
export class FormalStartGeneralInfoComponent {

  form!: FormGroup;

  private iProject?: IProjectIFormalDTO;

  constructor(
    private projectIformalService: ProjectIformalService,
    @Inject('projectCode') public codigoProyecto: string,
    private fb: FormBuilder) {

  }

  private initializeForm(): void {
    this.form = this.fb.group({
      codigoInterno: [''],
      duracion: [''],
      fechaInicio: [''],
      fechaFinalizacion: [''],
      fechaAprobacionRechazo: [''],
      estado:[''],
      id: 0,
      codigoAprobacionActaCodi: [''],
      fechaAprobacionProyCodi: [''],
      // downloadApprovalDocument: [''],
      // infoApprovalDocument: [''],
    });
  }

  ngOnInit(): void {
    this.initializeForm();
    this.getProjectInicioFormal();

    // Recalcular cuando cambie la fecha de inicio
    this.form.get('fechaInicio')!.valueChanges.subscribe(() => this.calculatefechaFinalizacion());

    // Recalcular cuando cambie la duración
    this.form.get('duracion')!.valueChanges.subscribe(() => this.calculatefechaFinalizacion());
    this.form.get('duracion')!.disable;

  }

  private calculatefechaFinalizacion(): void {
    console.log('*ingrese*')
    const fechaInicio: Date = this.form.get('fechaInicio')!.value;
    console.log('*fechaInicio*' + fechaInicio)
    const duration: number = parseInt(this.form.get('duracion')!.value, 10);
    console.log('*duracion*' + duration)

    if (fechaInicio && !isNaN(duration) && duration > 0) {
      const fechaFinalizacion = new Date(fechaInicio);
      fechaFinalizacion.setMonth(fechaFinalizacion.getMonth() + duration);
      this.form.get('fechaFinalizacion')!.setValue(fechaFinalizacion, { emitEvent: false });
      console.log('fechaFinalizacion' + fechaFinalizacion)
    }
  }

  onfechaInicioChange(date: Date): void {
    console.log(date)
    this.form.get('fechaInicio')!.setValue(date);
    this.calculatefechaFinalizacion(); // haces el cálculo justo después de actualizar
  }

  getProjectInicioFormal(): void {
    this.projectIformalService.getProjectIFormalByProjectCode(this.codigoProyecto).subscribe({

      next: (data) => {
        this.iProject = data;
        this.form.patchValue({
          id: data.id,
          codigoInterno: data.codigoInterno,
          duracion: data.duracion,
          estado: data.estado,
          fechaInicio: data.fechaInicio ? new Date(data.fechaInicio) : null,
          fechaFinalizacion: data.fechaFinalizacion ? new Date(data.fechaFinalizacion) : null,
          fechaAprobacionRechazo: data.fechaAprobacionRechazo ? new Date(data.fechaAprobacionRechazo) : null,
          codigoAprobacionActaCodi: data.codigoAprobacionActaCodi,
          fechaAprobacionProyCodi: data.fechaAprobacionProyCodi,
          // downloadApprovalDocument: data.downloadApprovalDocument,
          // infoApprovalDocument: data.infoApprovalDocument
        });
      },
      error: (err) => {
        if (err.status === 404) {
          console.error(`No se encontró un proyecto con el código ${this.codigoProyecto}`);
        } else {
          console.error('Ocurrió un error inesperado');
        }
        this.iProject = undefined;
      }
    });


  }

  guardar(): void {
  // Validar formulario
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  // Obtener los valores del formulario
  const proyectoIformal = this.form.value as IProjectIFormalDTO;

  // Llamar al servicio para guardar
  this.projectIformalService.guardarInicioFormal(proyectoIformal).subscribe({
    next: (respuesta) => {
      console.log('Proyecto guardado correctamente:', respuesta);
      // Aquí puedes mostrar un mensaje de éxito o navegar a otra vista
      // Ejemplo:
      // this.toastService.success('Proyecto guardado correctamente');
    },
    error: (error) => {
      console.error('Error al guardar el proyecto:', error);
      // Ejemplo:
      // this.toastService.error('Error al guardar el proyecto');
    }
  });
}


}
