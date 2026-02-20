import { DatePipe } from '@angular/common';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { EstructuraProyecto } from '../estructura-proyecto';
import { ClaseSubproyecto } from '../clase-subproyecto';
import { GrupoInvestigacion } from '../grupo-investigacion';
import { InstanciaAdministrativa } from '../instancia-administrativa';
import { NivelAdministrativo } from '../nivel-administrativo';
import { NivelProyecto } from '../nivel-proyecto';
import { PersonaNatural } from '../persona-natural';
import { SubtipoProyecto } from '../subtipo-proyecto';
import { TipoProyecto } from '../tipo-proyecto';
import { SubnivelProyecto } from '../subnivel-proyecto';
import { ClaseProyectoId } from '../clase-proyecto-id';
import { NivelProyectoId } from '../nivel-proyecto-id';
import { TipoMatricula } from '../tipo-matricula';
import { ComponenteProyecto } from '../componente-proyecto';
import { DatosSubproyecto } from '../datos-subproyecto';
import { InformacionGeneralProyecto } from '../informacion-general-proyecto';
import { Proyecto } from '../proyecto';
import { Seccional } from '../seccional';
import { TextoDescriptivo } from '../texto-descriptivo';
import { ProyectoConstantes } from '../proyecto-constantes';
import { ConvocatoriaConstantes } from '../convocatoria-constantes';
import { InformacionGeneral } from '../informacion-general';
import { SeccionProyecto } from '../seccion-proyecto';
import { ActualizacionProyecto } from '../actualizacion-proyecto';
import { ComponenteMacroproyecto } from '../componente-macroproyecto';
import { environment } from 'src/environments/environment';
import { InformacionGeneralConvocatoria } from '../informacion-general-convocatoria';
import { ModalidadConvocatoria } from '../modalidad-convocatoria';
import { CentroAdministrativoService } from 'src/app/shared/services/show-project/centro-administrativo.service';
import { InformacionGeneralCompartidoService } from 'src/app/shared/services/show-project/informacion-general-compartido.service';
import { PersonaNaturalService } from 'src/app/shared/services/show-project/persona-natural.service';
import { PasosProyectoService } from 'src/app/shared/services/show-project/pasos-proyecto.service';
import { DescripcionProyectoLocalService } from 'src/app/shared/services/show-project/descripcion-proyecto-local.service';
import { EstructuraDeProyectoLocalService } from 'src/app/shared/services/show-project/estructura-de-proyecto-local.service';
import { PasosHabilitadosLocalService } from 'src/app/shared/services/show-project/pasos-habilitados-local.service';
import { ProyectoLocalService } from 'src/app/shared/services/show-project/proyecto-local.service';
import { InformacionGeneralProyectoService } from 'src/app/shared/services/show-project/informacion-general-proyecto.service';
import { ActualizacionProyectoLocalService } from 'src/app/shared/services/show-project/actualizacion-proyecto-local.service';
import { CompromisosProyectoLocalService } from 'src/app/shared/services/show-project/compromisos-proyecto-local.service';
import { CondicionFormalProyectoLocalService } from 'src/app/shared/services/show-project/condicion-formal-proyecto-local.service';
import { PlanTrabajoProyectoLocalService } from 'src/app/shared/services/show-project/plan-trabajo-proyecto-local.service';
import { AportanteProyectoLocalService } from 'src/app/shared/services/show-project/aportante-proyecto-local.service';

@Component({
  selector: 'app-paso-informacion-general-proyecto',
  templateUrl: './paso-informacion-general-proyecto.component.html',
  styleUrls: ['./paso-informacion-general-proyecto.component.css'],
  providers: [
    DatePipe]
})
export class PasoInformacionGeneralProyectoComponent implements OnInit {

  @ViewChild('trigger', { static: false }) trigger!: MatMenuTrigger;

  private readonly codigoConvocatoria = 1;
  private readonly codigoProcesoSeleccion = 2;

  @Output() pasoSiguiente = new EventEmitter<any>();

  formularioInformacionGeneralProyecto: FormGroup | undefined;
  informacionGuardada = false;
  formularioInformacionGeneral: FormGroup | undefined;
  listadoTipoProyectos: TipoProyecto[] = [];
  listadoNivelProyecto: NivelProyecto[] = [];
  listadoclaseSubproyectos: ClaseSubproyecto[] = [];
  listadoSubnivelProyecto: SubnivelProyecto[] = [];
  listadoSubtipoProyecto: SubtipoProyecto[] = [];
  listaMacroproyectos: InformacionGeneralProyecto[] = [];
  centrosAdministrativos: NivelAdministrativo[] = [];
  listadoComiteBioetica: InstanciaAdministrativa[] = [];
  listaComponentes: ComponenteMacroproyecto[] = [];
  listaProcesosSeleccion: InformacionGeneral[] = [];
  listaConvocatorias: InformacionGeneralConvocatoria[] = [];
  listaModalidadesConvocatoria: ModalidadConvocatoria[] = [];
  listaGrupoInvestigacion: GrupoInvestigacion[] = [];
  listaProyectoAsociado: InformacionGeneralProyecto[] = [];
  personaNatural: PersonaNatural={
    identificacion: '',
    nombrePila: '',
    apellido1: '',
    apellido2: '',
    correoElectronico: '',
    direccion: '',
    telefono: '',
    fax: '',
    tipoIdentificacion: '',
    fechaNacimiento: '',
    sexo: '',
    continente: 0,
    pais: 0,
    departamento: 0,
    municipio: 0
  };
  responsable: string ='';
  procesoDeLaConvocatoria: number=0;

  opcionesFiltradasConvocatoria: Observable<InformacionGeneralConvocatoria[]>;
  opcionesFiltradasProcesosSeleccion: Observable<InformacionGeneral[]>;
  opcionesFiltradasProyecto: Observable<InformacionGeneralProyecto[]>;

  esMacroproyecto = false;
  esClaseproyecto = false;
  esTipoSubproyecto = false;
  esMacroproyectoPertenece = false;
  esProyectoAsociado = false;
  esComponente = false;
  listaSeccionales: Seccional[] = [];
  esConConvocatoria = false;
  activarModalidades = false;
  matriculaProyecto = false;
  errorDuracionMacroproyecto = false;
  nivelProyecto = 0;
  tipoProyecto = 0;
  tipoSubproyecto = 0;
  claseSubproyecto = 0;
  convocatoriaSeleccionada: InformacionGeneralConvocatoria;
  grupo = 0;
  soloLectura: boolean;
  paraActualizacion: boolean;
  modoEdicion: boolean;
  paraConsulta: boolean;
  proyectoAEditar: InformacionGeneralProyecto;
  actualizacionVigente: ActualizacionProyecto;
  seccionesHabilitadas: string[] = [];
  fechaLimiteActualizacion = '';
  fechaAutorizacion = '';
  edicionConvocatoria = false;
  mensajeProceSeleccion: string = '';
  existeFinanciador: boolean = true;
  lugarEjecucion: string = '';
  municipio: string = '';
  tituloLugarEjecucion: string = ProyectoConstantes.TITULO_LUGAR_EJECUCION;
  esProyectoPosgrados = false;

