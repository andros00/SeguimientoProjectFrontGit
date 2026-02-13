import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup,  } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { IProjectParticipantDTO } from 'src/app/core/interfaces/IPojectParticipantDTO';
import { ParticipantService } from 'src/app/shared/services/project/participant/participant.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersonaNaturalService } from 'src/app/shared/services/persona-natural/persona-natural.service';
import { ParticipantGroupService } from 'src/app/shared/services/project/participant-group/participant-group.service';
import { ParticipantRoleService } from 'src/app/shared/services/project/participant-role/participant-role.service';

import { ContenedorPersonaNaturalComponent } from 'src/app/shared/components/modal/contenedor-persona-natural/contenedor-persona-natural.component';
import { take } from 'rxjs';
import { IParticipantGroupDTO } from 'src/app/core/interfaces/IParticipantGroupDTO';
import { VinculoParticipanteDTO } from 'src/app/core/interfaces/VinculoParticipanteDTO';
import { IParticipantRoleDTO } from 'src/app/core/interfaces/IParticipantRoleDTO';
import { ContenedorInstitucionComponent } from 'src/app/shared/components/modal/institucion/contenedor-institucion/contenedor-institucion/contenedor-institucion.component';
import { ParticipanteDTO } from 'src/app/core/interfaces/ParticipanteDTO';


@Component({
  selector: 'app-participant-form',
  // standalone: true,
  // imports: [MatIcon, MatOptionModule, CommonModule, ReactiveFormsModule], //, MatCard, MatCardContent, MatCardTitle],
  templateUrl: './participant-form.component.html',
  styleUrl: './participant-form.component.scss'
})
export class ParticipantFormComponent {
  form: FormGroup;

  grupos: IParticipantGroupDTO[] = [];
  roles: IParticipantRoleDTO[] = [];
  vinculos: VinculoParticipanteDTO[] = [];

  constructor(
    private participantService: ParticipantService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ParticipantFormComponent>,
    private snackBar: MatSnackBar,
    public dialogo: MatDialog,
    private personaNaturalService: PersonaNaturalService,
    private participantGroupService: ParticipantGroupService,
    private participantRoleService: ParticipantRoleService,
    @Inject(MAT_DIALOG_DATA) public data: { participante: IProjectParticipantDTO }
  ) {
    const p = data.participante;

    // Se inicializa el formulario con valores por defecto o los del participante recibido
    this.form = this.fb.group({
      anonimo: [p?.anonimo ?? 0],
      codFaculProgApoy: [p?.codFaculProgApoy ?? null],
      codProgramaApoyado: [p?.codProgramaApoyado ?? null],
      dedicacionHoras: [p?.dedicacionHoras ?? null],
      dedicacionHorasPlan: [p?.dedicacionHorasPlan ?? null],
      dedicacionMeses: [p?.dedicacionMeses ?? null],
      dedicacionMesesPlan: [p?.dedicacionMesesPlan ?? null],
      dedicacionNN: [p?.dedicacionNN ?? ''],
      detalleContrato: [p?.detalleContrato ?? ''],
      esInvestigadorPrinci: [p?.esInvestigadorPrinci ?? ''],
      esInvestigadorPrincipal: [p?.esInvestigadorPrincipal ?? 0],
      fechaActualiza: [p?.fechaActualiza ?? null],
      fechaCrea: [p?.fechaCrea ?? null],
      fechaFin: [p?.fechaFin ?? null],
      fechaInicio: [p?.fechaInicio ?? null],
      funcion: [p?.funcion ?? ''],
      grupo: [p?.grupo ?? null],
      identificador: [p?.identificador ?? null],
      institucion: [p?.institucion ?? ''],
      nombreCortoGrupo: [p?.nombreCortoGrupo ?? ''],
      nombreGrupo: [p?.nombreGrupo ?? ''],
      nombrePersona: [p?.nombrePersona ?? ''],
      nombreProgramaExterno: [p?.nombreProgramaExterno ?? ''],
      observacion: [p?.observacion ?? ''],
      participaBeneficios: [p?.participaBeneficios ?? ''],
      personaNatural: [p?.personaNatural ?? ''],
      porcentajeBeneficios: [p?.porcentajeBeneficios ?? null],
      porcentajeProgAcad: [p?.porcentajeProgAcad ?? null],
      proyecto: [p?.proyecto ?? ''],
      rolParticipante: [p?.rolParticipante ?? ''],
      rolParticipanteProyecto: [p?.rolParticipanteProyecto ?? null],
      selectorInstitucion: [p?.selectorInstitucion ?? ''],
      selectorPersona: [p?.selectorPersona ?? ''],
      tipoContrato: [p?.tipoContrato ?? ''],
      usuarioActualiza: [p?.usuarioActualiza ?? ''],
      usuarioCrea: [p?.usuarioCrea ?? ''],
      vinculacionClase: [p?.vinculacionClase ?? ''],
      vinculacionTipo: [p?.vinculacionTipo ?? ''],
      vinculacionUdea: [p?.vinculacionUdea ?? ''],
      actualizar: [true],
      notaAclaratoria: [''],
      correo: [p?.correo ?? '']

    });

    this.form.get('personaNatural')?.valueChanges.subscribe((nuevoValor) => {
      if (nuevoValor && nuevoValor.trim() !== '') {
        this.onPersonaNaturalChange(nuevoValor);
      }
    });

  }



