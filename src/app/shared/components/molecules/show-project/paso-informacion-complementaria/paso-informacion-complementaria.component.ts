import { Component, EventEmitter, OnInit, Output, Input  } from '@angular/core';

@Component({
  selector: 'app-paso-informacion-complementaria',
  templateUrl: './paso-informacion-complementaria.component.html',
  styleUrls: ['./paso-informacion-complementaria.component.css']
})
export class PasoInformacionComplementariaComponent implements OnInit {

  @Output() pasoSiguiente = new EventEmitter<any>();
  @Output() pasoAnterior = new EventEmitter<any>();

  @Input() editable: boolean;

  constructor() { }

  ngOnInit() {
  }

  emitirPasoSiguiente() {
    this.pasoSiguiente.emit();
  }

  emitirPasoAnterior() {
    this.pasoAnterior.emit();
  }


}