  constructor(
    private formBuilder: FormBuilder,
    private informacionGeneralProyectoServicio: InformacionGeneralProyectoService,
    private informacionGeneralCompartidoServicio: InformacionGeneralCompartidoService,
    private centroAdministrativoService: CentroAdministrativoService,
    private pasosService: PasosProyectoService,
    private proyectoLocalServicio: ProyectoLocalService,
    private personaNaturalServicio: PersonaNaturalService,
    private estructuraDeProyectoServicioLocal: EstructuraDeProyectoLocalService,
    private compromisosProyectoServicioLocal: CompromisosProyectoLocalService,
    private textoDescriptivoServicioLocal: DescripcionProyectoLocalService,
    private planTrabajoServicioLocal: PlanTrabajoProyectoLocalService,
    private condicionFormalServicioLocal: CondicionFormalProyectoLocalService,
    private pasosHabilitadosLocalService: PasosHabilitadosLocalService,
    private actualizacionProyectoLocalService: ActualizacionProyectoLocalService,
    private aportanteProyectoLocalService: AportanteProyectoLocalService,
    private activeRoute: ActivatedRoute, private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.modoEdicion = this.activeRoute.snapshot.queryParams['estado'] === 'Editar';
    this.soloLectura = this.activeRoute.snapshot.queryParams['soloLectura'] === 'true';
    this.paraActualizacion = this.activeRoute.snapshot.queryParams['paraActualizacion'] === 'true';

    this.paraConsulta = this.modoEdicion || this.soloLectura || this.paraActualizacion;

    this.inicializarFormulario();
    this.inicializarEdicion();

    this.consultarNivelproyecto();
    this.consultarTipoProyecto();
    this.consultarTipoSubproyecto();
    this.consultarSubnivelProyecto();
    this.consultarProyectosTipoMacroproyecto();
    this.consultarComiteDeBioetica();
    this.consultarInformacionPersonaNaturalEnSession();
    this.consultarListaSeccionalUdea();
    this.validarExistenciaFinanciador();

    if (this.proyectoAEditar && this.proyectoAEditar.convocatoria) {
      this.edicionConvocatoria = true;
      this.cargarConvocatorias();
    }

    if (this.soloLectura) {
      if (!this.pasosHabilitadosLocalService.esEditable(SeccionProyecto.DatoBasico)) {
        this.formularioInformacionGeneralProyecto.disable();
      }
    }
  }

  private inicializarEdicion() {
    if (this.modoEdicion) {
      this.proyectoAEditar = this.proyectoLocalServicio.obtenerInformacionGeneralProyecto();
      this.esConConvocatoria = this.proyectoAEditar.convocatoria !== null;
      this.cargarDatosProyectoParaEdicion();
      this.identificarCambiosEnFormulario();
      this.informacionGuardada = true;
      this.camposNoEditables();
      this.habilitarPasos();
    }
  }

  private habilitarPasos() {
    if (this.modoEdicion && this.soloLectura && !this.paraActualizacion) {
      this.pasosHabilitadosLocalService.deshabilitarTodos();
    } else if (this.paraActualizacion) {
      this.actualizacionProyectoLocalService.actualizacionVigenteObservable.subscribe(
        actualizacion => {
          this.actualizacionVigente = actualizacion;
          this.seccionesHabilitadas = this.actualizacionVigente.seccionesHabilitadas;
          this.fechaLimiteActualizacion = this.datePipe.transform(this.actualizacionVigente.fechaLimite, 'dd-MM-yyyy');
          this.fechaAutorizacion = this.datePipe.transform(this.actualizacionVigente.fechaAutorizacion, 'dd-MM-yyyy');
        }
      );
      this.pasosHabilitadosLocalService.habilitarSeccionesActulizacion(this.actualizacionVigente.seccionesHabilitadas);
    } else {
      this.pasosHabilitadosLocalService.habilitarTodos();
    }
  }

  inicializarFormulario() {
    this.formularioInformacionGeneralProyecto = this.formBuilder.group({
      nivelProyecto: ['', [Validators.required]],
      tipoMacroproyecto: [''],
      tipoProyecto: [''],
      claseProyecto: [''],
      tipoSubproyecto: [''],
      subTipoProyecto: [''],
      macroproyecto: [''],
      tipoMatriculaProyecto: ['', [Validators.required]],
      convocatoria: [''],
      procesoSeleccion: [''],
      modalidad: [''],
      centroAdministrativo: ['', [Validators.required]],
      requiereComiteBioetica: [false],
      comiteBioetica: [{ value: '', disabled: true }],
      grupo: [''],
      proyectoNoRegistradoSiiu: [false],
      proyectoVinculaJi: [{ value: '', disabled: false }],
      tituloProyecto: [{ value: '', disabled: true }],
      justificacion: [{ value: '', disabled: true }],
      componente: [''],
      nombreCorto: ['', [Validators.required, Validators.maxLength(ProyectoConstantes.TAMANO_MAXIMO_NOMBRE_CORTO)]],
      nombreCompleto: ['', [Validators.required, Validators.maxLength(ProyectoConstantes.TAMANO_MAXIMO_NOMBRE_COMPLETO)]],
      palabrasClave: ['', [Validators.required, Validators.maxLength(ProyectoConstantes.TAMANO_MAXIMO_PALABRA_CLAVE)]],
      seccional: ['', Validators.required],
      lugarEjecucion: ['', [Validators.maxLength(ProyectoConstantes.TAMANO_MAXIMO_LUGAR_EJECUCION)]],
      duracion: ['', [Validators.required, Validators.min(ProyectoConstantes.MINIMO_DURACION)]]
    });

    this.formularioInformacionGeneralProyecto.get('nivelProyecto').valueChanges.subscribe(
      valor => this.evaluarRequeridosNivelProyecto(valor));

    this.formularioInformacionGeneralProyecto.get('proyectoNoRegistradoSiiu').valueChanges.subscribe(
      valor => this.evaluarRequeridosProyectoRegistradoEnSiiu(valor));

    this.formularioInformacionGeneralProyecto.get('claseProyecto').valueChanges.subscribe(
      valor => this.evaluarRequeridosProyectoAsociado(valor));

    this.formularioInformacionGeneralProyecto.get('requiereComiteBioetica').valueChanges.subscribe(
      valor => this.evaluarRequeridosComiteBioetica(valor));
  }

  get f(): any { return this.formularioInformacionGeneralProyecto!.controls; }

  identificarCambiosEnFormulario() {
    this.informacionGuardada = true;
    this.formularioInformacionGeneralProyecto.valueChanges.subscribe(valores => {
      this.informacionGuardada = false;
    });
  }

  consultarNivelproyecto() {
    this.informacionGeneralCompartidoServicio.obtenerListaNivelProyecto().subscribe(listaNivelProyecto => {
      this.listadoNivelProyecto = listaNivelProyecto;
      if (this.modoEdicion) {
        this.f.nivelProyecto.setValue(this.proyectoAEditar.nivelProyecto);
        this.cambioNivelProyecto();
        const tipoMatricula = this.proyectoAEditar.claseProyecto === 1 ? 'convocatoria' : 'procesoSeleccion';
        this.validarCambioTipoMatriculaProyecto();
        this.f.tipoMatriculaProyecto.setValue(tipoMatricula);
        this.identificarCambiosEnFormulario();
      }
    });
  }

