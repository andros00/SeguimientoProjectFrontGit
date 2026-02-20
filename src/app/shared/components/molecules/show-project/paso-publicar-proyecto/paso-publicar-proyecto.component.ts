import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DatosModal } from '../modal-dinamico/datos-modal';
import { Paso } from '../paso';
import { EnviarACentro } from '../enviar-a-centro';
import { DatosModalInformativo } from '../modal-dinamico-informativo/datos-modal-informativo';
import { ClaseAlerta } from '../clase-alerta';
import { SeccionProyecto } from '../seccion-proyecto';
import { ProyectoMensajes } from '../proyecto-mensajes';
import { ProyectoLocalService } from 'src/app/shared/services/show-project/proyecto-local.service';
import { PasosHabilitadosLocalService } from 'src/app/shared/services/show-project/pasos-habilitados-local.service';
import { PasosProyectoService } from 'src/app/shared/services/show-project/pasos-proyecto.service';
import { ModalDinamicoInformativoComponent } from '../modal-dinamico-informativo/modal-dinamico-informativo.component';
import { ModalDinamicoComponent } from '../modal-dinamico/modal-dinamico.component';
import { InformacionGeneralProyectoService } from 'src/app/shared/services/show-project/informacion-general-proyecto.service';
import { InformacionComplementariaLocalService } from 'src/app/shared/services/show-project/informacion-complementaria-local.service';

@Component({
  selector: 'app-paso-publicar-proyecto',
  templateUrl: './paso-publicar-proyecto.component.html',
  styleUrls: ['./paso-publicar-proyecto.component.css'],
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatIconModule, MatCardModule, MatButtonModule],
  providers: [DatePipe]
})
export class PasoPublicarProyectoComponent {

  readonly mensajeConfirmacion = `Recuerde que al enviar el proyecto el centro ya no podrá realizar cambios a menos
  de que se lo permitan en el momento de la revisión. ¿Realmente desea enviar el proyecto?`;
  readonly tituloConfirmacion = 'Enviar proyecto';
  readonly tituloEnvioACentro = 'Enviado a centro';
  mostrarCargando = false;
  listaErrores: string[] = [];

  constructor(private pasosService: PasosProyectoService,
    private proyectoServicioLocal: ProyectoLocalService, private datePipe: DatePipe,
    private informacionGeneralProyectoServicio: InformacionGeneralProyectoService,
    private modal: MatDialog, private modalEnviadoACentro: MatDialog, private router: Router,
    private pasosHabilitadosLocalService: PasosHabilitadosLocalService,
    private informacionComplementariaLocalService: InformacionComplementariaLocalService
  ) {
  }

  public enviarACentro() {
    this.validarProyecto();
  }

  matricularProyecto() {
    const enviarACentro = {} as EnviarACentro;
    const info = this.proyectoServicioLocal.obtenerInformacionGeneralProyecto();
    enviarACentro.codigoProyecto = info?.codigo ?? '';
    enviarACentro.centroDeGestion = info?.centroGestion ?? 0;
    enviarACentro.identificadorProcesoSeleccion = info?.procesoSeleccion?.identificador ?? 0;
    enviarACentro.pestanasGuardadas = this.cargarListaPasos().filter(paso => paso.visible).map(paso => paso.titulo);

    const actualizacionEditable = this.pasosHabilitadosLocalService.esEditable(SeccionProyecto.Actualizacion);
    let actualizacionProyecto = 'false';
    if (actualizacionEditable) {
      actualizacionProyecto = 'true';
    }

    this.informacionGeneralProyectoServicio.enviarProyectoACentro(enviarACentro, actualizacionProyecto).subscribe(enviadoACentro => {
      this.envioACentro(enviadoACentro);
    });
  }

  private envioACentro(enviadoACentro: EnviarACentro) {
    this.mostrarCargando = false;
    const fechaEnvioProyecto = this.datePipe.transform(enviadoACentro.fechaEnvio, 'dd-MM-yyyy HH:mm:ss');
    const mensaje = `El proyecto <strong>${this.proyectoServicioLocal.obtenerInformacionGeneralProyecto().nombreCorto}</strong>
        ha sido enviado al <strong>${enviadoACentro.nombreCompletoCentro}</strong>. Para el proyecto se ha asignado el código
        <strong>${enviadoACentro.codigoProyecto}</strong> y la fecha oficial de envío es <strong>${fechaEnvioProyecto}</strong>.
        A partir de este momento el proyecto queda en estado <strong>${enviadoACentro.estadoProyecto.nombre}</strong>.`;
    const datosModal: DatosModalInformativo = {
      titulo: this.tituloEnvioACentro,
      mensaje: mensaje,
      clase: ClaseAlerta.ALERTA_INFORMATIVA,
    };
    this.modalEnviadoACentro.open(ModalDinamicoInformativoComponent, {
      data: datosModal
    }).afterClosed().subscribe(result => {
      this.router.navigate(['/busqueda-proyecto-proceso']);
    });
  }

  abrirConfirmacionEnviar(): void {
    const datosModal: DatosModal = {
      titulo: this.tituloConfirmacion,
      mensaje: this.mensajeConfirmacion,
      textoPrimerBoton: ClaseAlerta.CANCELAR,
      textoSegundoBoton: ClaseAlerta.ACEPTAR,
      clase: ClaseAlerta.ALERTA_ADVERTENCIA,
    };
    const modalEliminarDocumentoRef = this.modal.open(ModalDinamicoComponent, {
      data: datosModal
    });

    modalEliminarDocumentoRef.afterClosed().subscribe(result => {
      if (ClaseAlerta.ACEPTAR === result) {
        this.enviarACentro();
      }
    });
  }

