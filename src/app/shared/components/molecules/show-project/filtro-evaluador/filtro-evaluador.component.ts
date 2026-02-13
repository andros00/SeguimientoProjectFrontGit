import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ContenedorFinanciadorBusquedaProyectoComponent } from './../contenedor-financiador-busqueda-proyecto/contenedor-financiador-busqueda-proyecto.component';
import { PersonaJuridica } from '../persona-juridica';
import { EvaluadorService } from 'src/app/shared/services/show-project/evaluador.service';
import { FiltroEvaluador } from '../filtro-evaluador';
import { Evaluador } from '../evaluador-proyecto';

@Component({
  selector: 'app-filtro-evaluador',
  templateUrl: './filtro-evaluador.component.html',
  styleUrls: ['./filtro-evaluador.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class FiltroEvaluadorComponent implements OnInit {

  @Output() emitirFormularioModificado: EventEmitter<any> = new EventEmitter<any>();
  @Output() emitirBusquedaRealizada: EventEmitter<any> = new EventEmitter<any>();
  @Output() emitirCancelar: EventEmitter<any> = new EventEmitter<any>();

  formularioFiltroEvaluador: FormGroup;
 institucion: PersonaJuridica | null = null;
  agregarInstitucion = false;

  constructor(public dialogo: MatDialog, private formBuilder: FormBuilder,
    private evaluadorServicio: EvaluadorService) {



      this.formularioFiltroEvaluador: FormGroup<{
  identificacion: FormControl<string | null>;
  nombres: FormControl<string | null>;
  apellidos: FormControl<string | null>;
  areaEspecialidad: FormControl<string | null>;
}>;

    // this.formularioFiltroEvaluador = this.formBuilder.group({
    //   identificacion: ['', [Validators.required]],
    //   nombres: [''],
    //   apellidos: [''],
    //   areaEspecialidad: [''],
    // }, { validator: this.parametroRequeridoValidator });

    this.formularioFiltroEvaluador.valueChanges.subscribe(
      _ => this.emitirFormularioModificado.emit());
     }

  ngOnInit() {

  }

  inicializarFormulario() {

  }

  get f() { return this.formularioFiltroEvaluador.controls; }


  parametroRequeridoValidator(fg: FormGroup): ValidationErrors | null {
    const nombres = fg.get('nombres')?.value;
    const apellidos = fg.get('apellidos')?.value;
    const identificacion = fg.get('identificacion')?.value;
    const areaEspecialidad = fg.get('areaEspecialidad')?.value;

    return !!nombres || !!apellidos || !!identificacion || !!areaEspecialidad ? null
      : { parametroRequerido: true };
  }

  abrirSeleccionarInstitucion() {
    console.warn('abrirSeleccionarInstitucion deshabilitado en modo solo lectura (filtro-evaluador).');
  }

  eliminarFinanciador() {
    this.institucion = null;
    this.cambioNombres();
  }

  cambioIdentificacion(): void {
    const value = this.f.identificacion.value;
    if (!!value) {
      this.f.identificacion.setValidators(Validators.required);
      this.f.nombres.disable();
      this.f.apellidos.disable();
      this.f.areaEspecialidad.disable();
      this.agregarInstitucion = true;
    } else {
      this.f.identificacion.clearValidators();
      this.f.nombres.enable();
      this.f.apellidos.enable();
      this.f.areaEspecialidad.enable();
      this.agregarInstitucion = false;
    }
    this.f.identificacion.updateValueAndValidity();
  }

  cambioNombres(): void {
    const nombre = this.f.nombres.value;
    const apellido = this.f.apellidos.value;
    const areaEspecialidad = this.f.areaEspecialidad.value;

    if (!!nombre || !!apellido || !!areaEspecialidad || !!this.institucion) {
      this.f.identificacion.disable();
    } else {
      this.f.identificacion.enable();
    }
    this.f.nombres.updateValueAndValidity();
    this.f.apellidos.updateValueAndValidity();
    this.f.areaEspecialidad.updateValueAndValidity();
  }

  buscarEvaluador() {
    console.warn('buscarEvaluador deshabilitado en modo solo lectura (filtro-evaluador).');
  }

  private notificarResultados(resultados: Evaluador[], identificacionBucar: string) {
    const data = {
      evaluadores: resultados,
      identificacion: identificacionBucar
    };
    this.emitirBusquedaRealizada.emit(data);
  }

  cerrarModal() {
    this.emitirCancelar.emit();
  }

}