  consultarTipoProyecto() {
    this.informacionGeneralProyectoServicio.obtenerTiposProyectoConPermiso(this.paraConsulta).subscribe(listaTipoProyecto => {
      this.listadoTipoProyectos = listaTipoProyecto;
      if (this.modoEdicion) {
        this.f.tipoProyecto.setValue(this.proyectoAEditar.procesoSeleccion.tipoProyecto.identificador);
        this.f.tipoMacroproyecto.setValue(this.proyectoAEditar.tipoProyectoMacro);
        this.cambioTipoProyecto();
        this.cambioTipoMacroproyecto();
        this.identificarCambiosEnFormulario();
      }
    });
  }

  consultarTipoSubproyecto() {
    this.informacionGeneralCompartidoServicio.obtenerListaClaseSubproyecto().subscribe(listadoclaseSubproyectos => {
      this.listadoclaseSubproyectos = listadoclaseSubproyectos;
      if (this.modoEdicion) {
        this.f.tipoSubproyecto.setValue(this.proyectoLocalServicio.obtenerDatosSubproyecto().claseSubproyecto);
        this.cambioTipoSubproyecto();
        this.identificarCambiosEnFormulario();
      }
    });
  }

  consultarSubnivelProyecto() {
    this.informacionGeneralCompartidoServicio.obtenerListaSubnivelProyecto().subscribe(listadoSubnivelProyecto => {
      this.listadoSubnivelProyecto = listadoSubnivelProyecto;
      if (this.modoEdicion) {
        this.f.claseProyecto.setValue(this.proyectoAEditar.subnivelProyecto);
        this.cambioClaseProyecto();
        this.identificarCambiosEnFormulario();
      }
    });
  }

  consultarClasificacionPorIdTipoProyecto(idTipoProyecto: number) {
    this.informacionGeneralCompartidoServicio.consultarListaSubtipoProyectoPorTipoProyecto(idTipoProyecto)
      .subscribe(listadoSubtipoProyecto => {
        this.listadoSubtipoProyecto = listadoSubtipoProyecto;
        this.f.subTipoProyecto.reset();
        if (this.modoEdicion) {
          this.f.subTipoProyecto.setValue(listadoSubtipoProyecto.find(
            subtipo => subtipo.identificador === this.proyectoAEditar.subtipoProyecto));
          this.identificarCambiosEnFormulario();
        }
      });
  }

  consultarProyectosTipoMacroproyecto() {
    this.informacionGeneralProyectoServicio.consultarProyectosTipoMacroproyecto().subscribe(listaMacroproyectos => {
      this.listaMacroproyectos = listaMacroproyectos;
      if (this.modoEdicion && this.proyectoLocalServicio.obtenerComponenteProyecto().codigoMacroproyecto) {
        const informacionGeneralMacroproyecto = listaMacroproyectos.find(
          macroproyecto => macroproyecto.codigo === this.proyectoLocalServicio.obtenerComponenteProyecto().codigoMacroproyecto);
        this.f.macroproyecto.setValue(informacionGeneralMacroproyecto);
        this.cambioMacroproyecto();
        this.identificarCambiosEnFormulario();
      }
    });
  }

  consultarComponentePorMacroproyecto(idMacroproyecto: string) {
    this.informacionGeneralProyectoServicio.consultarComponentePorMacroproyecto(idMacroproyecto).subscribe(listaComponentes => {
      this.listaComponentes = listaComponentes;
      if (this.modoEdicion) {
        this.f.componente.setValue(this.proyectoLocalServicio.obtenerComponenteProyecto().componente);
        this.identificarCambiosEnFormulario();
      }
    });
  }

  consultarGrupoInvestigacion() {
    this.informacionGeneralCompartidoServicio.obtenerListaGrupoInvestigacion().subscribe(listaGruposInvestigacion => {
      this.listaGrupoInvestigacion = listaGruposInvestigacion;
      if (this.modoEdicion) {
        const grupoSeleccionado = listaGruposInvestigacion.find(
          grupo => grupo.identificador === this.proyectoLocalServicio.obtenerDatosSubproyecto().grupo);
        this.f.grupo.setValue(grupoSeleccionado);

        if (this.proyectoLocalServicio.obtenerDatosSubproyecto().tituloSubproyecto) {
          this.f.proyectoVinculaJi.disable();
          this.f.proyectoVinculaJi.setValue('');
          if (!this.soloLectura) {
            this.f.tituloProyecto.enable();
            this.f.justificacion.enable();
          }
          this.f.proyectoNoRegistradoSiiu.setValue(true);
          this.f.tituloProyecto.setValue(this.proyectoLocalServicio.obtenerDatosSubproyecto().tituloSubproyecto);
          this.f.justificacion.setValue(this.proyectoLocalServicio.obtenerDatosSubproyecto().justificacion);
          this.f.proyectoVinculaJi.clearValidators();
        }
        this.cambioGrupo();
        this.identificarCambiosEnFormulario();
      }
    });
  }

  consultarInformacionPersonaNaturalEnSession() {

    if (!this.soloLectura) {
      this.personaNaturalServicio.consultarInformacionPersonaNaturalEnSession().subscribe(personaNatural => {
        this.personaNatural = personaNatural;
        this.responsable = `${this.personaNatural.nombrePila} ${this.personaNatural.apellido1} ${this.personaNatural.apellido2}`;
      });
    } else {
      this.personaNaturalServicio.consultarPersonaNaturalPorId(this.proyectoLocalServicio.obtenerInformacionGeneralProyecto().responsable)
        .subscribe(personaNatural => {
          this.personaNatural = personaNatural;
          this.responsable = `${this.personaNatural.nombrePila} ${this.personaNatural.apellido1} ${this.personaNatural.apellido2}`;
        });
    }
  }

  consultarListaSeccionalUdea() {
    this.informacionGeneralCompartidoServicio.obtenerListaSeccionalUdea().subscribe(listaSeccionalResultado => {
      this.listaSeccionales = listaSeccionalResultado;
    });
  }

  centroPorDefectoParaJovenInvestigadorUdea() {
    if (!!this.esTipoSubproyecto && this.esJovenInvestigadorUdeA() &&
      !!this.f.procesoSeleccion.value && !!this.f.tipoProyecto.value) {
      const tipoProyectoSeleccionado = this.f.tipoProyecto.value;
      const procesoSelecc = this.f.procesoSeleccion.value.identificador;
      this.centroAdministrativoService.obtenerListaCentrosAdministrativosJIUdeA
        (tipoProyectoSeleccionado, procesoSelecc)
        .subscribe(listaCentroJIUdeA => {
          this.centrosAdministrativos = listaCentroJIUdeA;
        });
    } else {
      this.consultarCentrosAdministrativos();
    }
  }

  validarSiLimitaDescripciones() {
    const informacionGeneral = this.f.procesoSeleccion.value;
    this.proyectoLocalServicio.agregarInformacionGeneralProcesoSeleccion(informacionGeneral);
  }

  procesoSeleccionSeleccionado() {
    this.f.convocatoria.setValue(null);
    this.f.modalidad.setValue(null);
    this.validarSiLimitaDescripciones();
    this.consultarCentrosAdministrativos();

    const procesoSeleccion = this.f.procesoSeleccion.value.nombre;

    if (procesoSeleccion in ProyectoConstantes.PROYECTO_PROCES0_DE_SELECCION) {
      this.mensajeProceSeleccion = ProyectoConstantes.PROYECTO_PROCES0_DE_SELECCION[procesoSeleccion];
      //this.trigger.openMenu();
    } else {
      console.error(`Valor no válido para procesoSeleccion: ${procesoSeleccion}`);
    }
  }

