import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaInformacionComplementariaComponent } from './lista-informacion-complementaria.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MensajeExitoErrorComponent } from 'src/app/shared/componentes/mensaje-exito-error/mensaje-exito-error.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InformacionComplementariaService } from '../../servicios/informacion-complementaria.service';
import { of } from 'rxjs';
import { ProyectoConstantes } from '../../proyecto-constantes';
import { ElementoDatoAdicional } from '../../modelo/elemento-dato-adicional';
import { InformacionComplementaria } from '../../modelo/informacion-complementaria';
import { ObjetoInformacionComplementaria } from '../../modelo/objeto-informacion-complementaria';
import { tick } from '@angular/core/testing';
import { fakeAsync } from '@angular/core/testing';
import { InformacionComplementariaLocalService } from '../../servicio-local/informacion-complementaria-local.service';
import { AlertaLocalService } from 'src/app/shared/servicio-local/alerta-local.service';
import { DatosAdicionales } from '../../modelo/datos-adicionales';

describe('ListaInformacionComplementariaComponent', () => {
  let component: ListaInformacionComplementariaComponent;
  let fixture: ComponentFixture<ListaInformacionComplementariaComponent>;
  let informacionComplementariaService: InformacionComplementariaService;
  let alertaServicioLocal: AlertaLocalService;
  let informacionComplementariaLocalService: InformacionComplementariaLocalService;

  const tituloOds = 'Agregar objetivos desarrollo sostenible - ODS';
  const elementoMock = { objetivo: 1, descripcion: 'Poner fin a la pobreza en todas sus formas en todo el mundo', disabled: false, seleccionado: true };
  const itemMock = { proyecto: '1234', objetivo: elementoMock.objetivo };
  const valorMock = { titulo: tituloOds, elementos: [{ objetivo: 1, descripcion: 'Poner fin a la pobreza en todas sus formas en todo el mundo', disabled: false, seleccionado: false }], elementosSeleccionados: [], singleSelection: false };
  const datosAdicionalesMock = { objetivosDesarrolloMilenio: [], focosMisionSabios: [], agendaG8: [], objetivosSocioeconomicos: [] };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListaInformacionComplementariaComponent, MensajeExitoErrorComponent],
      imports: [MatIconModule, MatMenuModule,
        MatExpansionModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientTestingModule],
      providers: [
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaInformacionComplementariaComponent);
    component = fixture.componentInstance;
    informacionComplementariaService = TestBed.get(InformacionComplementariaService);
    alertaServicioLocal = TestBed.get(AlertaLocalService);
    informacionComplementariaLocalService = TestBed.get(InformacionComplementariaLocalService);

  });

  it('Dado que se solicita obtener información complementaria, Cuando se realiza la solicitud, Entonces se debe obtener la información correctamente', () => {
    spyOn(informacionComplementariaService, 'retornarInformacionComplementariaPorProyecto').and.returnValue(of(datosAdicionalesMock));
    spyOn(informacionComplementariaService, 'obtenerDatosAdicionales').and.returnValue(of(datosAdicionalesMock));

    component.ngOnInit();

    expect(component.listado).toBeDefined();
    expect(informacionComplementariaService.retornarInformacionComplementariaPorProyecto).toHaveBeenCalled();
    expect(informacionComplementariaService.obtenerDatosAdicionales).toHaveBeenCalled();
  });

  it('Dado que se obtiene la información complementaria, Cuando se completa la operación, Entonces se debe llamar a validarInformacionComplementariaCompleta', () => {
    spyOn(informacionComplementariaService, 'retornarInformacionComplementariaPorProyecto').and.returnValue(of(datosAdicionalesMock));
    spyOn(informacionComplementariaService, 'obtenerDatosAdicionales').and.returnValue(of(datosAdicionalesMock));
    spyOn(component, 'validarInformacionComplementariaCompleta');

    component.ngOnInit();

    expect(component.validarInformacionComplementariaCompleta).toHaveBeenCalled();
  });

  it('Dado que se obtiene la información complementaria, Cuando se procesan las secciones, Entonces se debe llamar a organizarDatos para cada sección', () => {
    spyOn(informacionComplementariaService, 'retornarInformacionComplementariaPorProyecto').and.returnValue(of(datosAdicionalesMock));
    spyOn(informacionComplementariaService, 'obtenerDatosAdicionales').and.returnValue(of(datosAdicionalesMock));
    spyOn(component, 'organizarDatos').and.callThrough();

    component.ngOnInit();

    expect(component.organizarDatos).toHaveBeenCalledTimes(4);
  });

  it('Dado que se obtiene información complementaria, Cuando se realiza la validación, Entonces se debe llamar a validarSeccionConSeleccionUnica para cada elemento de cada sección', () => {
    datosAdicionalesMock.objetivosSocioeconomicos = [{ titulo: 'Agregar objetivo socioeconómico', elementos: { objetivo: 1, descripcion: 'Exploración y explotación del medio terrestre', disabled: false, seleccionado: true }, elementosSeleccionados: { proyecto: '2023-61663', agenda: undefined, subagenda: undefined, objetivo: 1 }, singleSelection: true }];
    
    spyOn(informacionComplementariaService, 'retornarInformacionComplementariaPorProyecto').and.returnValue(of(datosAdicionalesMock));
    spyOn(informacionComplementariaService, 'obtenerDatosAdicionales').and.returnValue(of(datosAdicionalesMock));
    spyOn(component, 'validarSeccionConSeleccionUnica');

    component.ngOnInit();

    expect(component.validarSeccionConSeleccionUnica).toHaveBeenCalledTimes(1);
  });

  it('Dado que se agrega un item, Cuando el item no existe previamente, Entonces se debe agregar el item a elementosSeleccionados', () => {
    itemMock.proyecto = undefined;
    component.alternarSeleccion(elementoMock, undefined, valorMock);
    expect(valorMock.elementosSeleccionados).toContain(itemMock);
  });

  it('Dado que se elimina un item, Cuando el item ya existe previamente, Entonces se debe eliminar el item de elementosSeleccionados', () => {
    
    valorMock.elementosSeleccionados = [{ proyecto: undefined, objetivo: 1 }];

    component.alternarSeleccion(elementoMock, undefined, valorMock);

    expect(valorMock.elementosSeleccionados).not.toContain(itemMock);
  });

  it('Dado que se agrega un item y sub es undefined, Cuando el item no existe previamente, Entonces se debe agregar el item a elementosSeleccionados', () => {  
    itemMock.proyecto = undefined;
    valorMock.elementosSeleccionados = [];
    
    component.alternarSeleccion(elementoMock, undefined, valorMock);

    expect(valorMock.elementosSeleccionados).toContain(itemMock);
  });

  it('Dado que se elimina un item y sub es undefined, Cuando el item ya existe previamente, Entonces se debe eliminar el item de elementosSeleccionados', () => {
    valorMock.elementosSeleccionados = [{ proyecto: undefined, objetivo: 1 }];

    component.alternarSeleccion(elementoMock, undefined, valorMock);

    expect(valorMock.elementosSeleccionados).not.toContain(itemMock);
  });

  it('Dado que se realiza el mapeo de elementos, Cuando se completa la operación, Entonces se deben mapear los elementos correctamente', () => {
    const propiedad = 'seccion';
    const elementosMock = [elementoMock, { objetivo: 2, descripcion: 'prueba', disabled: false, seleccionado: false }];
    spyOn(informacionComplementariaService, 'obtenerDatosAdicionales').and.returnValue(
      of({
        seccion: elementosMock
      })
    );
    const elementosSeleccionados = [
      { proyecto: undefined, objetivo: 1 }
    ];

    const resultado = component.organizarDatos(
      propiedad,
      elementosSeleccionados
    );

    resultado.subscribe(data => {
      expect(data.elementos[0].seleccionado).toBe(true);
      expect(data.elementos[1].seleccionado).toBe(false);
    });
  });

  it('Dado que se consulta la opción de singleSelection para economía, Cuando se realiza la consulta, Entonces se debe devolver el valor correcto de singleSelection', () => {
    const propiedad = ProyectoConstantes.INFORMACION_COMPLEMENTARIA_SECCION_ECONOMI;

    const resultado = component.organizarDatos(
      propiedad,
      []
    );

    resultado.subscribe(data => {
      expect(data.singleSelection).toBe(true);
    });
  });

  it('Dado que se realiza el mapeo de elementos del servicio sin subagendas, Cuando se completa la operación, Entonces se deben mapear los elementos correctamente', () => {
    const elementosDelServicio: ElementoDatoAdicional[] = [
      { foco: 1, descripcion: 'Biotecnología, Bioeconomía y Medio Ambiente' },
      { foco: 2, descripcion: 'Ciencias Básicas y del Espacio' },
    ];

    const resultado = component.mapearElementos(elementosDelServicio);

    expect(resultado).toEqual([
      { objetivo: 1, descripcion: 'Biotecnología, Bioeconomía y Medio Ambiente', disabled: false },
      { objetivo: 2, descripcion: 'Ciencias Básicas y del Espacio', disabled: false },
    ]);
  });

  it('Dado que se realiza el mapeo de elementos del servicio con subagendas, Cuando se completa la operación, Entonces se deben mapear los elementos correctamente', () => {
    const elementosDelServicio: ElementoDatoAdicional[] = [
      {
        agenda: 1,
        descripcion: 'Organizaciones y Territorios Competitivos',
        subagendas: [
          { subagenda: 1, descripcion: 'Territorios inteligentes para la vida', estado: 'H' },
          { subagenda: 2, descripcion: 'Tecnologías Informáticas habilitadoras de la industria 4.0', estado: 'H' },
        ],
      },
    ];

    const resultado = component.mapearElementos(elementosDelServicio);

    expect(resultado).toEqual([
      {
        objetivo: 1,
        descripcion: 'Organizaciones y Territorios Competitivos',
        subagendas: [
          { objetivo: 1, descripcion: 'Territorios inteligentes para la vida' },
          { objetivo: 2, descripcion: 'Tecnologías Informáticas habilitadoras de la industria 4.0' },
        ],
        disabled: false,
      },
    ]);
  });

  it('Dado que el valor de singleSelection es verdadero, Cuando se deshabilitan todos los elementos excepto el seleccionado, Entonces se deben deshabilitar los elementos correctamente', () => {
    const elemento: InformacionComplementaria = { objetivo: 1, descripcion: 'Biotecnología, Bioeconomía y Medio Ambiente', disabled: false, seleccionado: false };
    const valor: ObjetoInformacionComplementaria = {
      titulo: "Agregar focos de misión de sabios",
      singleSelection: true,
      elementos: [
        { objetivo: 1, descripcion: 'Biotecnología, Bioeconomía y Medio Ambiente', disabled: false, seleccionado: false },
        { objetivo: 2, descripcion: 'Ciencias Básicas y del Espacio', disabled: false, seleccionado: false },
        { objetivo: 3, descripcion: 'Ciencias de la Vida y la Salud', disabled: false, seleccionado: false },
      ],
      elementosSeleccionados: [{ proyecto: '2023-61663', agenda: undefined, subagenda: undefined, objetivo: 1 }]
    };

    component.validarSeccionConSeleccionUnica(elemento, valor);

    expect(valor.elementos[0].disabled).toBe(false);
    expect(valor.elementos[1].disabled).toBe(true);
    expect(valor.elementos[2].disabled).toBe(true);
  });

  it('Dado que el valor de singleSelection es falso, Cuando se verifica la deshabilitación de elementos, Entonces no se deben deshabilitar elementos', () => {
    const elemento: InformacionComplementaria = { objetivo: 1, descripcion: 'Biotecnología, Bioeconomía y Medio Ambiente', disabled: false, seleccionado: false };
    const valor: ObjetoInformacionComplementaria = {
      titulo: "Agregar focos de misión de sabios",
      singleSelection: false,
      elementos: [
        { objetivo: 1, descripcion: 'Biotecnología, Bioeconomía y Medio Ambiente', disabled: false, seleccionado: false },
        { objetivo: 2, descripcion: 'Ciencias Básicas y del Espacio', disabled: false, seleccionado: false },
        { objetivo: 3, descripcion: 'Ciencias de la Vida y la Salud', disabled: false, seleccionado: false },
      ],
      elementosSeleccionados: [{ proyecto: '2023-61663', agenda: undefined, subagenda: undefined, objetivo: 1 }]
    };

    component.validarSeccionConSeleccionUnica(elemento, valor);

    expect(valor.elementos[0].disabled).toBe(false);
    expect(valor.elementos[1].disabled).toBe(false);
    expect(valor.elementos[1].disabled).toBe(false);
  });

  it('Dado que se intenta guardar elementos seleccionados, Cuando se completa la operación, Entonces los elementos seleccionados deben ser guardados correctamente', () => {
    const seleccionadosMock = {
      agendaG8: [],
      focosMisionSabios: [],
      objetivosDesarrolloMilenio: [],
      objetivosSocioeconomicos: [],
      proyecto: '1234',
    };
    const datosAdicionalesMock = {
      agendaG8: [],
      focosMisionSabios: [],
      objetivosDesarrolloMilenio: [],
      objetivosSocioeconomicos: [],
      proyecto: '1234',
    };
    component.listado = [
      { titulo: tituloOds, elementos: Array(18), elementosSeleccionados: [], singleSelection: false },
      { titulo: 'Agregar focos de misión de sabios', elementos: [Array(9)], elementosSeleccionados: [], singleSelection: false },
      { titulo: 'Agregar agenda G8', elementos: Array(5), elementosSeleccionados: [], singleSelection: false },
      { titulo: 'Agregar objetivo socioeconómico', elementos: Array(15), elementosSeleccionados: [], singleSelection: true },
    ];
    component.codigoProyecto = '1234';

    spyOn(component, 'obtenerSeleccionados').and.returnValue(seleccionadosMock);
    const guardarInformacionComplementariaSpy = spyOn(informacionComplementariaService, 'guardarInformacionComplementaria').and.returnValue(of(null));

    component.guardarSeleccionados();

    expect(component.obtenerSeleccionados).toHaveBeenCalled();
    expect(guardarInformacionComplementariaSpy).toHaveBeenCalledWith(datosAdicionalesMock);
  });

  it('Dado que se intenta obtener los elementos seleccionados, Cuando se completa la operación, Entonces se deben obtener los elementos seleccionados correctamente', () => {
    const listado = [
      { titulo: 'objetivos Desarrollo Milenio', elementos: Array(18), elementosSeleccionados: [], singleSelection: false },
      { titulo: 'focos Mision Sabios', elementos: [Array(9)], elementosSeleccionados: [], singleSelection: false },
      { titulo: 'agenda G8', elementos: Array(5), elementosSeleccionados: [], singleSelection: false },
      { titulo: 'objetivos Socioeconomicos', elementos: Array(15), elementosSeleccionados: [], singleSelection: true },
    ];

    spyOn(component, 'obtenerPropiedadOTitulo').and.callFake((titulo) => titulo.replace(/\s/g, ''));

    component.listado = listado;
    const resultado = component.obtenerSeleccionados();
  
    expect(resultado).toEqual({
      'objetivosDesarrolloMilenio': [],
      'focosMisionSabios': [],
      'agendaG8': [],
      'objetivosSocioeconomicos': []
    } as DatosAdicionales);
  });
  

  it('Dado que se busca la propiedad correspondiente a un título, Cuando se completa la operación, Entonces se debe obtener la propiedad correctamente', () => {
    const titulo = ProyectoConstantes.INFORMACION_COMPLEMENTARIA_TITULO_ODS;
    const resultado = component.obtenerPropiedadOTitulo(titulo);
    expect(resultado).toEqual(ProyectoConstantes.INFORMACION_COMPLEMENTARIA_SECCION_ODS);
  });

  it('Dado que se busca el título correspondiente a una propiedad, Cuando se completa la operación, Entonces se debe obtener el título correctamente', () => {
    const propiedad = ProyectoConstantes.INFORMACION_COMPLEMENTARIA_SECCION_G8;
    const resultado = component.obtenerPropiedadOTitulo(propiedad);
    expect(resultado).toEqual(ProyectoConstantes.INFORMACION_COMPLEMENTARIA_TITULO_G8);
  });

  it('Dado que el valor no corresponde a ninguna propiedad o título, Cuando se completa la operación, Entonces se debe devolver una cadena vacía', () => {
    const valor = 'valor no existente';
    const resultado = component.obtenerPropiedadOTitulo(valor);
    expect(resultado).toEqual('');
  });

  it('Dado que se ejecuta guardarDatosAdicionales, Cuando se completa la operación, Entonces debe llamar a guardarInformacionComplementaria', fakeAsync(() => {
    const datosAdicionalesMock = {
      agendaG8: [],
      focosMisionSabios: [],
      objetivosDesarrolloMilenio: [],
      objetivosSocioeconomicos: [],
      proyecto: '',
    };

    const guardarInformacionComplementariaSpy = spyOn(informacionComplementariaService, 'guardarInformacionComplementaria').and.returnValue({ subscribe: () => { } });
    component.guardarDatosAdicionales(datosAdicionalesMock);
    tick();

    expect(guardarInformacionComplementariaSpy).toHaveBeenCalledWith(datosAdicionalesMock);
  }));

  it('Dado que se ejecuta manejarExito, Cuando se completa la operación, Entonces el mensaje debe ser configurado y se deben llamar a los servicios locales', () => {
    const mensajeMock = {
      tipoMensaje: "PRUEBA",
      mensaje: "PRUEBA"
    };

    const validarInformacionComplementariaCompletaSpy = spyOn(informacionComplementariaLocalService, 'actualizarInformacionComplementaria');
    const agregarMensajeSpy = spyOn(alertaServicioLocal, 'agregarMensaje');

    component.actualizarInformacionComplementaria(mensajeMock);

    expect(mensajeMock.tipoMensaje).toBe('EXITO');
    expect(mensajeMock.mensaje).toBe('Información complementaria guardada con éxito.');
    expect(validarInformacionComplementariaCompletaSpy).toHaveBeenCalledWith(component.codigoProyecto);
    expect(agregarMensajeSpy).toHaveBeenCalledWith(mensajeMock);
  });

  it('Dado un título que comienza con "Agregar", Cuando se ejecuta cambiarTitulo, Entonces el título debe cambiar correctamente', () => {
    const titulo = 'Agregar algo';
    const singleSelection = true;
    const nuevoTitulo = component.cambiarTitulo(titulo, singleSelection);

    expect(nuevoTitulo).toBe('Agregue algo, seleccione uno.');
  });

  it('Dado un título que no comienza con "Agregar", Cuando se ejecuta cambiarTitulo, Entonces el título debe cambiar correctamente', () => {
    const titulo = 'Modificar algo';
    const singleSelection = false;
    const nuevoTitulo = component.cambiarTitulo(titulo, singleSelection);

    expect(nuevoTitulo).toBe('Modificar algo, puede seleccionar uno o varios.');
  });
});
