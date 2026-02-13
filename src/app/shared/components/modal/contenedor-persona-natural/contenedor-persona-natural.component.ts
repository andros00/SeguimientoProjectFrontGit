import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonaNaturalDTO } from 'src/app/core/interfaces/PersonaNaturalDTO';
import { PersonaNaturalService } from 'src/app/shared/services/persona-natural/persona-natural.service';
import { ModalPersonaNaturalConfig } from './modal-persona-natural-config';

@Component({
  selector: 'app-contenedor-persona-natural',
  templateUrl: './contenedor-persona-natural.component.html',
  styleUrls: ['./contenedor-persona-natural.component.css']
})
export class ContenedorPersonaNaturalComponent implements OnInit {

  modoRegistroPersonaNatural = false;
  mostrarAgregarPersona = false;
  permiteCrear = true;
  noHayResultados = false;

  listadoPersonasNaturales: PersonaNaturalDTO[] = [];
  identificacionConsultada = '';

  constructor(
    private modalPersonaNatural: MatDialogRef<ContenedorPersonaNaturalComponent>,
    private personaNaturalService: PersonaNaturalService,
    @Inject(MAT_DIALOG_DATA) config: ModalPersonaNaturalConfig
  ) {
    modalPersonaNatural.disableClose = true;
    this.configuracionModal(config);
  }

  ngOnInit() {}

  private configuracionModal(config: ModalPersonaNaturalConfig) {
    if (!!config) {
      this.permiteCrear = config.permiteCrear;
    }
  }

  busquedaRealizada(persona: PersonaNaturalDTO | null) {
    this.noHayResultados = !persona;
    this.mostrarAgregarPersona = this.noHayResultados && this.permiteCrear;

    this.listadoPersonasNaturales = persona ? [persona] : [];
  }

  mostrarOpcionCreacion(): boolean {
    return this.permiteCrear && this.mostrarAgregarPersona;
  }

  mostrarPersonaNoEncontrada(): boolean {
    return this.noHayResultados && !this.permiteCrear;
  }

  formularioModificado() {
    this.mostrarAgregarPersona = false;
  }

  personaNaturalSeleccionada(personaNatural: PersonaNaturalDTO) {
    this.modalPersonaNatural.close(personaNatural);
  }

  cambiarModoRegistrarPersonaNatural() {
    this.modoRegistroPersonaNatural = true;
  }

  regresarAProyecto() {
    this.modalPersonaNatural.close();
  }
}
