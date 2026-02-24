import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { DatosModalInformativo } from '../modal-dinamico-informativo/datos-modal-informativo';
import { ModalDinamicoInformativoComponent } from '../modal-dinamico-informativo/modal-dinamico-informativo.component';
import { ContenedorFinanciadorBusquedaProyectoComponent } from './../contenedor-financiador-busqueda-proyecto/contenedor-financiador-busqueda-proyecto.component';
import { ProyectoConstantes } from '../proyecto-constantes';
import { PersonaJuridica } from '../persona-juridica';
import { ResultadosFinanciador } from '../resultados-financiador';
import { DependenciaFinanciadora } from '../dependencia-financiadora';
import { FinanciadorConvocatoria } from '../financiador-convocatoria';
import { UdeaConstantes } from '../udea-constantes';
import { ConvocatoriaLocalService } from 'src/app/shared/services/show-project/convocatoria-local.service';
import { AportanteProyectoLocalService } from 'src/app/shared/services/show-project/aportante-proyecto-local.service';
import { ConvocatoriaService } from 'src/app/shared/services/show-project/convocatoria.service';
import { ProyectoLocalService } from 'src/app/shared/services/show-project/proyecto-local.service';
import { ParticipanteProyectoLocalService } from 'src/app/shared/services/show-project/participante-proyecto-local.service';
import { ModalFinanciadorConfig } from '../modal-financiador-config';
import { AportanteProyecto } from '../aportante-proyecto';
import { ProcesoSeleccionMensajes } from '../proceso-seleccion-mensajes';
import { ClaseAlerta } from '../clase-alerta';

@Component({
  selector: 'app-resultado-financiador-proyecto',
  templateUrl: './resultado-financiador-proyecto.component.html',
  styleUrls: ['./resultado-financiador-proyecto.component.css']
})
export class ResultadoFinanciadorProyectoComponent implements OnInit, OnChanges {

  resultadoCantidadFinanciadores = 0;
  registrosPorPagina = 6;
  ProyectoConstantes = ProyectoConstantes;

  listaPersonaJuridicaPaginada: PersonaJuridica[] = new Array<PersonaJuridica>();

  numeroResgitrosMaximo = 6;

  @Input() listaPersonaJuridica: PersonaJuridica[] = new Array<PersonaJuridica>();
  @Input() resultadosFinanciador!: ResultadosFinanciador;
  @Output() emitirLimpiarFormulario = new EventEmitter<any>();
  @Output() emitirCierreModal = new EventEmitter<any>();
  @Input() institucionPara: string = '';


  totalRegistros: any = 0;
  pagina: any = 0;
  cantidadPaginas = 0;
  numeroRegistrosMinimo = 0;
  listadoDependenciaFinanciadora: DependenciaFinanciadora[] = [];
  personaJuridicaSeleccionada!: PersonaJuridica;
  nitUdeA: string = UdeaConstantes.NIT_UDEA;
  enviado = false;
  listaFinanciadoresConvocatoria$!: BehaviorSubject<FinanciadorConvocatoria[]>;
  formularioAgregarFinanciadorConvocatoria: FormGroup = new FormGroup({});
  noEsInstitucion = true;
  cofinanciadorParaPresupuesto!: string;
  habilitarMensajeError: boolean = false;

  constructor(public dialogo: MatDialog,
    private convocatoriaServicioLocal: ConvocatoriaLocalService,
    private aportanteServicioLocal: AportanteProyectoLocalService,
    private formBuilder: FormBuilder,
    private convocatoriaServicio: ConvocatoriaService,
    private proyectoLocalServicio: ProyectoLocalService,
    private modalBuscarFinanciador: MatDialogRef<ContenedorFinanciadorBusquedaProyectoComponent>,
    private participanteProyectoLocalService: ParticipanteProyectoLocalService,
    @Inject(MAT_DIALOG_DATA) config: ModalFinanciadorConfig
  ) {
    this.configuracionModal(config);
  }