  procesoConvocatoriaSeleccionado() {
    if (!!this.f.convocatoria.value) {
      this.f.procesoSeleccion.setValue(this.f.convocatoria.value.procesoSeleccion.informacionGeneral);
      this.validarSiLimitaDescripciones();
      this.centroPorDefectoParaJovenInvestigadorUdea();
    }
  }

  private consultarCentrosAdministrativos() {
    this.informacionGeneralProyectoServicio.obtenerCentrosAdministrativosConPermisos(this.paraConsulta).subscribe(l => {
      this.centrosAdministrativos = l;
      if (this.modoEdicion) {
        this.f.centroAdministrativo.setValue(this.proyectoAEditar.centroGestion);
        this.identificarCambiosEnFormulario();
      }
    });
  }

  private consultarComiteDeBioetica() {
    this.centroAdministrativoService.obtenerListaComiteBioetica().subscribe(l => this.listadoComiteBioetica = l);
  }

  private esJovenInvestigadorUdeA(): boolean {
    return !!this.f.tipoSubproyecto.value
      && this.f.tipoSubproyecto.value === ProyectoConstantes.IDENTIFICADOR_CLASE_SUBPROYECTO_J_I_UDEA;
  }

  onRequiereComiteBioetica(event: MatSlideToggleChange) {
    if (event.checked) {
      this.f.comiteBioetica.enable();
    } else {
      this.f.comiteBioetica.reset();
      this.f.comiteBioetica.disable();
    }
  }

  onProyectoNoRegistrado(event: MatSlideToggleChange) {
    if (event.checked) {
      this.f.proyectoVinculaJi.disable();
      this.f.proyectoVinculaJi.setValue('');
      this.f.tituloProyecto.enable();
      this.f.justificacion.enable();
    } else {
      this.f.proyectoVinculaJi.enable();
      this.f.tituloProyecto.disable();
      this.f.tituloProyecto.reset();
      this.f.justificacion.disable();
      this.f.justificacion.reset();
    }
  }

  requiereComiteBioetica() {
    return this.f.requiereComiteBioetica.value;
  }

  emitirSiguientePaso() {
    this.pasoSiguiente.emit();
  }

  tipoMatriculaProyectoConvocatoria() {
    return this.f.tipoMatriculaProyecto.value === TipoMatricula.Convocatoria;
  }

  validarCambioTipoMatriculaProyecto() {
    if (this.tipoMatriculaProyectoConvocatoria()) {
      this.validacionesConvocatoria();
    } else {
      this.validacionesProcesoSeleccion();
    }
  }

  private validacionesProcesoSeleccion() {
    this.f.convocatoria.clearValidators();
    this.f.convocatoria.updateValueAndValidity();
    this.f.modalidad.clearValidators();
    this.f.modalidad.updateValueAndValidity();
    this.f.procesoSeleccion.setValidators([Validators.required, this.validarValorEnOpciones]);
    this.f.procesoSeleccion.setValue('');
    this.cargarProcesosSeleccion();
    this.esConConvocatoria = false;
    this.activarModalidades = false;
    this.validarDuracionProyecto();
  }

  private validacionesConvocatoria() {
    this.f.procesoSeleccion.clearValidators();
    this.f.procesoSeleccion.updateValueAndValidity();
    this.f.convocatoria.setValidators([Validators.required, this.validarValorEnOpciones]);
    this.f.convocatoria.setValue('');
    this.f.modalidad.setValidators([Validators.required]);
    this.f.modalidad.reset();
    this.cargarConvocatorias();
    this.esConConvocatoria = true;
    this.validarDuracionProyecto();
  }

  activarMatriculaProyecto() {
    this.matriculaProyecto = this.nivelProyecto !== 0 && (this.tipoProyecto !== 0 || !!this.f.tipoMacroproyecto.value);
  }

  private cargarConvocatorias() {
    const tipoAEnviar = this.tipoProyecto || this.f.tipoMacroproyecto.value ||
      this.proyectoAEditar.procesoSeleccion.tipoProyecto.identificador;
    if ((this.nivelProyecto !== 0 && !!tipoAEnviar && this.tipoSubproyecto !== 0)
      || (this.nivelProyecto !== 0 && !!tipoAEnviar && this.claseSubproyecto !== 0)
      || (this.nivelProyecto !== 0 && this.esMacroproyecto && !!this.f.tipoMacroproyecto.value)
      || (this.edicionConvocatoria && this.nivelProyecto !== 0)) {
      this.listaConvocatorias = [];
      this.f.convocatoria.setValue('');
      if (this.modoEdicion) {
        this.tipoSubproyecto = this.proyectoLocalServicio.obtenerDatosSubproyecto().claseSubproyecto || 0;
      }
      this.informacionGeneralProyectoServicio.consultarConvocatoria(
        this.nivelProyecto, tipoAEnviar, this.tipoSubproyecto, this.paraConsulta).subscribe(convocatorias => {
          convocatorias.forEach(convocatoria => {
            this.listaConvocatorias.push(convocatoria);
          });
          if (this.modoEdicion) {
            this.f.convocatoria.setValue(this.listaConvocatorias.find(
              convocatoria => convocatoria.identificador === this.proyectoAEditar.convocatoria.identificador));
            this.procesoConvocatoriaSeleccionado();
            this.obtenerModalidades(this.proyectoAEditar.convocatoria);
            this.edicionConvocatoria = false;
          }
        });

      this.opcionesFiltradasConvocatoria = this.f.convocatoria.valueChanges
        .pipe(
          startWith<string | InformacionGeneralConvocatoria>(''),
          map(value => typeof value === 'string' ? value : value.nombre),
          map(nombre => nombre ? this._filtroConvocatoria(nombre) : this.listaConvocatorias.slice())
        );
    }
  }

  private _filtroConvocatoria(nombre: string): any[] {
    const valorFiltro = nombre.toLowerCase();
    return this.listaConvocatorias.filter(opcion => opcion.nombre.toLowerCase().indexOf(valorFiltro) ===
      ConvocatoriaConstantes.INCIALIZACION_CERO);
  }

  nombreConvocatoria(convocatoria?: InformacionGeneralConvocatoria): string | undefined {
    return convocatoria ? convocatoria.nombre : undefined;
  }

  nombreProyecto(proyecto?: InformacionGeneralProyecto): string | undefined {
    return proyecto ? `${proyecto.codigo}  ${'-'} ${proyecto.nombreCorto}` : undefined;
  }

  validarValorEnOpciones(control: AbstractControl) {
    if (control.value !== '') {
      if (control.value.nombre === undefined) {
        return { valorValido: true };
      }
    }
    return null;
  }