  ngOnInit(): void {
    this.cargarDatosGrupos();
    this.cargarDatosRoles();
    this.cargarDatosVinculacion();
  }

  private onPersonaNaturalChange(idPersona: string): void {
    this.form.value.nombreGrupo = '';
    this.form.value.grupo = null;


    this.grupos = [];
    this.vinculos = [];
    this.cargarDatosGruposPorPersona(idPersona);
    this.cargarDatosVinculacionPorPersona(idPersona);
  }

  private cargarDatosVinculacion(): void {

    const id = this.form.get('personaNatural')?.value || this.data.participante.personaNatural;

    if (!id) return;

    this.participantService.getVinculoParticipant(id).subscribe({
      next: (listaVinculacion) => {
        if (listaVinculacion && listaVinculacion.length > 0) {
          // Supongamos que tomamos el primero o el que corresponda
          const vinculo = listaVinculacion[0];
          this.vinculos = listaVinculacion;
        } else {
          console.warn('No se encontraron datos de vinculación para este participante');
        }
      },
      error: (err) => {
        console.error('Error al obtener lista de vinculación', err);
        this.snackBar.open('Error al cargar datos de vinculación ❌', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    });
  }

  private cargarDatosVinculacionPorPersona(idPersona: string): void {
    if (!idPersona) return;
    this.participantService.getVinculoParticipant(idPersona).subscribe({
      next: (listaVinculacion) => this.vinculos = listaVinculacion ?? [],
      error: (err) => {
        console.error('Error al obtener vinculaciones por persona', err);
        this.snackBar.open('Error al cargar datos de vinculación ❌', 'Cerrar', { duration: 3000 });
      }
    });
  }

  actualizar(): void {
    if (this.form.invalid) {
      this.snackBar.open('Complete todos los campos requeridos ⚠️', 'Cerrar', { duration: 3000 });
      return;
    }

    // Mapeo de IProjectParticipantDTO -> ParticipanteDTO
    // const participanteDTO: ParticipanteDTO = {


    // personaNatural: this.form.value.personaNatural,
    // selectorPersona: this.data.participante.selectorPersona,
    // vinculacionUdea: this.form.value.vinculacionUdea,
    // vinculacionTipo: this.form.value.vinculacionTipo,
    // vinculacionClase: this.form.value.vinculacionClase,
    // codProgramaApoyado: this.form.value.codProgramaApoyado,
    // anonimo: this.form.value.anonimo,
    // institucion: this.form.value.institucion,
    // grupo: this.form.value.grupo,
    // dedicacionMeses: this.form.value.dedicacionMeses,
    // dedicacionHoras: this.form.value.dedicacionHoras,
    // dedicacionMesesPlan: this.form.value.dedicacionMesesPlan,
    // dedicacionHorasPlan: this.form.value.dedicacionHorasPlan,
    // porcentajeBeneficios: this.form.value.porcentajeBeneficios,
    // funcion: this.form.value.funcion,
    // observacion: this.data.participante.observacion,
    // usuarioActualiza: this.data.participante.usuarioActualiza,
    // identificador: this.data.participante.identificador,
    // notaAclaratoria: 0,
    // notaAclaratoriaGeneral: '',
    // tipoContrato: this.data.participante.tipoContrato,
    // detalleContrato: this.data.participante.detalleContrato,
    // rolParticipanteProyecto: this.form.value.rolParticipanteProyecto,
    // nombreProgramaExterno: this.data.participante.nombreProgramaExterno,



    // Mapeo del formulario hacia el DTO para SP_UPDATE
    const participanteDTO: ParticipanteDTO = {
      proyecto: this.data.participante.proyecto, // viene del contexto del proyecto
      personaNatural: this.form.value.personaNatural,
      selectorPersona: this.data.participante.selectorPersona || 'H',
      vinculacionUdea: this.form.value.personaNatural == '' ? null : this.form.value.vinculacionUdea, //this.form.value.vinculacionUdea,
      vinculacionTipo: this.form.value.personaNatural == '' ? null : this.form.value.vinculacionTipo, //this.form.value.vinculacionTipo,
      vinculacionClase: this.form.value.personaNatural == '' ? null : this.form.value.vinculacionClase, //this.form.value.vinculacionClase,
      codProgramaApoyado: this.form.value.codProgramaApoyado,
      anonimo: this.form.value.personaNatural == '' ? this.form.value.anonimo : 0,
      fechaInicio: this.form.value.fechaInicio ? this.formatearFecha(this.form.value.fechaInicio) : this.form.value.fechaInicio,
      fechaFin: this.form.value.fechaFin ? this.formatearFecha(this.form.value.fechaFin) : this.form.value.fechaFin,
      rolParticipanteProyecto: this.form.value.rolParticipanteProyecto,
      institucion: this.form.value.institucion,
      selectorInstitucion: this.form.value.selectorInstitucion || 'J',
      grupo: this.form.value.personaNatural != '' ? this.form.value.grupo || this.data.participante.grupo : null,
      dedicacionMeses: this.form.value.dedicacionMeses,
      dedicacionHoras: this.form.value.dedicacionHoras,
      dedicacionMesesPlan: this.form.value.dedicacionMesesPlan,
      dedicacionHorasPlan: this.form.value.dedicacionHorasPlan,
      porcentajeBeneficios: this.form.value.porcentajeBeneficios,
      funcion: this.form.value.funcion,
      observacion: this.form.value.observacion || this.data.participante.observacion,
      usuarioActualiza: this.data.participante.usuarioActualiza,
      identificador: this.data.participante.identificador,
      nombre: this.form.value.nombrePersona=='Anónimo'? null: this.form.value.nombrePersona,
      correo: this.form.value.correo,
      notaAclaratoria: this.form.value.notaAclaratoria || null,
      notaAclaratoriaGeneral: this.form.value.notaAclaratoriaGeneral || '',
      tipoContrato: this.form.value.tipoContrato || this.data.participante.tipoContrato || '',
      detalleContrato: this.form.value.detalleContrato || this.data.participante.detalleContrato || '',
      nombreProgramaExterno: this.form.value.nombreProgramaExterno || this.data.participante.nombreProgramaExterno || ''

    };

    this.participantService.updateParticipant(participanteDTO).pipe(take(1)).subscribe({
      next: () => {
        this.snackBar.open('Participante actualizado ✅', 'Cerrar', { duration: 3000 });
        this.dialogRef.close(participanteDTO);
      },
      error: (err) => {
        console.error('Error al actualizar participante', err);
        this.snackBar.open('Error al actualizar participante ❌', 'Cerrar', { duration: 3000 });
      }
    });
  }


  cancelar(): void {
    this.dialogRef.close();
  }


  abrirModalSeleccionarPersonaNatural(): void {
    const modalRef = this.dialogo.open(ContenedorPersonaNaturalComponent, {
      width: '900px',
      data: {} // puedes enviar configuración si es necesario
    });

    modalRef.afterClosed().pipe(take(1)).subscribe((resultado) => {
      if (resultado && resultado.identificacion) {
        // Se llama al servicio con el ID devuelto desde la modal
        this.personaNaturalService.getPersonaNatural(resultado.identificacion).pipe(take(1)).subscribe({
          next: (natural) => {
            if (natural) {
              this.form.patchValue({
                nombrePersona: `${natural.nombrePila} ${natural.apellido1} ${natural.apellido2}`,
                personaNatural: natural.identificacion,
                correo: natural.correoElectronico
              });

              this.snackBar.open('Persona natural seleccionada ✅', 'Cerrar', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
              });
            }
          },
          error: (err) => {
            console.error('Error al obtener persona natural', err);
            this.snackBar.open('Error al cargar datos de la persona ❌', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
          }
        });
      } else {
        console.warn('No se seleccionó ninguna persona natural');
      }
    });
    this.cargarDatosGrupos();
    this.cargarDatosRoles();
    this.cargarDatosVinculacion();
  }

  abrirModalSeleccionarInstitucion(): void {
    const modalRef = this.dialogo.open(ContenedorInstitucionComponent, {
      width: '900px',
      data: { permiteCrear: true }
    });

    modalRef.afterClosed().pipe(take(1)).subscribe((resultado) => {
      if (resultado && resultado.nit) {
        // Actualiza campos del form con la institución seleccionada
        this.form.patchValue({
          institucion: resultado.nit, // ó resultado.nombreCorto si prefieres
          // si tienes un campo para nit o codigo, actualízalo también
          // ejemplo: codInstitucion: resultado.codigoSap
        });

        this.snackBar.open('Institución seleccionada ✅', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      } else {
        console.warn('No se seleccionó institución');
      }
    });
  }


  private cargarDatosGrupos(): void {

    const id = this.form.get('personaNatural')?.value || this.data.participante.personaNatural;

    if (!id) return;

    this.participantGroupService.getParticipantGroupByid(id).subscribe({
      next: (listaGrupos) => {
        if (listaGrupos && listaGrupos.length > 0) {
          // Supongamos que tomamos el primero o el que corresponda
          this.grupos = listaGrupos;
        } else {
          console.warn('No se encontraron datos de grupo para este participante');
        }
      },
      error: (err) => {
        console.error('Error al obtener lista de grupo', err);
        this.snackBar.open('Error al cargar datos de grupo ❌', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    });
  }

  private cargarDatosGruposPorPersona(idPersona: string): void {
    if (!idPersona) return;
    this.participantGroupService.getParticipantGroupByid(idPersona).subscribe({
      next: (listaGrupos) => this.grupos = listaGrupos ?? [],
      error: (err) => {
        console.error('Error al obtener grupos por persona', err);
        this.snackBar.open('Error al cargar los grupos ❌', 'Cerrar', { duration: 3000 });
      },
    });
  }

  private cargarDatosRoles(): void {
    this.participantRoleService.getParticipantRole().pipe(take(1)).subscribe({
      next: (roles) => {
        if (Array.isArray(roles) && roles.length > 0) {
          this.roles = roles;
        } else {
          console.warn('No se encontraron roles disponibles.');
          this.roles = []; // Asegura un estado limpio
        }
      },
      error: (error) => {
        console.error('Error al obtener la lista de roles:', error);
        this.snackBar.open('Error al cargar los datos de roles ❌', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.roles = []; // Previene que queden datos viejos
      },
    });
  }


private formatearFecha(fecha: string | Date): string {
    const f = new Date(fecha);
    return f.toISOString().slice(0, 23); // yyyy-MM-ddTHH:mm:ss.SSS
  }

onVinculoChange(event: Event): void {
  const selectElement = event.target as HTMLSelectElement;
  const selectedValue = selectElement.value;

  // Buscar el objeto vinculo correspondiente en la lista
  const vinculoSeleccionado = this.vinculos.find(
    (v) => v.secuenciaVinculacion === +selectedValue
  );

  if (vinculoSeleccionado) {
    // Actualizar los campos relacionados en el formulario
    this.form.patchValue({
      vinculacionUdea: vinculoSeleccionado.secuenciaVinculacion || '',
      vinculacionTipo: vinculoSeleccionado.codigoTipoVinculacion || '',
      vinculacionClase: vinculoSeleccionado.codigoClaseEmpleado || ''
    });
  } else {
    // Si no hay selección, limpiar los campos
    this.form.patchValue({
      vinculacionUdea: '',
      vinculacionTipo: '',
      vinculacionClase: ''
    });
  }
}

}