  ngOnInit() {
    this.listaFinanciadoresConvocatoria$ = this.convocatoriaServicioLocal.listaFinanciadoresSeleccionados;
    this.formularioAgregarFinanciadorConvocatoria = this.formBuilder.group({
      dependencia: ['']
    });
  }

  private configuracionModal(config: ModalFinanciadorConfig) {
    if (!!config) {
      this.cofinanciadorParaPresupuesto = config.institucionPara;
    }
  }
  get f() { return this.formularioAgregarFinanciadorConvocatoria.controls as {
      dependencia: any
  }; }

  ngOnChanges() {
    if (this.resultadosFinanciador.listaPersonaJuridica != null) {
      this.ordenarlistaPersonaJuridica();
      this.paginarListaFinanciadores();
      this.cargarPagina(this.pagina);
      this.cantidadFinanciadores();
    }
  }

  cantidadFinanciadores() {
    if (this.resultadosFinanciador.listaPersonaJuridica.length !== 0) {
      this.resultadoCantidadFinanciadores = this.resultadosFinanciador.listaPersonaJuridica.length;
    } else {
      this.resultadoCantidadFinanciadores = 0;
    }
  }

  consultarDependenciaFinanciadora() {
    this.convocatoriaServicio.obtenerDependenciasFinanciadoras().subscribe(respuestaDependenciaFinanciadora => {
      this.listadoDependenciaFinanciadora = respuestaDependenciaFinanciadora;
    });
  }

  agregarFinanciador(personaJuridica: PersonaJuridica): void {
    if (this.resultadosFinanciador.cofinanciadorMatriculaProyecto != undefined) {
      if (this.resultadosFinanciador.cofinanciadorMatriculaProyecto.tipoFinanciacion === null ||
        this.resultadosFinanciador.cofinanciadorMatriculaProyecto.sectorAportante === null) {
        this.habilitarMensajeError = true;
        return;
      }
    }

    const financiador: FinanciadorConvocatoria = new FinanciadorConvocatoria();
    const institucionPara = 'Evaluador';
    const esParaInstitucion = this.institucionPara === institucionPara;

    if (personaJuridica.nit === UdeaConstantes.NIT_UDEA && !esParaInstitucion) {
      this.consultarDependenciaFinanciadora();
      this.f.dependencia.setValidators([Validators.required]);
      this.f.dependencia.updateValueAndValidity();
      this.f.dependencia.reset();
      personaJuridica.transicion = true;
    } else if (esParaInstitucion) {
      personaJuridica.transicion = false;
      this.f.dependencia.setValidators([]);
      this.f.dependencia.updateValueAndValidity();
      this.f.dependencia.reset();
      this.cerrarModal(personaJuridica);
    } else {
      this.f.dependencia.setValidators([]);
      this.f.dependencia.updateValueAndValidity();
      this.f.dependencia.reset();
      financiador.financiador = personaJuridica;
      financiador.selectorFinanciador = 'J';
      const institucionParaEvaluador = 'Crear evaluador';
      if (this.institucionPara === institucionParaEvaluador || this.cofinanciadorParaPresupuesto === 'presupuesto'
        || this.institucionPara === 'Actualizar evaluador') {
        this.cerrarModal(personaJuridica);
      } else if (this.institucionPara === 'participante') {
        const listaInstituciones = this.participanteProyectoLocalService.obtenerListaInstitucion();
        listaInstituciones.push(this.convertirFinanciadorEnAportante(financiador));
        this.participanteProyectoLocalService.agregarListaInstitucion(listaInstituciones);
        this.emitirCierreModal.emit();
      } else {
        const listaAportante = this.aportanteServicioLocal.obtenerListaAportanteTemporal();
        listaAportante.push(this.convertirFinanciadorEnAportante(financiador));
        this.aportanteServicioLocal.agregarListaAportanteTemporal(listaAportante);
        this.emitirCierreModal.emit();
      }
    }
  }

  cerrarModal(personaJuridica: PersonaJuridica) {
    this.modalBuscarFinanciador.close(personaJuridica);
  }