  private cargarProcesosSeleccion() {
    const tipoAEnviar = this.tipoProyecto || this.f.tipoMacroproyecto.value;
    if ((this.nivelProyecto !== 0 && !!tipoAEnviar && this.tipoSubproyecto !== 0)
      || (this.nivelProyecto !== 0 && !!tipoAEnviar && this.claseSubproyecto !== 0)
      || (this.nivelProyecto !== 0 && this.esMacroproyecto && !!this.f.tipoMacroproyecto.value)) {
      this.listaProcesosSeleccion = [];
      this.f.procesoSeleccion.setValue('');
      if (this.modoEdicion) {
        this.tipoSubproyecto = this.proyectoLocalServicio.obtenerDatosSubproyecto().claseSubproyecto || 0;
      }
      this.informacionGeneralProyectoServicio.consultarProcesosSeleccion(
        this.nivelProyecto, tipoAEnviar, this.tipoSubproyecto, this.paraConsulta).subscribe(procesos => {
          procesos.forEach(proceso => {
            this.listaProcesosSeleccion.push(proceso);
          });
          if (this.modoEdicion) {
            this.f.procesoSeleccion.setValue(this.listaProcesosSeleccion.find(
              procesoSeleccion => procesoSeleccion.identificador === this.proyectoAEditar.procesoSeleccion.identificador));
            if (!this.proyectoAEditar.convocatoria) {
              this.procesoSeleccionSeleccionado();
            }
            this.identificarCambiosEnFormulario();
          }
        });
    }
  }

  private cargarProyectoAsociadoJI() {
    if (this.tipoProyecto !== 0 && !!this.f.grupo.value) {
      this.listaProyectoAsociado = [];
      this.informacionGeneralProyectoServicio.obtenerListaProyectosAsociadosJI(this.f.grupo.value.identificador)
        .subscribe(proyectos => {
          proyectos.forEach(proyecto => {
            this.listaProyectoAsociado.push(proyecto);
          });
          if (this.modoEdicion) {
            const proyectoSeleccionado = proyectos.find(
              proyecto => proyecto.codigo === this.proyectoLocalServicio.obtenerDatosSubproyecto().codigoProyecto);
            this.f.proyectoVinculaJi.setValue(proyectoSeleccionado);
            this.identificarCambiosEnFormulario();
          }
        });

      this.opcionesFiltradasProyecto = this.f.proyectoVinculaJi.valueChanges.pipe(
        startWith<string | InformacionGeneralProyecto>(''),
        filter(value => !!value),
        map(value => typeof value === 'string' ? value : value.nombreCorto),
        map(nombre => nombre ? this._filtroProyectoAsociado(nombre) : this.listaProyectoAsociado.slice())
      );
    }
  }

  private _filtroProcesoSeleccion(nombre: string): InformacionGeneral[] {
    const valorFiltro = nombre.toLowerCase();
    return this.listaProcesosSeleccion.filter(opcion => opcion.nombre.toLowerCase().indexOf(valorFiltro) ===
      ConvocatoriaConstantes.INCIALIZACION_CERO);
  }

  private _filtroProyectoAsociado(nombre: string): InformacionGeneralProyecto[] {
    const valorFiltro = nombre.toLowerCase();
    return this.listaProyectoAsociado.filter(opcion => (opcion.nombreCorto.toLowerCase().indexOf(valorFiltro) ===
      ConvocatoriaConstantes.INCIALIZACION_CERO) || (opcion.codigo.toLowerCase().indexOf(valorFiltro) ===
        ConvocatoriaConstantes.INCIALIZACION_CERO));
  }

  nombreProcesoSeleccion(proceso?: InformacionGeneral): string | undefined {
    return proceso ? proceso.nombre : undefined;
  }

  obtenerModalidades(convocatoria: InformacionGeneralConvocatoria) {
    this.convocatoriaSeleccionada = convocatoria;
    this.activarModalidades = true;
    this.cargarModalidadesConvocatoria(convocatoria.identificador);
  }

  private cargarModalidadesConvocatoria(idConvocatoria: number) {
    if (!!idConvocatoria) {
      this.listaModalidadesConvocatoria = [];
      this.informacionGeneralProyectoServicio.consultarModalidadesPorConvocatoria(idConvocatoria)
        .subscribe(modalidades => {
          modalidades.forEach(modalidad => this.listaModalidadesConvocatoria.push(modalidad));
          if (this.modoEdicion) {
            const modalidadEncontradaParaProyecto = this.listaModalidadesConvocatoria.find(
              modalidad => modalidad.identificador === this.proyectoAEditar.modalidadConvocatoria.identificador);
            this.f.modalidad.setValue(modalidadEncontradaParaProyecto);
            this.cambioModalidad();
            this.identificarCambiosEnFormulario();
          }
        });
    }
  }

  guardar() {
    if (this.formularioInformacionGeneralProyecto.invalid) {
      return;
    }

    const informacionGeneral = this.validarInformacionGeneral();
    const subproyecto: DatosSubproyecto = this.validarEsSubproyecto();
    const componente: ComponenteProyecto = this.validarEsMacroProyecto();
    const proyecto = {} as Proyecto;
    proyecto.informacionGeneralProyecto = informacionGeneral;
    proyecto.datosSubproyecto = subproyecto;
    proyecto.componenteProyecto = componente;
    const esProyectoEditar = !!this.proyectoAEditar;
    if (esProyectoEditar) {
      proyecto.informacionGeneralProyecto.estado = this.proyectoAEditar.estado;
      proyecto.informacionGeneralProyecto.etapaActual = this.proyectoAEditar.etapaActual;
      proyecto.informacionGeneralProyecto.instanciaAdmtivaActual = this.proyectoAEditar.instanciaAdmtivaActual;
      proyecto.informacionGeneralProyecto.fechaEnvioCentro = this.proyectoAEditar.fechaEnvioCentro;
      proyecto.informacionGeneralProyecto.fechaRegistro = this.proyectoAEditar.fechaRegistro;
    }

    this.informacionGeneralProyectoServicio.guardarInformacionGeneralProyecto(proyecto)
      .subscribe(respuestaInformacionGeneral => {
        proyecto.informacionGeneralProyecto.codigo = respuestaInformacionGeneral.informacionGeneralProyecto.codigo;
        proyecto.informacionGeneralProyecto.estado = respuestaInformacionGeneral.informacionGeneralProyecto.estado;
        this.proyectoLocalServicio.agregarInformacionGeneralProyecto(proyecto.informacionGeneralProyecto);
        if (!!this.f.modalidad.value) {
          this.proyectoLocalServicio.guardarModalidadSeleccionada(this.f.modalidad.value);
        }
        this.proyectoLocalServicio.notificarProyectoGuardado();
        this.informacionGuardada = true;
        if (!esProyectoEditar) {
          this.validacionDePasos(proyecto, respuestaInformacionGeneral);
        }
      });
  }

  private validacionDePasos(proyecto: Proyecto, respuestaInformacionGeneral: EstructuraProyecto) {
    this.calcularPasosVisibles(proyecto.informacionGeneralProyecto);
    const listaTextoDescriptivoObligatorio = this.textoDescriptivoServicioLocal.obtenerListaTextoDescriptivoObligatorio();
    const listaTextoDescriptivoOpcional = this.textoDescriptivoServicioLocal.obtenerListaTextoDescriptivoOpcional();
    this.validarTextoDescriptivo(respuestaInformacionGeneral, listaTextoDescriptivoObligatorio, listaTextoDescriptivoOpcional);
    this.cargarPestanasWizard(listaTextoDescriptivoObligatorio, listaTextoDescriptivoOpcional, respuestaInformacionGeneral);
  }

