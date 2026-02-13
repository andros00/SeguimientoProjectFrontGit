import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ComponenteMacroproyecto } from '../componente-macroproyecto';
import { PersonaNatural } from '../persona-natural';
import { PersonaNaturalLocalService } from 'src/app/shared/services/show-project/persona-natural-local.service';
import { ContenedorPersonaNaturalComponent } from '../../../modal/contenedor-persona-natural/contenedor-persona-natural.component';
import { ComponenteProyectoConstantes } from '../componente-proyecto-constantes';
import { ProyectoLocalService } from 'src/app/shared/services/show-project/proyecto-local.service';
import { ComponenteProyectoLocalService } from 'src/app/shared/services/show-project/componente-proyecto-local.service';

@Component({
  selector: 'app-agregar-componente',
  templateUrl: './agregar-componente.component.html',
  styleUrls: ['./agregar-componente.component.css']
})
export class AgregarComponenteComponent implements OnInit {

  formularioComponente: FormGroup;
  responsableSeleccionado = 0;
  informacionGuardada = false;
  responsable: PersonaNatural = null;
  responsableIndeterminado = true;

  constructor(public modalAgregarComponente: MatDialogRef<AgregarComponenteComponent>,
    private formBuilder: FormBuilder,
    private personaNaturalLocalService: PersonaNaturalLocalService,
    public dialogo: MatDialog,
    private componenteProyectoServicioLocal: ComponenteProyectoLocalService,
    private proyectoServicioLocal: ProyectoLocalService) {
    this.modalAgregarComponente.disableClose = true;
    this.personaNaturalLocalService.obtenerPersonaNatural().subscribe(responsable => {
      this.responsable = responsable;
    });
  }

  ngOnInit() {
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.formularioComponente = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.maxLength(ComponenteProyectoConstantes.TAMANO_MAXIMO_TITULO)]],
      responsable: [],
      numeroProyectos: ['', Validators.min(0)],
      descripcion: ['', [Validators.required, Validators.maxLength(ComponenteProyectoConstantes.TAMANO_MAXIMO_DESCRIPCION)]],
    });
  }

  get f() { return this.formularioComponente.controls; }

  abrirModalSeleccionarResponsable() {
    console.warn('abrirModalSeleccionarResponsable deshabilitado en modo solo lectura (agregar-componente).');
  }

  cambioResponsableIndeterminado() {
    if (this.responsableIndeterminado) {
      this.responsable = null;
      this.f.responsable.setValue(null);
    } else {
      this.responsableIndeterminado = true;
    }
  }

  agregarComponente() {
    if (this.formularioComponente.invalid) {
      return;
    }
    this.guardarComponenteLocal();
  }

  private guardarComponenteLocal() {
    console.warn('guardarComponenteLocal deshabilitado en modo solo lectura (agregar-componente).');
  }
  cerrarModal() {
    this.modalAgregarComponente.close();
  }

}