  agregarFinanciadorUdea(personaJuridica: PersonaJuridica) {
    if (this.formularioAgregarFinanciadorConvocatoria.valid) {
      const financiador: FinanciadorConvocatoria = new FinanciadorConvocatoria();
      financiador.financiador = personaJuridica;
      financiador.dependenciaFinanciadora = this.f.dependencia.value;
      financiador.selectorFinanciador = 'J';
      const institucionPara = 'Crear evaluador';
      if (this.institucionPara === institucionPara) {
        this.cerrarModal(personaJuridica);
      } else {
        const listaAportante: AportanteProyecto[] = this.aportanteServicioLocal.obtenerListaAportanteTemporal();
        listaAportante.push(this.convertirFinanciadorEnAportante(financiador));
        this.aportanteServicioLocal.agregarListaAportanteTemporal(listaAportante);
        this.emitirCierreModal.emit();
      }
    }
  }

  convertirFinanciadorEnAportante(financiador: FinanciadorConvocatoria) {

    const codigoProyecto = this.proyectoLocalServicio.obtenerInformacionGeneralProyecto().codigo;
    const aportanteProyecto: AportanteProyecto = {
      identificador: 0,
      proyecto: codigoProyecto,
      tipo: 'cofinanciador',
      dependencia: financiador.dependenciaFinanciadora,
      personaJuridica: {
        nit: financiador.financiador!.nit,
        nombreCorto: financiador.financiador!.nombreCorto
      },
      selectorJuridica: 'J',
      totalEspecie: 0,
      totalEspecieSolicitado: 0,
      totalFresco: 0,
      totalFrescoSolicitado: 0,
      aportanteGuardado: false,
      tipoFinanciacion: this.resultadosFinanciador.cofinanciadorMatriculaProyecto ? this.resultadosFinanciador.cofinanciadorMatriculaProyecto.tipoFinanciacion : undefined,
      sectorAportante: this.resultadosFinanciador.cofinanciadorMatriculaProyecto ? this.resultadosFinanciador.cofinanciadorMatriculaProyecto.sectorAportante : undefined,
    };
    return aportanteProyecto;
  }

  public abrirAlertaFinanciador(mensaje: string): void {
    const datosModal: DatosModalInformativo = {
      titulo: ProcesoSeleccionMensajes.TITULO_ALERTA,
      mensaje: mensaje,
      clase: ClaseAlerta.ALERTA_ADVERTENCIA
    };
    const modalEliminarRespuesta = this.dialogo.open(ModalDinamicoInformativoComponent, {
      data: datosModal
    });
    modalEliminarRespuesta.afterClosed().subscribe();
  }

  cargarPagina(pagina: number) {
    const copiaListaPersonaJuridica: PersonaJuridica[] = this.resultadosFinanciador.listaPersonaJuridica;
    const numeroResgitrosMaximo = this.numeroResgitrosMaximo * (pagina + 1);
    const numeroRegistrosMinimo = numeroResgitrosMaximo - this.registrosPorPagina;
    this.listaPersonaJuridicaPaginada = copiaListaPersonaJuridica.slice(numeroRegistrosMinimo, numeroResgitrosMaximo);
  }

  seleccionarPersonaJuridica(personaJuridica: PersonaJuridica) {
    personaJuridica.transicion = true;
  }

  paginarListaFinanciadores() {
    this.totalRegistros = this.resultadosFinanciador.listaPersonaJuridica.length;
    this.cantidadPaginas = this.totalRegistros / this.registrosPorPagina;
  }

  ordenarlistaPersonaJuridica() {
    this.listaPersonaJuridicaPaginada = this.resultadosFinanciador.listaPersonaJuridica;
    this.listaPersonaJuridicaPaginada.sort((nit1, nit2) => {
      if (nit1.nit > nit2.nit) {
        return 1;
      }
      if (nit1.nit < nit2.nit) {
        return -1;
      }
      return 0;
    });
  }
}