  private validarTextoDescriptivo(respuestaInformacionGeneral: EstructuraProyecto,
    listaTextoDescriptivoObligatorio: TextoDescriptivo[], listaTextoDescriptivoOpcional: TextoDescriptivo[]) {
    if (!!respuestaInformacionGeneral.textosDescriptivos &&
      ((listaTextoDescriptivoObligatorio.length === 0) || (listaTextoDescriptivoOpcional.length === 0))) {
      const objetivoEspecifico = 'Objetivo específico';
      const objetivoGeneral = 'Objetivo general';
      respuestaInformacionGeneral.textosDescriptivos.forEach(texto => {
        if (texto.titulo !== objetivoEspecifico && texto.titulo !== objetivoGeneral) {
          if (!!texto.textoSolicitado && texto.textoSolicitado.opcional === 0) {
            this.agregarSiNoExiste(listaTextoDescriptivoObligatorio, texto);
          } else {
            this.agregarSiNoExiste(listaTextoDescriptivoOpcional, texto);
          }
        } else {
          this.agregarSiNoExiste(listaTextoDescriptivoObligatorio, texto);
        }
      });
    }
  }

  private cargarPestanasWizard(listaTextoDescriptivoObligatorio: TextoDescriptivo[],
    listaTextoDescriptivoOpcional: TextoDescriptivo[], respuestaInformacionGeneral: EstructuraProyecto) {
    this.textoDescriptivoServicioLocal.agregarTextoDescriptivoObligatorio(listaTextoDescriptivoObligatorio);
    this.textoDescriptivoServicioLocal.agregarTextoDescriptivoOpcional(listaTextoDescriptivoOpcional);
    this.estructuraDeProyectoServicioLocal.agregarTextosDescriptivosInicial(listaTextoDescriptivoObligatorio
      .concat(listaTextoDescriptivoOpcional));
    this.compromisosProyectoServicioLocal.cargarCompromisos(respuestaInformacionGeneral.compromisoProyecto);
    this.condicionFormalServicioLocal.agregarCondicionesPorEvaluacionInicial(respuestaInformacionGeneral.condicionFormalPorEvaluacion);
    this.planTrabajoServicioLocal.agregarPlanDeTrabajo(respuestaInformacionGeneral.planesDeTrabajo);
    this.estructuraDeProyectoServicioLocal.agregarListaPlanesDeTrabajoInicial(respuestaInformacionGeneral.planesDeTrabajo);
    this.estructuraDeProyectoServicioLocal.agregarEvaluacionTecnicaInicial(respuestaInformacionGeneral.evaluacionTecnica);
    this.camposNoEditables();
    this.identificarCambiosEnFormulario();
  }

  private validarInformacionGeneral(): InformacionGeneralProyecto {
    const informacionGeneral = {} as InformacionGeneralProyecto;
    const proyectoLocalGuardado = this.proyectoLocalServicio.obtenerInformacionGeneralProyecto();
    if (!!proyectoLocalGuardado && !!proyectoLocalGuardado.codigo) {
      informacionGeneral.codigo = proyectoLocalGuardado.codigo;
    }
    informacionGeneral.nivelProyecto = this.getNivelProyecto();
    if (!!this.f.tipoMacroproyecto.value) {
      informacionGeneral.subnivelProyecto = null;
      informacionGeneral.subtipoProyecto = null;
      informacionGeneral.tipoProyectoMacro = this.f.tipoMacroproyecto.value;
      informacionGeneral.tipoProyecto = this.f.tipoMacroproyecto.value;
    } else {
      informacionGeneral.subtipoProyecto = this.f.subTipoProyecto.value.identificador;
      informacionGeneral.subnivelProyecto = this.f.claseProyecto.value;
      informacionGeneral.tipoProyectoMacro = null;
      informacionGeneral.tipoProyecto = this.f.tipoProyecto.value;
    }
    informacionGeneral.centroGestion = this.f.centroAdministrativo.value;
    informacionGeneral.claseProyecto = this.tipoMatriculaProyectoConvocatoria() ? this.codigoConvocatoria : this.codigoProcesoSeleccion;
    informacionGeneral.convocatoria = !!this.f.convocatoria.value ? this.f.convocatoria.value : null;
    if (informacionGeneral.convocatoria) {
      this.proyectoLocalServicio
        .agregarInformacionGeneralConvocatoria(this.f.convocatoria.value);
    }

    informacionGeneral.procesoSeleccion = !!this.f.procesoSeleccion.value ? this.f.procesoSeleccion.value :
      this.f.convocatoria.value.procesoSeleccion.informacionGeneral;
    informacionGeneral.modalidadConvocatoria = this.f.modalidad.value;
    informacionGeneral.seccional = this.f.seccional.value;
    informacionGeneral.nombreCorto = this.f.nombreCorto.value;
    informacionGeneral.nombreCompleto = this.f.nombreCompleto.value;
    informacionGeneral.duracion = this.f.duracion.value;
    informacionGeneral.palabrasClaves = this.f.palabrasClave.value;
    informacionGeneral.lugarEjecucion = this.f.lugarEjecucion.value;
    informacionGeneral.requiereAvalBioetica = !!this.f.requiereComiteBioetica.value ? 1 : 0;
    if (this.f.requiereComiteBioetica.value) {
      informacionGeneral.comiteBioetica = this.f.comiteBioetica.value;
    }
    return informacionGeneral;
  }

  getNivelProyecto(): number {
    const nivel = this.f.nivelProyecto.value;
    switch(nivel) {
      case -1:
        return 2;
      case -2:
        return 3;
      default:
        return nivel;
    }
  }

  private validarEsSubproyecto(): DatosSubproyecto {
    let subproyecto: DatosSubproyecto = null;
    if (!!this.f.tipoSubproyecto.value) {
      subproyecto = {} as DatosSubproyecto;
      subproyecto.claseSubproyecto = this.f.tipoSubproyecto.value;
      subproyecto.grupo = this.f.grupo.value.identificador;
      if (!!this.f.proyectoNoRegistradoSiiu.value) {
        subproyecto.tituloSubproyecto = this.f.tituloProyecto.value;
        subproyecto.justificacion = this.f.justificacion.value;
      } else {
        subproyecto.codigoProyecto = this.f.proyectoVinculaJi.value.codigo;
      }
    }
    return subproyecto;
  }

  private validarEsMacroProyecto(): ComponenteProyecto {
    let componente: ComponenteProyecto = null;
    if (!!this.f.macroproyecto.value) {
      componente = {} as ComponenteProyecto;
      componente.codigoProyecto = this.f.macroproyecto.value.codigo;
      componente.componente = this.f.componente.value;
    }
    return componente;
  }

  private agregarSiNoExiste(listadoTextos: TextoDescriptivo[], texto: TextoDescriptivo) {
    const existe = !!listadoTextos.find(t => t.identificador === texto.identificador);
    if (!existe) {
      listadoTextos.push(texto);
    }
  }

  camposNoEditables() {
    if (this.informacionGuardada) {
      this.f.nivelProyecto.disable();
      this.f.tipoSubproyecto.disable();
      this.f.claseProyecto.disable();
      this.f.tipoProyecto.disable();
      this.f.subTipoProyecto.disable();
      this.f.convocatoria.disable();
      this.f.procesoSeleccion.disable();
      this.f.modalidad.disable();
      this.f.tipoMacroproyecto.disable();
      this.f.tipoMatriculaProyecto.disable();
    }
  }

