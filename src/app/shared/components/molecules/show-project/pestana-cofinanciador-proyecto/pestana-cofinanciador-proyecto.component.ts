import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InformacionGeneralProyecto } from '../informacion-general-proyecto';
import { AportanteProyectoService } from 'src/app/shared/services/show-project/aportante-proyecto.service';
import { AportanteProyectoLocalService } from 'src/app/shared/services/show-project/aportante-proyecto-local.service';
import { ProyectoLocalService } from 'src/app/shared/services/show-project/proyecto-local.service';
import { AlertaLocalService } from 'src/app/shared/services/show-project/alerta-local.service';
import { ContenedorFinanciadorBusquedaProyectoComponent } from '../contenedor-financiador-busqueda-proyecto/contenedor-financiador-busqueda-proyecto.component';
import { AlertaMensaje } from '../mensaje-exito-error/alerta-mensaje';
import { AportanteProyecto } from '../aportante-proyecto';
import { UdeaConstantes } from '../udea-constantes';
import { DatosModalInformativo } from '../modal-dinamico-informativo/datos-modal-informativo';
import { ProyectoConstantes } from '../proyecto-constantes';
import { ClaseAlerta } from '../clase-alerta';
import { ModalDinamicoInformativoComponent } from '../modal-dinamico-informativo/modal-dinamico-informativo.component';

const MENSAJE_EXITO = 'Cofinanciadores guardados con éxito.';
const MENSAJE_ERROR = 'Ocurrió un error guardando los cofinanciadores.';


@Component({
  selector: 'app-pestana-cofinanciador-proyecto',
  templateUrl: './pestana-cofinanciador-proyecto.component.html',
  styleUrls: ['./pestana-cofinanciador-proyecto.component.css']
})
export class PestanaCofinanciadorProyectoComponent implements OnInit {

  @Input() editable = false;

  aportanteTieneFinanciador = false;
  esProyectoProcesoSeleccion = false;
  esProyectoConvocatoria = false;

  constructor(
    public dialogo: MatDialog,
    private aportanteProyectoServicio: AportanteProyectoService,
    private aportanteproyectoLocalServicio: AportanteProyectoLocalService,
    private proyectoLocalServicio: ProyectoLocalService,
    private alertaServicioLocal: AlertaLocalService) {
  }

  ngOnInit() {
  }

  abrirVentanaBuscarFinanciador() {
    const infoCofinanciador = true;
    this.dialogo.open(ContenedorFinanciadorBusquedaProyectoComponent, {
      data: infoCofinanciador
    });
  }

  abrirVentanaBuscarGrupo() {
    // this.dialogo.open(ContenedorGrupoBusquedaComponent);
  }

  guardarTablaAportantes() {
    // const mensaje = new AlertaMensaje();
    // const informacioninformacionGeneralProyecto: InformacionGeneralProyecto =
    //   this.proyectoLocalServicio.obtenerInformacionGeneralProyecto();
    // this.validarSiEsProcesoOConvocatoria(informacioninformacionGeneralProyecto);
    // const listaAportanteProyecto: AportanteProyecto[] = this.aportanteproyectoLocalServicio.obtenerListaAportanteTemporal();
    // if (this.esProyectoProcesoSeleccion) {
    //   for (const aportanteProyecto of listaAportanteProyecto) {
    //     if (aportanteProyecto.tipo === UdeaConstantes.TIPO_FINANCIADOR) {
    //       this.aportanteTieneFinanciador = true;
    //       break;
    //     } else {
    //       this.aportanteTieneFinanciador = false;
    //     }
    //   }
    // } else {
    //   this.aportanteTieneFinanciador = true;
    // }
    // if (this.aportanteTieneFinanciador) {

    //   const nuevosAportantes = listaAportanteProyecto.filter(a => !a.identificador);
    //   this.aportanteProyectoServicio.guardarAportanteProyecto(listaAportanteProyecto).subscribe(resultadoListaAportante => {
    //     resultadoListaAportante.forEach(aportante => aportante.aportanteGuardado = true);
    //     this.aportanteproyectoLocalServicio.agregarListaAportanteTemporal(resultadoListaAportante);
    //     this.aportanteproyectoLocalServicio.agregarListaAportanteProyecto(resultadoListaAportante);

    //     const aportantesQueEranNuevos = resultadoListaAportante
    //       .filter(a => this.buscarEnListaAportante(a, nuevosAportantes));

    //     aportantesQueEranNuevos.forEach(a => this.aportanteproyectoLocalServicio.agregarAportanteProyecto(a));

    //     mensaje.tipoMensaje = ConstantesExitoError.EXITO;
    //     mensaje.mensaje = MENSAJE_EXITO;
    //     this.alertaServicioLocal.agregarMensaje(mensaje);
    //   },
    //     _ => {
    //       mensaje.tipoMensaje = ConstantesExitoError.ERROR;
    //       mensaje.mensaje = MENSAJE_ERROR;
    //       this.alertaServicioLocal.agregarMensaje(mensaje);
    //     });

    // } else {
    //   this.abrirModaErrorGuardando();
    // }
  }

  private buscarEnListaAportante(aportante: AportanteProyecto, nuevosAportantes: AportanteProyecto[]): AportanteProyecto | undefined {
    return nuevosAportantes.find(a => this.compararAportante(aportante, a));
  }

  compararAportante(aportante: AportanteProyecto, aportanteComparar: AportanteProyecto): boolean {
    const mismoFinanciador = aportante.personaJuridica?.nit === aportanteComparar.personaJuridica?.nit;
    if (aportanteComparar.personaJuridica?.nit === UdeaConstantes.NIT_UDEA) {
      return !!mismoFinanciador
        && (this.compararDependencia(aportante, aportanteComparar) || this.compararGrupo(aportante, aportanteComparar));
    } else {
      return !!mismoFinanciador;
    }
  }

  private compararDependencia(aportante: AportanteProyecto, aportanteComparar: AportanteProyecto): boolean {
    return !!aportante.dependencia && !!aportanteComparar.dependencia
      && aportante.dependencia.nombreCorto === aportanteComparar.dependencia.nombreCorto;
  }

  private compararGrupo(aportante: AportanteProyecto, aportanteComparar: AportanteProyecto): boolean {
    return !!aportante.grupo && !!aportanteComparar.grupo
      && aportante.grupo.identificador === aportanteComparar.grupo.identificador;
  }

  public validarSiEsProcesoOConvocatoria(informacioninformacionGeneralProyecto: InformacionGeneralProyecto) {
    if (informacioninformacionGeneralProyecto.convocatoria) {
      this.esProyectoConvocatoria = true;
      this.esProyectoProcesoSeleccion = false;
    } else {
      this.esProyectoConvocatoria = false;
      this.esProyectoProcesoSeleccion = true;
    }
  }

  abrirModaErrorGuardando() {
    const datosModal: DatosModalInformativo = {
      titulo: ProyectoConstantes.TITULO_ALERTA_GUARDANDO_APORTANTE,
      mensaje: ProyectoConstantes.MENSAJE_ALERTA_GUARDANDO_APORTANTE,
      clase: ClaseAlerta.ALERTA_ERROR
    };
    this.dialogo.open(ModalDinamicoInformativoComponent, {
      data: datosModal
    });
  }
}
