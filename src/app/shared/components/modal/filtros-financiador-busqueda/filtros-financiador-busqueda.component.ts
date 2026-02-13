import { FinanciadorConstantes } from './../../financiador-constantes';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FiltroPersonaJuridica } from '../../modelo/filtro-Persona-juridica';
import { PersonaJuridica } from '../../modelo/persona-juridica';

@Component({
  selector: 'app-filtros-financiador-busqueda',
  templateUrl: './filtros-financiador-busqueda.component.html',
  styleUrls: ['./filtros-financiador-busqueda.component.css']
})
export class FiltrosFinanciadorBusquedaComponent implements OnInit {

  @Input() listaPersonaJuridica: PersonaJuridica[] = new Array<PersonaJuridica>();
  @Output() emitirLimpiarFormulario = new EventEmitter<any>();
  @Output() emitirFiltro: EventEmitter<any> = new EventEmitter<any>();
  @Output() emitirCambioEnFormulario: EventEmitter<any> = new EventEmitter<any>();
  formularioFiltrobusquedaFinanciador: FormGroup;
  filtroPersonaJuridica: FiltroPersonaJuridica = new FiltroPersonaJuridica();
  busquedaPorNit: false;
  formularioInvalido = true;

  constructor(
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.inicializarFormularioReactivoParaBusquedaFinanciador();
  }

  inicializarFormularioReactivoParaBusquedaFinanciador() {
    this.formularioFiltrobusquedaFinanciador = this.formBuilder.group({
      limiteGeografico: ['nacional'],
      palabraClave: ['', Validators.minLength(FinanciadorConstantes.TAMANO_MINIMO_PALABRA_CLAVE)],
      nit: [''],
    });
    this.formularioFiltrobusquedaFinanciador.controls.nit.setValidators(
      [Validators.maxLength(FinanciadorConstantes.TAMANO_MAXIMO_NIT_FINANCIADORES), Validators.pattern('^[0-9]*$'),
      Validators.minLength(FinanciadorConstantes.TAMANO_MINIMO_NIT_FINANCIADORES)]);
  }

  get f() { return this.formularioFiltrobusquedaFinanciador.controls; }

  validarLimiteGeografico() {
    return this.formularioFiltrobusquedaFinanciador.controls.limiteGeografico.value === 'nacional';
  }

  validarCambioLimiteGeografico() {
    if (this.validarLimiteGeografico()) {
      this.formularioFiltrobusquedaFinanciador.controls.nit.clearValidators();
      this.formularioFiltrobusquedaFinanciador.controls.nit.setValidators(
        [Validators.maxLength(FinanciadorConstantes.TAMANO_MAXIMO_NIT_FINANCIADORES), Validators.pattern('^[0-9]*$'),
        Validators.minLength(FinanciadorConstantes.TAMANO_MINIMO_NIT_FINANCIADORES)]);
      this.formularioFiltrobusquedaFinanciador.controls.nit.setValue('');

    } else {
      this.formularioFiltrobusquedaFinanciador.controls.nit.clearValidators();
      this.formularioFiltrobusquedaFinanciador.controls.nit.setValue('');
      this.formularioFiltrobusquedaFinanciador.controls.nit.setValidators([Validators.pattern('^([a-zA-Z0-9 -]+)$'),
      Validators.minLength(FinanciadorConstantes.TAMANO_MINIMO_NIT_FINANCIADORES)]);
    }
  }

  validarFormularioBusqueda() {
    this.f.palabraClave.value === '' && this.f.nit.value === '' ? this.formularioInvalido = true :
      this.formularioInvalido = ((this.f.nit.value !== '' && this.f.nit.invalid) ||
        (this.f.palabraClave.value !== '' && this.f.palabraClave.invalid));
  }

  buscar() {
    if (this.formularioFiltrobusquedaFinanciador.controls.nit.errors) {
      return null;
    }
    this.cargarObjetoFiltroPersonaJuridica();
    this.formularioFiltrobusquedaFinanciador.valueChanges.subscribe(cambio => {
      this.emitirCambioEnFormulario.emit();
    });
    this.emitirFiltro.emit(this.filtroPersonaJuridica);
  }

  cargarObjetoFiltroPersonaJuridica() {
    this.filtroPersonaJuridica.nit = this.formularioFiltrobusquedaFinanciador.controls.nit.value;
    this.filtroPersonaJuridica.limiteGeograficoNacional = this.validarLimiteGeografico();
    this.filtroPersonaJuridica.palabraClave = this.formularioFiltrobusquedaFinanciador.controls.palabraClave.value;
  }

  limpiarFormulario() {
    this.f.nit.setValue('');
    this.f.palabraClave.setValue('');
  }
}
