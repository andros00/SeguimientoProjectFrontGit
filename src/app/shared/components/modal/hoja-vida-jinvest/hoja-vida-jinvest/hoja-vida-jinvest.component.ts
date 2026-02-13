import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardTitle, MatCardContent, MatCardModule } from "@angular/material/card";
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatSelect, MatOption, MatSelectModule } from "@angular/material/select";
import { MatDatepickerToggle, MatDatepicker, MatDatepickerModule } from "@angular/material/datepicker";
import { CommonModule } from '@angular/common';
import { MatTabGroup } from '@angular/material/tabs';
import { JovenInvestigadorDTO } from 'src/app/core/interfaces/JovenInvestigadorDTO';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JovenInvestigadorService } from 'src/app/shared/services/investigador/joven-investigador.service';
import { take } from 'rxjs';
import { ContenedorJinvestigadorComponent } from '../../nuevo-joven-investigador/contenedor-jinvestigador/contenedor-jinvestigador.component';

@Component({
  selector: 'app-hoja-vida-jinvest',
  standalone: true,
  imports: [MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule, MatSelect, MatOption, MatDatepickerToggle,
    MatDatepicker, MatDatepickerModule, ReactiveFormsModule, CommonModule],
  templateUrl: './hoja-vida-jinvest.component.html',
  styleUrl: './hoja-vida-jinvest.component.scss'
})
export class HojaVidaJinvestComponent {

  hojaVidaForm!: FormGroup;

