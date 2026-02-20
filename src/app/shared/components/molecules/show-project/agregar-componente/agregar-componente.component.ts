import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComponenteMacroproyecto } from '../componente-macroproyecto';
import { PersonaNatural } from '../persona-natural';
import { PersonaNaturalLocalService } from 'src/app/shared/services/show-project/persona-natural-local.service';
import { ContenedorPersonaNaturalComponent } from '../../../modal/contenedor-persona-natural/contenedor-persona-natural.component';
import { ComponenteProyectoConstantes } from '../componente-proyecto-constantes';
import { ProyectoLocalService } from 'src/app/shared/services/show-project/proyecto-local.service';
import { ComponenteProyectoLocalService } from 'src/app/shared/services/show-project/componente-proyecto-local.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-agregar-componente',
  templateUrl: './agregar-componente.component.html',
  styleUrls: ['./agregar-componente.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatMenuModule, MatIconModule, MatCheckboxModule, MatButtonModule, MatInputModule]
})
export class AgregarComponenteComponent implements OnInit {

  formularioComponente!: FormGroup;
  responsableSeleccionado = 0;
  informacionGuardada = false;
  responsable: PersonaNatural | null = null;
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

  get f() { return this.formularioComponente.controls as any; }

  abrirModalSeleccionarResponsable() {
    const modalContenedorPersonaNatural = this.dialogo.open(ContenedorPersonaNaturalComponent);
    modalContenedorPersonaNatural.afterClosed().subscribe(resultado => {
      this.personaNaturalLocalService.obtenerPersonaNatural().subscribe(responsable => {
        if (!!responsable.nombrePila) {
          this.f.responsable.setValue(responsable);
          this.responsable = responsable;
          this.responsableIndeterminado = false;
          this.personaNaturalLocalService.eliminarPersonaNatural();
        }
      });
    });
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

    const componenteMacroproyecto = {} as ComponenteMacroproyecto;
    componenteMacroproyecto.identificador = 0;
    componenteMacroproyecto.cantidadproyectos = this.f.numeroProyectos.value;
    componenteMacroproyecto.descripcion = this.f.descripcion.value;
    componenteMacroproyecto.macroproyecto = this.proyectoServicioLocal.obtenerInformacionGeneralProyecto().codigo;
    if (!this.responsableIndeterminado) {
      componenteMacroproyecto.personaNatural = this.responsable || undefined;
    }
    componenteMacroproyecto.titulo = this.f.titulo.value;

    const listaComponentes = this.componenteProyectoServicioLocal.obtenerListaComponenteProyecto();
    listaComponentes.push(componenteMacroproyecto);
    this.componenteProyectoServicioLocal.agregarComponenteProyecto(listaComponentes);
    this.cerrarModal();
  }
  cerrarModal() {
    this.modalAgregarComponente.close();
  }

}
