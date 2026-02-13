import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InstitucionService } from 'src/app/shared/services/institucion/institucion.service';
import { InstitucionRequest } from 'src/app/core/request/isntitucionResquest';
import { InstitucionDTO } from 'src/app/core/interfaces/InstitucionDTO';

@Component({
  selector: 'app-filtro-institucion',
  templateUrl: './filtro-institucion.component.html',
  styleUrls: ['./filtro-institucion.component.scss']
})
export class FiltroInstitucionComponent implements OnInit {
  formulario!: FormGroup;
  cargando = false;

  @Output() emitirBusquedaRealizada = new EventEmitter<InstitucionDTO[]>();
  @Output() emitirFormularioModificado = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private institucionService: InstitucionService) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nit: [''],
      nombre: ['']
    });

    this.formulario.valueChanges.subscribe(() => this.emitirFormularioModificado.emit());
  }

  buscar(): void {
    const filtro: InstitucionRequest = {
      nit: (this.formulario.get('nit')?.value || '').trim(),
      nombre: (this.formulario.get('nombre')?.value || '').trim()
    };

    // Validación mínima: si ambos vacíos, no buscar
    if (!filtro.nit && !filtro.nombre) {
      this.emitirBusquedaRealizada.emit([]);
      return;
    }

    this.cargando = true;
    this.institucionService.buscarInstitucion(filtro).subscribe({
      next: (resultado) => {
        this.cargando = false;
        this.emitirBusquedaRealizada.emit(resultado || []);
      },
      error: (err) => {
        console.error('Error buscarInstitucion', err);
        this.cargando = false;
        this.emitirBusquedaRealizada.emit([]);
      }
    });
  }
}
