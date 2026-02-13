import { Component, EventEmitter, Output } from '@angular/core';
import { PersonaNaturalService } from 'src/app/shared/services/persona-natural/persona-natural.service';
import { PersonaNaturalDTO } from 'src/app/core/interfaces/PersonaNaturalDTO';

@Component({
  selector: 'app-filtro-persona-natural',
  templateUrl: './filtro-persona-natural.component.html',
  styleUrls: ['./filtro-persona-natural.component.css']
})
export class FiltroPersonaNaturalComponent {

  identificacion = '';
  cargando = false;

  @Output() emitirBusquedaRealizada = new EventEmitter<PersonaNaturalDTO | null>();
  @Output() emitirFormularioModificado = new EventEmitter<void>();

  constructor(private personaNaturalService: PersonaNaturalService) {}

  buscarPersona() {
    if (!this.identificacion.trim()) return;

    this.cargando = true;
    this.personaNaturalService.getPersonaNatural(this.identificacion)
      .subscribe({
        next: (persona) => {
          this.cargando = false;
          this.emitirBusquedaRealizada.emit(persona);
        },
        error: () => {
          this.cargando = false;
          this.emitirBusquedaRealizada.emit(null);
        }
      });
  }

  formularioCambiado() {
    this.emitirFormularioModificado.emit();
  }
}
