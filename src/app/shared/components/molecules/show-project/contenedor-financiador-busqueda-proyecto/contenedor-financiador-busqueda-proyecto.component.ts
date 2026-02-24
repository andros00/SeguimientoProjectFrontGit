import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { ProyectoConstantes } from '../proyecto-constantes';
import { PersonaJuridica } from '../persona-juridica';
import { FiltroPersonaJuridica } from '../modelo/filtro-Persona-juridica';
import { DatoAdicionalAportante } from '../dato-adicional-aportante';
import { FinanciadorConvocatoria } from '../financiador-convocatoria';
import { MensajesFinanciadoNoExiste } from '../mensajes-financiador-no-existe';
import { FinanciadorService } from 'src/app/shared/services/show-project/financiador.service';
import { ConvocatoriaLocalService } from 'src/app/shared/services/show-project/convocatoria-local.service';
import { ModalFinanciadorConfig } from '../modal-financiador-config';
import { FinanciadorConstantes } from '../financiador-constantes';
import { environment } from 'src/environments/environment';
import { ResultadosFinanciador } from '../resultados-financiador';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-contenedor-financiador-busqueda-proyecto',
  templateUrl: './contenedor-financiador-busqueda-proyecto.component.html',
  styleUrls: ['./contenedor-financiador-busqueda-proyecto.component.css'],
})
export class ContenedorFinanciadorBusquedaProyectoComponent implements OnInit {


  @Output() emitirPersonaJuridica = new EventEmitter<any>();
  @Output() emitirLimpiarFormulario = new EventEmitter<any>();
  @Output() emitirCofinanciadorMatriculaProyecto = new EventEmitter<any>();
  ProyectoConstantes = ProyectoConstantes;


  listaPersonaJuridica: PersonaJuridica[] = [];
  mostrarRegistroFinanciador = false;
  mostrarMensajeFinanciadorNoEncontrado = false;
  filtroPersonaJuridica: FiltroPersonaJuridica = {} as FiltroPersonaJuridica;
  cofinanciadorMatriculaProyecto!: DatoAdicionalAportante;
  listaFinanciadoresConvocatoria$!: BehaviorSubject<FinanciadorConvocatoria[]>;
  nitNoEncontrado!: string;
  esNacional: boolean = false;
  permiteCrear = true;
  mensajeSugerencia = MensajesFinanciadoNoExiste.SUGERENCIA;
  mensajePasos = MensajesFinanciadoNoExiste.PASOS;


  constructor(
    private financiadorServicio: FinanciadorService,
    private convocatoriaLocalService: ConvocatoriaLocalService,
    public dialogo: MatDialog,
    private modalBuscarFinanciador: MatDialogRef<ContenedorFinanciadorBusquedaProyectoComponent>,
    @Inject(MAT_DIALOG_DATA) public institucionPara: string,
    @Inject(MAT_DIALOG_DATA) config: ModalFinanciadorConfig,
    @Inject(MAT_DIALOG_DATA) public infoCofinanciador: boolean) {
    modalBuscarFinanciador.disableClose = true;
    this.configuracionModal(config);
    this.agregarCorreoSugerencia();
  }

  ngOnInit() {
    this.listaFinanciadoresConvocatoria$ = this.convocatoriaLocalService.listaFinanciadoresSeleccionados;
  }


  agregarCorreoSugerencia() {
    this.mensajeSugerencia = this.mensajeSugerencia.replace(FinanciadorConstantes.CORREO_A_CAMBIAR, environment.EMAIL_CONTACTO);
  }


  private configuracionModal(config: ModalFinanciadorConfig) {
    if (!!config) {
      this.permiteCrear = config.permiteCrear;
    }
  }

  regresarAProyecto() {
    this.listaFinanciadoresConvocatoria$ = new BehaviorSubject<FinanciadorConvocatoria[]>([]);
    this.modalBuscarFinanciador.close();
  }

  guardarFinanciadoresConvocatoria() {
    this.convocatoriaLocalService.guardarFinanciadoresConvocatoria(this.listaPersonaJuridica);
  }

  activarAgregarInfoAdicionalCofinanciador() {
    if (this.infoCofinanciador === true) {
      this.permiteCrear = true;
      return true;
    }
    return false;
  }

  obtenerPersonaJuridica() {
    this.financiadorServicio.obtenerPersonasJuridicas(this.filtroPersonaJuridica).subscribe(respuestaPersonaJuridica => {
      this.listaPersonaJuridica = respuestaPersonaJuridica;
      const institucionPara = 'Evaluador';

      if (this.listaPersonaJuridica.length >= 1) {
        this.mostrarRegistroFinanciador = false;
        this.mostrarMensajeFinanciadorNoEncontrado = false;
      } else if (!this.filtroPersonaJuridica.nit) {
        this.mostrarMensajeFinanciadorNoEncontrado = true;
        this.mostrarRegistroFinanciador = false;
      } else if (this.institucionPara === institucionPara || this.permiteCrear) {
        this.mostrarMensajeFinanciadorNoEncontrado = false;
        this.mostrarRegistroFinanciador = true;
        this.nitNoEncontrado = this.filtroPersonaJuridica.nit;
        this.esNacional = this.filtroPersonaJuridica.limiteGeograficoNacional;
      }
    });
    this.emitirPersonaJuridica.emit(this.listaPersonaJuridica);
  }

  recibirFiltro($event: any) {
    this.filtroPersonaJuridica = $event;
    this.obtenerPersonaJuridica();
  }

  recibirFiltroCofinanciadorMatriculaProyecto($event: DatoAdicionalAportante): void {
    this.cofinanciadorMatriculaProyecto = $event;
  }

  cambioFormulario() {
    this.listaPersonaJuridica = [];
    this.emitirPersonaJuridica.emit(this.listaPersonaJuridica);
    this.mostrarRegistroFinanciador = false;
  }

  cambioFormularioCofinanciadorMatriculaProyecto() {
    this.emitirCofinanciadorMatriculaProyecto.emit(this.cofinanciadorMatriculaProyecto);
  }

  enviarDatosAResultadosFinanciador(): ResultadosFinanciador {
    if (this.activarAgregarInfoAdicionalCofinanciador() && this.cofinanciadorMatriculaProyecto === undefined) {
      this.cofinanciadorMatriculaProyecto = {
        sectorAportante: {
          identificador: 0,
          nombre: '',
          descripcion: '',
          estado: ''
        },
        tipoFinanciacion: {
          identificador: 0,
          nombre: '',
          descripcion: '',
          estado: ''
        },
      }
    }
    return {
      listaPersonaJuridica: this.listaPersonaJuridica,
      cofinanciadorMatriculaProyecto: this.cofinanciadorMatriculaProyecto
    }
  }

  abrirModalRegistrarFinanciador() {
    //   const dialogoRef = this.dialogo.open(AgregarFinanciadorComponent, {
    //     data: { nitParaRegistrar: this.nitNoEncontrado, esNacional: this.esNacional }
    //   });
    //   this.mostrarRegistroFinanciador = false;
    //   dialogoRef.afterClosed().subscribe(resultado => {
    //     this.obtenerPersonaJuridica();
    //     this.emitirLimpiarFormulario.emit();
    //   });
  }
}