  tiposDocumento = ['CC', 'TI', 'CE'];
  tiposVivienda = ['Propia', 'Arrendada', 'Familiar'];
  bancos = ['Bancolombia', 'Davivienda', 'BBVA', 'Banco de Bogotá'];
  tiposCuenta = ['Ahorros', 'Corriente'];

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public dialogo: MatDialog,
    private jovenInvestigadorService: JovenInvestigadorService,
    @Inject(MAT_DIALOG_DATA) public data: { jInvestigador: JovenInvestigadorDTO }) { }

  ngOnInit(): void {
    this.hojaVidaForm = this.fb.group({
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      lugarExpedicion: [''],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      nombre: ['', Validators.required],
      lugarNacimiento: [''],
      fechaNacimiento: [''],
      lugarResidencia: [''],
      direccion: [''],
      barrio: [''],
      estrato: [''],
      tipoVivienda: [''],
      contacto: [''],
      celular: [''],
      correo: ['', [Validators.required, Validators.email]],
      dependencia: [''],

      // Información académica
      programa: [''],
      semestre: [''],
      fechaInicio: [''],
      fechaFin: [''],

      // Datos bancarios
      banco: [''],
      numeroCuenta: [''],
      tipoCuenta: [''],

      // Tutor
      tutorNombre: [''],
      tutorDocumento: [''],
      tutorCorreo: [''],
      tutorContacto: ['']
    });

    if (this.data && this.data.jInvestigador) {
      const j = this.data.jInvestigador;

      this.hojaVidaForm.patchValue({
        tipoDocumento: j.tipoIdentificacion,
        numeroDocumento: j.identificacion,
        lugarExpedicion: j.lugarExpedicion,
        primerApellido: j.apellido1,
        segundoApellido: j.apellido2,
        nombre: j.nombrePila,
        lugarNacimiento: j.ciudadNacimiento,
        fechaNacimiento: j.fechaNacimiento ? new Date(j.fechaNacimiento) : null,
        lugarResidencia: j.municipio,
        direccion: j.direccion,
        barrio: j.barrio,
        estrato: j.estrato,
        tipoVivienda: j.tipoVivienda,
        contacto: j.contactoPrincipal,
        celular: j.celular,
        correo: j.correoElectronico,
        dependencia: j.dependencia,

        programa: j.programa,
        semestre: j.semestre,
        fechaInicio: j.fechaInicioSemestre ? new Date(j.fechaInicioSemestre) : null,
        fechaFin: j.fechaFinSemestre ? new Date(j.fechaFinSemestre) : null,

        banco: j.banco,
        numeroCuenta: j.cuenta,
        tipoCuenta: j.tipoCuenta,

        tutorNombre: j.nombreTutor,
        tutorDocumento: j.identificacionTutor,
        tutorCorreo: j.correoTutor,
        tutorContacto: j.contactoTutor
      });
    }
  }


  onConfirmar() {
    console.log('Confirmando actualización...');
  }

  onVolver() {
    console.log('Volviendo al listado...');
  }

  onGuardar() {
    if (this.hojaVidaForm.invalid) {
      this.snackBar.open('Formulario incompleto ❌', 'Cerrar', { duration: 3000 });
      return;
    }

    const form = this.hojaVidaForm.value;

    const updatedJovenInvestigador: JovenInvestigadorDTO = {
      // DATOS PERSONALES
      tipoIdentificacion: form.tipoDocumento,
      identificacion: form.numeroDocumento,
      lugarExpedicion: form.lugarExpedicion,
      apellido1: form.primerApellido,
      apellido2: form.segundoApellido,
      nombrePila: form.nombre,
      // lugarNacimiento: form.lugarNacimiento,
      // lugarResidencia: form.lugarResidencia,
      direccion: form.direccion,
      barrio: form.barrio,
      estrato: form.estrato,
      tipoVivienda: form.tipoVivienda,
      contactoPrincipal: form.contacto,
      celular: form.celular,
      correoElectronico: form.correo,
      dependencia: form.dependencia,

      // INFORMACIÓN ACADÉMICA
      programa: form.programa,
      semestre: form.semestre,
      fechaInicioSemestre: form.fechaInicio ? this.formatearFecha(form.fechaInicio) : '',
      fechaFinSemestre: form.fechaFin ? this.formatearFecha(form.fechaFin) : '',

      // DATOS BANCARIOS
      banco: form.banco,
      cuenta: form.numeroCuenta,
      tipoCuenta: form.tipoCuenta,

      // TUTOR
      nombreTutor: form.tutorNombre,
      identificacionTutor: form.tutorDocumento,
      correoTutor: form.tutorCorreo,
      contactoTutor: form.tutorContacto,

      // CAMPOS ESTÁTICOS QUE VIENEN DEL DIALOG
      identificadorParticipante: this.data.jInvestigador.identificadorParticipante,
    };

    // Llamado al servicio
    this.jovenInvestigadorService.guardarJovenInvestigador(updatedJovenInvestigador).pipe(take(1)).subscribe({
      next: () => {
        this.snackBar.open('Hoja de vida actualizada ✅', 'Cerrar', { duration: 3000 });
        //  this.dialogRef.close(dto);
      },
      error: (err) => {
        console.error('Error al actualizar hoja de vida', err);
        this.snackBar.open('Error al actualizar ❌', 'Cerrar', { duration: 3000 });
      }
    });
  }
  formatDate(fechaNacimiento: any): string | undefined {
    throw new Error('Method not implemented.');
  }

  private formatearFecha(fecha: string | Date): string {
    const f = new Date(fecha);
    return f.toISOString().slice(0, 23); // yyyy-MM-ddTHH:mm:ss.SSS
  }

  abrirModalSeleccionarJinvestigador(): void {
    const modalRef = this.dialogo.open(ContenedorJinvestigadorComponent, {
      width: '900px',
      data: { permiteCrear: true }
    });

    modalRef.afterClosed().pipe(take(1)).subscribe((resultado) => {
      if (resultado) {
        // Actualiza campos del form con el jinvestigador seleccionada
        this.hojaVidaForm.patchValue({
          tipoDocumento: resultado.tipoDocumento || '',
          numeroDocumento: resultado.identificacion || '',
          nombre: resultado.nombre || '',

          primerApellido: resultado.apellidos ? resultado.apellidos.split(' ')[0] : '',
          segundoApellido: resultado.apellidos ? resultado.apellidos.split(' ')[1] || '' : '',

          fechaNacimiento: resultado.fechaNacimiento ? new Date(resultado.fechaNacimiento) : null,

          correo: resultado.email || '',
          celular: resultado.celular || '',
          contacto: resultado.telefono || '',
          direccion: resultado.direccion || '',

          lugarNacimiento: resultado.nombreMunicipioNacimiento || '',
          // si tienes lugarResidencia mapea también
          // lugarResidencia: resultado.nombreMunicipioResidencia || '',

          semestre: resultado.semestre || '',
          programa: resultado.nombrePrograma || '',
          fechaInicio: resultado.inicioSemestre ? new Date(resultado.inicioSemestre) : null,
          fechaFin: resultado.finSemestre ? new Date(resultado.finSemestre) : null
        });

        this.snackBar.open('Joven investigador seleccionado ✅', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      } else {
        console.warn('No se seleccionó Joven investigador');
      }
    });
  }
}