  private calcularPasosVisibles(proyecto: InformacionGeneralProyecto) {
    let idProcesoSeleccionAsociado: number;
    if (this.tipoMatriculaProyectoConvocatoria()) {
      idProcesoSeleccionAsociado = this.convocatoriaSeleccionada.procesoSeleccion.informacionGeneral.identificador;
    } else {
      idProcesoSeleccionAsociado = this.f.procesoSeleccion.value.identificador;
    }
    this.pasosService.calcularPasos(proyecto, idProcesoSeleccionAsociado);
  }

  cambioNivelProyecto() {
    let idNivelProyecto = this.f.nivelProyecto.value;
    idNivelProyecto = this.obtenerNivelSeleccionPosgrados(idNivelProyecto);
    this.validarEsMacroproyecto(idNivelProyecto);
    this.validarEsClaseProyecto(idNivelProyecto);
    this.validarEsTipoSubproyecto(idNivelProyecto);
    this.listadoSubtipoProyecto = [];
    this.validarEsClaseproyectoAsociado(0);
    this.validarEsMacroproyectoPertenece();
    this.centroPorDefectoParaJovenInvestigadorUdea();
    this.f.claseProyecto.reset();
    this.f.tipoSubproyecto.reset();
    this.validarDuracionProyecto();
    this.f.tipoMacroproyecto.reset();
    this.f.tipoProyecto.reset();
    this.f.tipoMatriculaProyecto.reset();
    this.f.grupo.reset();
    this.f.proyectoVinculaJi.reset();
    this.f.tituloProyecto.reset();
    this.f.justificacion.reset();

    this.tipoProyecto = 0;
    this.claseSubproyecto = 0;
    this.tipoSubproyecto = 0;
    if (idNivelProyecto !== undefined) {
      this.nivelProyecto = idNivelProyecto;
    }
    if (this.esConConvocatoria) {
      this.cargarConvocatorias();
    } else {
      this.cargarProcesosSeleccion();
    }
    if (this.esProyectoPosgrados) {
      this.asociarCamposPorDefectoPosgrados(this.f.nivelProyecto.value);
    }
    this.activarMatriculaProyecto();
  }

  obtenerNivelSeleccionPosgrados(idNivelProyecto: number): number {
    if (idNivelProyecto === ProyectoConstantes.IDENTIFICADOR_TIPO_PROPUESTA_GRADO_POSGRADOS) {
      this.esProyectoPosgrados = true;
      return ProyectoConstantes.IDENTIFICADOR_TIPO_PROYECTO;
    }
    if (idNivelProyecto === ProyectoConstantes.IDENTIFICADOR_TIPO_TRABAJO_GRADO_POSGRADOS) {
      this.esProyectoPosgrados = true;
      return ProyectoConstantes.IDENTIFICADOR_TIPO_SUBPROYECTO;
    }
    return idNivelProyecto;
  }

  asociarCamposPorDefectoPosgrados(idNivelProyecto: number) {
    if (idNivelProyecto === ProyectoConstantes.IDENTIFICADOR_TIPO_PROPUESTA_GRADO_POSGRADOS) {
      this.asociarCamposPorDefectoPosgradosPropuestaGrado();
    } else if (idNivelProyecto === ProyectoConstantes.IDENTIFICADOR_TIPO_TRABAJO_GRADO_POSGRADOS) {
      this.asociarCamposPorDefectoPosgradosTabajoGrado();
    }
    this.f.tipoProyecto.setValue(3);
    this.cambioTipoProyecto();
  }

  asociarCamposPorDefectoPosgradosPropuestaGrado() {
    this.f.claseProyecto.setValue(1);
    this.cambioClaseProyecto();
  }

  asociarCamposPorDefectoPosgradosTabajoGrado() {
    this.f.tipoSubproyecto.setValue(3);
    this.cambioTipoSubproyecto();
  }

  cambioTipoProyecto() {
    if (!!this.f.tipoProyecto.value) {
      this.tipoProyecto = this.f.tipoProyecto.value;
      this.activarMatriculaProyecto();
      this.cargarProyectoAsociadoJI();
      this.f.proyectoVinculaJi.setValue('');
      if (this.esConConvocatoria) {
        this.cargarConvocatorias();
      } else {
        this.cargarProcesosSeleccion();
      }
    } else {
      this.tipoProyecto = 0;
    }
    this.consultarClasificacionPorIdTipoProyecto(this.tipoProyecto);
  }

  cambioTipoMacroproyecto() {
    if (!!this.f.tipoMacroproyecto.value) {
      this.activarMatriculaProyecto();
      if (this.esConConvocatoria) {
        this.cargarConvocatorias();
      } else {
        this.cargarProcesosSeleccion();
      }
    }
  }

  cambioTipoSubproyecto() {
    if (this.f.tipoSubproyecto.value !== undefined) {
      this.tipoSubproyecto = this.f.tipoSubproyecto.value;
    } else {
      this.tipoSubproyecto = 0;
    }
    if (this.esConConvocatoria) {
      this.cargarConvocatorias();
    } else {
      this.cargarProcesosSeleccion();
    }
    this.activarMatriculaProyecto();
    this.centroPorDefectoParaJovenInvestigadorUdea();
  }

  cambioClaseProyecto() {
    const idClaseProyecto = this.f.claseProyecto.value;
    if (this.f.claseProyecto.value !== undefined) {
      this.claseSubproyecto = this.f.claseProyecto.value;
    } else {
      this.claseSubproyecto = 0;
    }
    this.validarEsClaseproyectoAsociado(idClaseProyecto);
    this.validarEsMacroproyectoPertenece();
    this.f.macroproyecto.reset();
    this.validarDuracionProyecto();
    if (this.esConConvocatoria) {
      this.cargarConvocatorias();
    } else {
      this.cargarProcesosSeleccion();
    }
  }

  cambioMacroproyecto() {
    this.f.componente.reset();
    const idMacroproyecto = this.f.macroproyecto.value.codigo;
    this.consultarComponentePorMacroproyecto(idMacroproyecto);
    this.validarDuracionProyecto();
  }

  validarEsClaseproyectoAsociado(idClaseProyecto: number) {
    if (idClaseProyecto === 2) {
      this.esProyectoAsociado = true;
    } else {
      this.esProyectoAsociado = false;
    }
  }

  validarEsMacroproyecto(idNivelProyecto) {
    if (idNivelProyecto === ProyectoConstantes.IDENTIFICADOR_TIPO_MACROPROYECTO) {
      this.esMacroproyecto = true;
      this.claseSubproyecto = 0;
    } else {
      this.esMacroproyecto = false;
    }
  }

  validarEsClaseProyecto(idNivelProyecto) {
    if (idNivelProyecto === ProyectoConstantes.IDENTIFICADOR_TIPO_PROYECTO) {
      this.esClaseproyecto = true;
    } else {
      this.esClaseproyecto = false;
    }
  }

  validarEsTipoSubproyecto(idNivelProyecto: number) {
    if (idNivelProyecto === ProyectoConstantes.IDENTIFICADOR_TIPO_SUBPROYECTO) {
      this.esTipoSubproyecto = true;
      this.consultarGrupoInvestigacion();
    } else {
      this.esTipoSubproyecto = false;
      this.f.tipoSubproyecto.setValue('');
    }
  }

  validarEsMacroproyectoPertenece() {
    if (this.esClaseproyecto && this.esProyectoAsociado) {
      this.esMacroproyectoPertenece = true;
      this.esComponente = true;
    } else {
      this.esMacroproyectoPertenece = false;
      this.esComponente = false;
    }
  }

