import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import { InstitucionDTO } from 'src/app/core/interfaces/InstitucionDTO';

@Component({
  selector: 'app-resultado-institucion',
  templateUrl: './resultado-institucion.component.html',
  styleUrls: ['./resultado-institucion.component.scss']
})
export class ResultadoInstitucionComponent implements OnChanges {
  @Input() resultados: InstitucionDTO[] = [];
  @Output() emitirSeleccion = new EventEmitter<InstitucionDTO>();

  ngOnChanges() {
    // no-op, template usa directamente resultados
  }

  seleccionar(inst: InstitucionDTO) {
    this.emitirSeleccion.emit(inst);
  }
}
