import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { PersonaMaresDTO } from 'src/app/core/interfaces/PersonaMaresDTO';

@Component({
  selector: 'app-resultado-jinvestigador',
  templateUrl: './resultado-jinvestigador.component.html',
  styleUrls: ['./resultado-jinvestigador.component.scss']
})
export class ResultadoJinvestigadorComponent implements OnChanges {
  @Input() resultados: PersonaMaresDTO = {} as PersonaMaresDTO;
  @Output() emitirSeleccion = new EventEmitter<PersonaMaresDTO>();

   totalRegistros = {};

  ngOnChanges() {
    this.totalRegistros = this.resultados;
  }
  seleccionar(jinvestigador: PersonaMaresDTO) {
    this.emitirSeleccion.emit(jinvestigador);
  }
}