  validarDuracionProyecto() {
    this.errorDuracionMacroproyecto = false;
    if (this.esProyectoAsociadoAMacro()) {
      const duracionProyectoMacro = this.f.macroproyecto.value.duracion;
      this.f.duracion.setValidators(
        [Validators.required, Validators.min(ProyectoConstantes.MINIMO_DURACION), Validators.max(duracionProyectoMacro)]);
      this.errorDuracionMacroproyecto = true;
    } else if (this.tipoMatriculaProyectoConvocatoria() && !!this.f.modalidad.value) {
      const valorMaximoModalidad = this.f.modalidad.value.duracionMaxima;
      this.f.duracion.setValidators(
        [Validators.required, Validators.min(ProyectoConstantes.MINIMO_DURACION), Validators.max(valorMaximoModalidad)]);
    } else {
      this.f.duracion.setValidators([Validators.required, Validators.min(ProyectoConstantes.MINIMO_DURACION)]);
    }
    this.f.duracion.updateValueAndValidity();
  }

  esProyectoAsociadoAMacro(): boolean {
    return this.esMacroproyectoPertenece && !!this.f.macroproyecto.value;
  }

  cambioModalidad() {
    this.validarDuracionProyecto();
  }

  cambioGrupo() {
    this.f.proyectoVinculaJi.setValue('');
    this.cargarProyectoAsociadoJI();
    this.validacionProyectoAsociado();
  }

  private validacionProyectoAsociado() {
    this.f.proyectoVinculaJi.setValidators([Validators.required, this.validarProyectoAsociado]);
  }

  validarProyectoAsociado(control: AbstractControl) {
    if (control.value !== '') {
      if (control.value.nombreCorto === undefined) {
        return { valorValido: true };
      }
    }
    return null;
  }

  private limpiarValidadoresDinamicos() {
    this.f.tipoMacroproyecto.clearValidators();
    this.f.tipoProyecto.clearValidators();
    this.f.claseProyecto.clearValidators();
    this.f.tipoSubproyecto.clearValidators();
    this.f.subTipoProyecto.clearValidators();
    this.f.macroproyecto.clearValidators();
    this.f.componente.clearValidators();
    this.f.modalidad.clearValidators();
    this.f.comiteBioetica.clearValidators();
    this.f.grupo.clearValidators();
    this.f.proyectoVinculaJi.clearValidators();
    this.f.tituloProyecto.clearValidators();
    this.f.justificacion.clearValidators();
    this.f.convocatoria.clearValidators();
    this.f.procesoSeleccion.clearValidators();
  }

  private evaluarRequeridosNivelProyecto(nivelSeleccionado: number) {
    if (!nivelSeleccionado) {
      return;
    }

    this.limpiarValidadoresDinamicos();

    if (nivelSeleccionado === NivelProyectoId.Macroproyecto) {
      this.asignarRequeridosMacroproyecto();
    } else if (nivelSeleccionado === NivelProyectoId.Proyecto) {
      this.asignarRequeridosProyecto();
    } else if (nivelSeleccionado === NivelProyectoId.Subproyecto) {
      this.asignarRequeridosSubproyecto();
    }
  }

  private asignarRequeridosMacroproyecto() {
    this.f['tipoMacroproyecto'].setValidators([Validators.required]);
  }

  private asignarRequeridosProyecto() {
    this.f['claseProyecto'].setValidators([Validators.required]);
    this.f['tipoProyecto'].setValidators([Validators.required]);

    this.f['subTipoProyecto'].setValidators([Validators.required]); // campo clasificacion
  }

  private asignarRequeridosSubproyecto() {
    this.f['tipoProyecto'].setValidators([Validators.required]);
    this.f['tipoSubproyecto'].setValidators([Validators.required]);
    this.f['subTipoProyecto'].setValidators([Validators.required]); // clasificacion
    this.f['grupo'].setValidators([Validators.required]);
    this.evaluarRequeridosProyectoRegistradoEnSiiu(this.f['proyectoNoRegistradoSiiu'].value);
  }

  private evaluarRequeridosProyectoRegistradoEnSiiu(noEstaRegistradoEnSiiu: boolean) {
    if (!!noEstaRegistradoEnSiiu) {
      this.f['tituloProyecto'].setValidators([Validators.required]);
      this.f['justificacion'].setValidators([Validators.required]);
      this.f['proyectoVinculaJi'].clearValidators();
    } else {
      this.f['proyectoVinculaJi'].setValidators([Validators.required]);
      this.f['tituloProyecto'].clearValidators();
      this.f['justificacion'].clearValidators();
    }
  }

  private evaluarRequeridosProyectoAsociado(claseDeProyecto: number) {
    if (claseDeProyecto === ClaseProyectoId.ProyectoAsociadoMacro) {
      this.f['macroproyecto'].setValidators([Validators.required]);
      this.f['componente'].setValidators([Validators.required]);
    } else {
      this.f['macroproyecto'].clearValidators();
      this.f['macroproyecto'].updateValueAndValidity();
      this.f['componente'].clearValidators();
      this.f['componente'].updateValueAndValidity();
    }
  }

  private evaluarRequeridosComiteBioetica(requiereComite: boolean) {
    if (!!requiereComite) {
      this.f['comiteBioetica'].setValidators([Validators.required]);
    } else {
      this.f['comiteBioetica'].clearValidators();
    }
  }

  cargarDatosProyectoParaEdicion() {
    if (this.proyectoAEditar.requiereAvalBioetica === 1) {
      this.f['comiteBioetica'].setValue(this.proyectoAEditar.comiteBioetica);
      this.f['comiteBioetica'].enable();
    }
    this.f['requiereComiteBioetica'].setValue(this.proyectoAEditar.requiereAvalBioetica === 1);

    this.f['nombreCorto'].setValue(this.proyectoAEditar.nombreCorto);
    this.f['nombreCompleto'].setValue(this.proyectoAEditar.nombreCompleto);
    this.f['palabrasClave'].setValue(this.proyectoAEditar.palabrasClaves);
    this.f['seccional'].setValue(this.proyectoAEditar.seccional);
    this.f['lugarEjecucion'].setValue(this.proyectoAEditar.lugarEjecucion);
    this.f['duracion'].setValue(this.proyectoAEditar.duracion);
  }

  private validarExistenciaFinanciador():void {
    this.existeFinanciador =
      this.aportanteProyectoLocalService.validarSiExisteFinanciador();
  }

  abrirModalUbicacion(): void {
    const left = (window.innerWidth / 2) - (800 / 2);
    const top = (window.innerHeight / 2) - (400 / 2);
    if ((environment as any).modalUbicacion) {
      window.open((environment as any).modalUbicacion, "_blank", `height=400, width=800,left=${left},top=${top},
                                            scrollbars=yes, resizable=yes`);
    }
  }

  @HostListener('window:message', ['$event'])
  onMessage(event: any) {
    if(event.data.tipo === ProyectoConstantes.TIPO_DATO_UBICACION){
      const pais = event.data.pais.nombre;
      const departamento = event.data.departamento.nombre;
      const municipio = event.data.municipio.nombre;
      const lugarEjecucion = `${pais}, ${departamento}, ${municipio}`;
      this.f.lugarEjecucion.setValue(lugarEjecucion);
    }
  }

}
