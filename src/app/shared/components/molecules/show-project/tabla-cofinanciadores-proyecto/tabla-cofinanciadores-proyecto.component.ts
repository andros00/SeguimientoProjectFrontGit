import { Component, OnInit, Input } from '@angular/core';
import { of, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { UdeaConstantes } from '../udea-constantes';
import { DatosModal } from '../modal-dinamico/datos-modal';
import { ModalDinamicoComponent } from '../modal-dinamico/modal-dinamico.component';
import { MatDialog } from '@angular/material/dialog';
import { ClaseAlerta } from '../clase-alerta';
import { ProyectoMensajes } from '../proyecto-mensajes';
import { ActivatedRoute } from '@angular/router';
import { ProyectoLocalService } from 'src/app/shared/services/show-project/proyecto-local.service';
import { FinanciadorConvocatoria } from '../financiador-convocatoria';
import { AportanteProyecto } from '../aportante-proyecto';
import { ProyectoConstantes } from '../proyecto-constantes';
import { InformacionGeneralProyecto } from '../informacion-general-proyecto';
import { AportanteProyectoLocalService } from 'src/app/shared/services/show-project/aportante-proyecto-local.service';
import { AportanteProyectoService } from 'src/app/shared/services/show-project/aportante-proyecto.service';

@Component({
  selector: 'app-tabla-cofinanciadores-proyecto',
  templateUrl: './tabla-cofinanciadores-proyecto.component.html',
  styleUrls: ['./tabla-cofinanciadores-proyecto.component.css']
})
export class TablaCofinanciadoresProyectoComponent implements OnInit {

  @Input() editable = false;

  listaFinanciadores: FinanciadorConvocatoria[] = [];
  listaAportante$: Observable<AportanteProyecto[]> = new Observable;
  listaAportanteProyecto: AportanteProyecto[] = [];
  columnas = ProyectoConstantes.COLUMNAS_TABLA_COFINANCIADORES;

  informacionGeneralProyecto: InformacionGeneralProyecto;
  esProyectoProcesoSeleccion = false;
  esProyectoConvocatoria = false;
  tipo = new FormControl('');

  codigoProyecto: string;
  grupoDependenciaPorDefectoUdeA: string = UdeaConstantes.APORTE_RECURSOS_ESPECIA;
  nitFinanciadorUdeA: string = UdeaConstantes.NIT_UDEA;

  constructor(
    private proyectoLocalServicio: ProyectoLocalService,
    private aportanteProyectoServicioLocal: AportanteProyectoLocalService,
    private aportanteProyectoServicio: AportanteProyectoService,
    private modal: MatDialog,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const modoEdicion = this.activeRoute.snapshot.queryParams.estado === 'Editar';
    this.aportanteProyectoServicioLocal.listaAportanteTemporalObservable.subscribe(listaAportante$ => {
      this.listaAportante$ = of(listaAportante$);
    });
    this.informacionGeneralProyecto = this.proyectoLocalServicio.obtenerInformacionGeneralProyecto();

    this.proyectoLocalServicio.observableProyectoGuardado().subscribe(
      _ => {
        this.codigoProyecto = this.informacionGeneralProyecto.codigo;
        if (!modoEdicion) {
          this.cargarAportantesDelProyecto();
        }
        this.validarSiEsProcesoOConvocatoria();
      }
    );
  }

  esAporteRecursoEnEspecie(aportanteProyecto: AportanteProyecto) {
    return (aportanteProyecto.dependencia === null && aportanteProyecto.grupo === null);
  }

  public validarSiEsProcesoOConvocatoria() {
    if (this.informacionGeneralProyecto.convocatoria) {
      this.esProyectoConvocatoria = true;
    } else {
      this.esProyectoProcesoSeleccion = true;
    }
  }

  esFinanciadorUdeA(nit: string) {
    return nit === this.nitFinanciadorUdeA;
  }

  validarEsCofinanciadorOFinanciador(tipo: string): string {
    return tipo === UdeaConstantes.TIPO_COFINANCIADOR ? UdeaConstantes.COFINANCIADOR : UdeaConstantes.FINANCIADOR;
  }

  cargarAportantesDelProyecto() {
    this.aportanteProyectoServicio.consultarListaAportanteProyecto(this.codigoProyecto).subscribe(listaAportante => {
      listaAportante.forEach(aportante => aportante.aportanteGuardado = true);
      this.aportanteProyectoServicioLocal.agregarListaAportanteProyecto(listaAportante);
      this.aportanteProyectoServicioLocal.agregarListaAportanteTemporal(listaAportante);
    });
  }

  cambioEnAportante(aportanteProyecto: AportanteProyecto) {
    aportanteProyecto.aportanteGuardado = false;
    this.aportanteProyectoServicioLocal.agregarListaAportanteTemporal(this.aportanteProyectoServicioLocal.obtenerListaAportante());
  }

  habilitarEliminarRegistro(aportanteProyecto: AportanteProyecto) {
    if ((this.esFinanciadorUdeA(aportanteProyecto.personaJuridica.nit) && this.esAporteRecursoEnEspecie(aportanteProyecto))) {
      return false;
    }
    if (this.esProyectoConvocatoria) {
      if (aportanteProyecto.tipo === UdeaConstantes.TIPO_COFINANCIADOR) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  validarEliminarAportante(aportanteProyecto: AportanteProyecto) {
    const datosModal: DatosModal = {
      titulo: ProyectoMensajes.TITULO_ELIMINAR_APORTANTE,
      mensaje: ProyectoMensajes.MENSAJE_ELIMINAR_APORTANTE,
      textoPrimerBoton: ClaseAlerta.CANCELAR,
      textoSegundoBoton: ClaseAlerta.ACEPTAR,
      clase: ClaseAlerta.ALERTA_INFORMATIVA

    };
    const modalContinuarSinGuardar = this.modal.open(ModalDinamicoComponent, {
      data: datosModal
    });

    modalContinuarSinGuardar.afterClosed().subscribe(resultado => {
      if (ClaseAlerta.ACEPTAR === resultado) {
        this.eliminarAportante(aportanteProyecto);
      }
    });
  }

  validarEditarAportante(aportanteProyecto: AportanteProyecto) {
    const datosModal: DatosModal = {
      titulo: ProyectoMensajes.TITULO_EDITAR_APORTANTE,
      mensaje: ProyectoMensajes.MENSAJE_EDITAR_APORTANTE,
      textoPrimerBoton: ClaseAlerta.CANCELAR,
      textoSegundoBoton: ClaseAlerta.ACEPTAR,
      clase: ClaseAlerta.ALERTA_INFORMATIVA,
      editarAportante: aportanteProyecto,

    };
    const modalContinuarSinGuardar = this.modal.open(ModalDinamicoComponent, {
      data: datosModal
    });

    modalContinuarSinGuardar.afterClosed().subscribe(resultado => {
      if (ClaseAlerta.ACEPTAR === resultado.textoSegundoBoton) {
        this.actualizarAportante(resultado.editarAportante);
      }
    });
  }

  actualizarAportante(aportanteProyecto: AportanteProyecto): void {
    // const aportanteAEditar: ActualizarAportante =  {
    //   tipoFinanciacion: {
    //     identificador: aportanteProyecto.identificador,
    //     tipoFinanciacion: aportanteProyecto.tipoFinanciacion.identificador,
    //   },
    //   sectorAportante: {
    //     identificador: aportanteProyecto.identificador,
    //     sector: aportanteProyecto.sectorAportante.identificador
    //   }
    // }
    // if(aportanteProyecto.identificador > 0){
    //   this.aportanteProyectoServicio.editarAportante(aportanteAEditar).subscribe(_ => {
    //   });
    // }
  }

  eliminarAportante(aportanteProyecto: AportanteProyecto) {
    if (aportanteProyecto.identificador) {
      this.aportanteProyectoServicio.eliminarAportante(aportanteProyecto.identificador).subscribe(_ => {
        this.eliminarAportanteEnTabla(aportanteProyecto);
        this.aportanteProyectoServicioLocal.eliminarAportanteProyecto(aportanteProyecto);
      });
    } else {
      this.eliminarAportanteEnTabla(aportanteProyecto);
    }
  }

  private eliminarAportanteEnTabla(aportanteProyecto: AportanteProyecto) {
    const listaAportante = this.aportanteProyectoServicioLocal.obtenerListaAportante();
    const indexAportante = listaAportante.indexOf(aportanteProyecto);
    listaAportante.splice(indexAportante, 1);
    this.aportanteProyectoServicioLocal.agregarListaAportanteTemporal(listaAportante);
    this.aportanteProyectoServicioLocal.agregarListaAportanteProyecto(listaAportante);
  }
}