  private validarProyecto() {
    this.listaErrores = [];
    this.validarVigenciaProcesoSeleccionConvocatoria().subscribe(esVigente => {
      if (!esVigente) {
        this.listaErrores.push(`No puede envíar el proyecto ya que la convocatoria o proceso de selección
          asociado no se encuentra vigente.`);
        return;
      }
      this.cargarListaPasos()
        .filter(paso => paso.visible)
        .map(paso => {
          var inconsistencia = '';
          if (paso.titulo === ProyectoMensajes.PESTANA_COMPLEMENTARIA) {
              inconsistencia = this.informacionComplementariaLocalService.validarInformacionComplementaria();
          }else{
              inconsistencia = paso.servicio.validar();
          }
          paso.valido = !!inconsistencia;
          return inconsistencia;
        })
        .filter(error => !!error)
        .forEach(error => this.listaErrores.push(error));

      this.marcarPasosConErrores();

      if (this.listaErrores.length === 0) {
        this.mostrarCargando = true;
        this.guardarPasos().then(_ => {
          if (this.listaErrores.length === 0) {
            this.matricularProyecto();
          } else {
            this.mostrarCargando = false;
            return;
          }
        });
      } else {
        return;
      }
    });
  }

  private marcarPasosConErrores() {
    this.pasosService.obtenerPasos().complementaria.valido =
      this.esPasoValido(this.pasosService.obtenerPasos().complementaria);
    this.pasosService.obtenerPasos().cronograma.valido =
      this.esPasoValido(this.pasosService.obtenerPasos().cronograma);
    this.pasosService.obtenerPasos().presupuestal.valido =
      this.esPasoValido(this.pasosService.obtenerPasos().presupuestal);
    this.pasosService.obtenerPasos().compromisos.valido =
      this.esPasoValido(this.pasosService.obtenerPasos().compromisos);
  }

  esPasoValido(paso: Paso): boolean {
    if (paso.tabs[0]) {
      if (paso.tabs[1]) {
        return paso.tabs[0].valido || paso.tabs[1].valido;
      } else {
        return paso.tabs[0].valido;
      }
    } else {
      return true;
    }
  }

  validarVigenciaProcesoSeleccionConvocatoria() {
    const info = this.proyectoServicioLocal.informacionGeneralProyecto.getValue();
    const identificadorConvocatoria = info?.convocatoria?.identificador ?? 0;
    const identificadorProceso = info?.procesoSeleccion?.identificador ?? 0;
    return this.informacionGeneralProyectoServicio.vigenciaProcesoSeleccionConvocatoria(
      identificadorProceso,
      identificadorConvocatoria);
  }

  guardarPasos(): Promise<any> {
    const pasosVisibles = this.cargarListaPasos()
      .filter(paso => paso.visible);
    return new Promise(resolve =>
      this.ejecutarRecursivo(pasosVisibles, resolve)
    );
  }

  private ejecutarRecursivo(pasosVisibles: Paso[], resolve: (value?: any) => void) {
    if (pasosVisibles.length > 0) {
      const paso = pasosVisibles[0];
      if (paso.servicio) {
        paso.servicio.guardar().subscribe(
          exito => {
            if ((paso.servicio as any).postguardado) {
              (paso.servicio as any).postguardado(exito);
            }
            const nuevosPasosVisibles = pasosVisibles.slice(1);
            this.ejecutarRecursivo(nuevosPasosVisibles, resolve);
          },
          error => {
            if (error.status === 400) {
              const mensajeDeError = error.error[0].mensaje;
              this.listaErrores.push(`En <strong>${paso.titulo}</strong> ${mensajeDeError}.`);
              const nuevosPasosVisibles = pasosVisibles.slice(1);
              paso.valido = true;
              this.marcarPasosConErrores();
              this.ejecutarRecursivo(nuevosPasosVisibles, resolve);
            } else {
              this.listaErrores.push(`En <strong>${paso.titulo}</strong> hay datos errados, por favor verificar para poder envíar el proyecto.`);
            }
          });
      } else {
        const nuevosPasosVisibles = pasosVisibles.slice(1);
        this.ejecutarRecursivo(nuevosPasosVisibles, resolve);
      }
    } else {
      resolve();
    }
  }

  private cargarListaPasos(): Paso[] {
    let listaPasos: Paso[] = [];
    listaPasos = listaPasos.concat(this.pasosService.obtenerPasos().complementaria.tabs);
    listaPasos = listaPasos.concat(this.pasosService.obtenerPasos().cronograma.tabs);
    listaPasos = listaPasos.concat(this.pasosService.obtenerPasos().presupuestal.tabs);
    listaPasos.push(this.pasosService.obtenerPasos().componentes);
    listaPasos.push(this.pasosService.obtenerPasos().planTrabajo);
    listaPasos.push(this.pasosService.obtenerPasos().participantes);
    listaPasos.push(this.pasosService.obtenerPasos().evaluadores);
    listaPasos = listaPasos.concat(this.pasosService.obtenerPasos().compromisos.tabs);
    listaPasos.push(this.pasosService.obtenerPasos().documento);

    const actualizacionEditable = this.pasosHabilitadosLocalService.esEditable(SeccionProyecto.Actualizacion);
    if (actualizacionEditable) {
      listaPasos.push(this.pasosService.obtenerPasos().actualizaciones);
    }

    return listaPasos;
  }

}
