import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InstitucionService } from 'src/app/shared/services/institucion/institucion.service';
import { InstitucionRequest } from 'src/app/core/request/isntitucionResquest';

import { PersonaMaresDTO } from 'src/app/core/interfaces/PersonaMaresDTO';
import { JovenInvestigadorService } from 'src/app/shared/services/investigador/joven-investigador.service';

@Component({
  selector: 'app-filtro-jinvestigador',
  templateUrl: './filtro-jinvestigador.component.html',
  styleUrls: ['./filtro-jinvestigador.component.scss']
})
export class FiltroJinvestigadorComponent implements OnInit {
  formulario!: FormGroup;
  cargando = false;

  identificacion = '';

  @Output() emitirBusquedaRealizada = new EventEmitter<PersonaMaresDTO>();
  @Output() emitirFormularioModificado = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private jovenInvestigadorService: JovenInvestigadorService) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      identificacion: ['']
    });

    this.formulario.valueChanges.subscribe(() => this.emitirFormularioModificado.emit());
  }

  buscar(): void {

    // Validación mínima: si ambos vacíos, no buscar
    if (!(this.formulario.get('identificacion')?.value || '').trim()) {
      this.emitirBusquedaRealizada.emit();
      return;
    }

    this.cargando = true;
    this.jovenInvestigadorService.nuevoJovenInvestigador(this.formulario.get('identificacion')?.value).subscribe({
      next: (resultado) => {
        this.cargando = false;
        this.emitirBusquedaRealizada.emit(resultado);
      },
      error: (err) => {
        console.error('Error buscarInstitucion', err);
        this.cargando = false;
        this.emitirBusquedaRealizada.emit();
      }
    });
  }
}
