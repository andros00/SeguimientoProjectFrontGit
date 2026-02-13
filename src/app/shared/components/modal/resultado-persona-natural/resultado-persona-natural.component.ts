import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { PersonaNaturalDTO } from 'src/app/core/interfaces/PersonaNaturalDTO';

@Component({
  selector: 'app-resultado-persona-natural',
  templateUrl: './resultado-persona-natural.component.html',
  styleUrls: ['./resultado-persona-natural.component.css']
})
export class ResultadoPersonaNaturalComponent implements OnChanges {

  @Input() listaPersonaNatural: PersonaNaturalDTO[] = [];
  @Output() emitirPersonaNauralSeleccionada = new EventEmitter<PersonaNaturalDTO>();

  totalRegistros = 0;

  ngOnChanges() {
    this.totalRegistros = this.listaPersonaNatural?.length || 0;
  }

  seleccionarPersonaNatural(personaNatural: PersonaNaturalDTO) {
    this.emitirPersonaNauralSeleccionada.emit(personaNatural);
  }
}
