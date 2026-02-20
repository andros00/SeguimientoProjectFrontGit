import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { FinanciadorConvocatoria } from 'src/app/convocatoria/modelo/financiador-convocatoria';
import { ConvocatoriaLocalService } from 'src/app/convocatoria/servicio-local/convocatoria-local.service';
import { FiltroPersonaJuridica } from '../../modelo/filtro-Persona-juridica';
import { PersonaJuridica } from '../../modelo/persona-juridica';
import { FinanciadorService } from '../../servicios/financiador.service';
import { AgregarFinanciadorComponent } from '../agregar-financiador/agregar-financiador.component';
import { ModalFinanciadorConfig } from '../contenedor-financiador-busqueda/modal-financiador-config';
import { DatoAdicionalAportante } from 'src/app/proyecto/modelo/dato-adicional-aportante';
import { ResultadosFinanciador } from 'src/app/proyecto/modelo/resultados-financiador';
import { ProyectoConstantes } from 'src/app/proyecto/proyecto-constantes';
import { MensajesFinanciadoNoExiste } from '@shared/constantes/mensajes-financiador-no-existe';
import { environment } from '@environments/environment';
import { FinanciadorConstantes } from '@app/shared/financiador-constantes';

@Component({
  selector: 'app-contenedor-financiador-busqueda-proyecto',
  templateUrl: './contenedor-financiador-busqueda-proyecto.component.html',
  styleUrls: ['./contenedor-financiador-busqueda-proyecto.component.css']
})
export class ContenedorFinanciadorBusquedaProyectoComponent implements OnInit {


  @Output() emitirPersonaJuridica = new EventEmitter<any>();
  @Output() emitirLimpiarFormulario = new EventEmitter<any>();
  @Output() emitirCofinanciadorMatriculaProyecto = new EventEmitter<any>();
  ProyectoConstantes = ProyectoConstantes;


  listaPersonaJuridica: PersonaJuridica[];
  mostrarRegistroFinanciador = false;
  mostrarMensajeFinanciadorNoEncontrado = false;
  filtroPersonaJuridica: FiltroPersonaJuridica = {} as FiltroPersonaJuridica;
  cofinanciadorMatriculaProyecto: DatoAdicionalAportante;
  listaFinanciadoresConvocatoria$: BehaviorSubject<FinanciadorConvocatoria[]>;
  nitNoEncontrado: string;
  esNacional: boolean;
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
    this.listaFinanciadoresConvocatoria$ = new BehaviorSubject(([]));
    this.modalBuscarFinanciador.close();
  }

  guardarFinanciadoresConvocatoria() {
    this.convocatoriaLocalService.guardarFinanciadoresConvocatoria(this.listaPersonaJuridica);
  }

  activarAgregarInfoAdicionalCofinanciador(){
    if(this.infoCofinanciador === true){
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

  cambioFormularioCofinanciadorMatriculaProyecto(){
    this.emitirCofinanciadorMatriculaProyecto.emit(this.cofinanciadorMatriculaProyecto);
  }

  enviarDatosAResultadosFinanciador(): ResultadosFinanciador {
    if (this.activarAgregarInfoAdicionalCofinanciador() && this.cofinanciadorMatriculaProyecto === undefined) {
      this.cofinanciadorMatriculaProyecto = {
        sectorAportante: null,
        tipoFinanciacion: null,
      }
    }
    return {
      listaPersonaJuridica: this.listaPersonaJuridica,
      cofinanciadorMatriculaProyecto: this.cofinanciadorMatriculaProyecto
    }
  }

  abrirModalRegistrarFinanciador() {
    const dialogoRef = this.dialogo.open(AgregarFinanciadorComponent, {
      data: { nitParaRegistrar: this.nitNoEncontrado, esNacional: this.esNacional }
    });
    this.mostrarRegistroFinanciador = false;
    dialogoRef.afterClosed().subscribe(resultado => {
      this.obtenerPersonaJuridica();
      this.emitirLimpiarFormulario.emit();
    });
  }
}
