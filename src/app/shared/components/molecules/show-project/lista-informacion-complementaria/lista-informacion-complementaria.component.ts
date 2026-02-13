import { Component, OnInit, Input } from '@angular/core';
import { ObjetoInformacionComplementaria } from 'src/app/proyecto/modelo/objeto-informacion-complementaria';
import { InformacionComplementariaService } from 'src/app/proyecto/servicios/informacion-complementaria.service';
import { DatosAdicionales } from 'src/app/proyecto/modelo/datos-adicionales';
import { map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { ProyectoLocalService } from 'src/app/proyecto/servicio-local/proyecto-local.service';
import { AlertaLocalService } from 'src/app/shared/servicio-local/alerta-local.service';
import { AlertaMensaje } from 'src/app/shared/componentes/mensaje-exito-error/alerta-mensaje';
import { ConstantesExitoError } from 'src/app/shared/componentes/mensaje-exito-error/constantes-exito-error';
import { ProyectoConstantes } from 'src/app/proyecto/proyecto-constantes';
import { InformacionComplementariaLocalService } from 'src/app/proyecto/servicio-local/informacion-complementaria-local.service';
import { InformacionComplementaria } from 'src/app/proyecto/modelo/informacion-complementaria';
import { ElementosSeleccionados } from 'src/app/proyecto/modelo/elementos-seleccionados';
import { ElementoDatoAdicional } from 'src/app/proyecto/modelo/elemento-dato-adicional';

const MENSAJE_EXITO = 'Información complementaria guardada con éxito.';

@Component({
  selector: 'app-lista-informacion-complementaria',
  templateUrl: './lista-informacion-complementaria.component.html',
  styleUrls: ['./lista-informacion-complementaria.component.css']
})
export class ListaInformacionComplementariaComponent implements OnInit {

  @Input() editable: boolean;

  listado: ObjetoInformacionComplementaria[];
  datosService: DatosAdicionales;
  codigoProyecto: string;
  mensajeAyuda: string;

  constructor(
    private informacionComplementariaService: InformacionComplementariaService,
    private proyectoServicioLocal: ProyectoLocalService,
    private alertaServicioLocal: AlertaLocalService,
    private informacionComplementariaLocalService: InformacionComplementariaLocalService) {
    this.codigoProyecto = proyectoServicioLocal.obtenerInformacionGeneralProyecto().codigo;
  }

  ngOnInit(): void {
    this.obtenerInformacionComplementaria();
    this.validarInformacionComplementariaCompleta();
  }

  obtenerInformacionComplementaria(): void {
    this.informacionComplementariaService.retornarInformacionComplementariaPorProyecto(this.codigoProyecto)
    .subscribe(datosAdicionales => {
      forkJoin([
        this.organizarDatos(ProyectoConstantes.INFORMACION_COMPLEMENTARIA_SECCION_ODS,
          datosAdicionales.objetivosDesarrolloMilenio.map(objeto => ElementosSeleccionados.transformarObjeto(objeto))),
        this.organizarDatos(ProyectoConstantes.INFORMACION_COMPLEMENTARIA_SECCION_FOCOS,
          datosAdicionales.focosMisionSabios.map(objeto => ElementosSeleccionados.transformarObjeto(objeto))),
        this.organizarDatos(ProyectoConstantes.INFORMACION_COMPLEMENTARIA_SECCION_G8,
          datosAdicionales.agendaG8.map(objeto => ElementosSeleccionados.transformarObjeto(objeto))),
        this.organizarDatos(ProyectoConstantes.INFORMACION_COMPLEMENTARIA_SECCION_ECONOMI,
          datosAdicionales.objetivosSocioeconomicos.map(objeto => ElementosSeleccionados.transformarObjeto(objeto)))
      ]).subscribe(listados => {
        this.listado = listados;
        this.listado.forEach(valor => {
          valor.elementos.forEach(elemento => {
            this.validarSeccionConSeleccionUnica(elemento, valor);
          });
        });
      });
    });
  }

  validarInformacionComplementariaCompleta(): void {
    this.informacionComplementariaLocalService.actualizarInformacionComplementaria(this.codigoProyecto);
  }

  alternarSeleccion(elemento: InformacionComplementaria, sub: InformacionComplementaria,
    valor: ObjetoInformacionComplementaria): void {
    const proyecto = this.codigoProyecto;
    const item = sub ? { proyecto, agenda: elemento.objetivo, subagenda: sub.objetivo } :
    { proyecto, objetivo: elemento.objetivo };
    const indice = valor.elementosSeleccionados.findIndex(i =>
      (sub ? (i.agenda === elemento.objetivo && i.subagenda === sub.objetivo) : i.objetivo === elemento.objetivo));

    if (indice === -1) {
      valor.elementosSeleccionados.push(item);
    } else {
      valor.elementosSeleccionados.splice(indice, 1);
    }
  }

  organizarDatos(propiedad: string, elementosSeleccionados: ElementosSeleccionados[]): Observable<ObjetoInformacionComplementaria> {
    return this.informacionComplementariaService.obtenerDatosAdicionales().pipe(
      map(datos => {
        const elementos = datos[propiedad];
        const elementosMapeados = this.mapearElementos(elementos);
        elementosMapeados.forEach(elemento => {
          if (elemento.subagendas) {
            elemento.subagendas.forEach(subagenda => {
              subagenda.seleccionado = elementosSeleccionados.some(e =>
                e.agenda === elemento.objetivo && e.subagenda === subagenda.objetivo);
            });
          } else {
            elemento.seleccionado = elementosSeleccionados.some(e => e.objetivo === elemento.objetivo);
          }
        });
        return {
          titulo: this.obtenerPropiedadOTitulo(propiedad),
          elementos: elementosMapeados,
          elementosSeleccionados: elementosSeleccionados,
          singleSelection: propiedad === ProyectoConstantes.INFORMACION_COMPLEMENTARIA_SECCION_ECONOMI
        };
      })
    );
  }

  manejarCambioElemento(elemento: InformacionComplementaria, subAgenda:InformacionComplementaria,
     valor: ObjetoInformacionComplementaria) {
    this.alternarSeleccion(elemento, subAgenda, valor);
    this.validarSeccionConSeleccionUnica(elemento, valor);
  }

  mapearElementos(elementosDelServicio: ElementoDatoAdicional[]): InformacionComplementaria[] {
    return elementosDelServicio.map(elemento => {
      let objetivo = elemento.objetivo;
      let descripcion = elemento.descripcion;

      if (!objetivo) {
        objetivo = elemento.foco || elemento.agenda;
        descripcion = elemento.descripcion;
      }

      if (elemento.subagendas) {
        const subagendasMapeadas = elemento.subagendas.map(subagenda => {
          return { objetivo: subagenda.subagenda, descripcion: subagenda.descripcion };
        });
        return { objetivo, descripcion, subagendas: subagendasMapeadas, disabled: false };
      }
      return { objetivo, descripcion, disabled: false };
    });
  }

  validarSeccionConSeleccionUnica(elemento: InformacionComplementaria, valor: ObjetoInformacionComplementaria): void {
    if (valor.singleSelection) {
      valor.elementos.forEach(item => {
        item.disabled = elemento.seleccionado ? item !== elemento :
          valor.elementosSeleccionados && valor.elementosSeleccionados.length > 0 ?
            item.objetivo !== valor.elementosSeleccionados[0].objetivo : false;
      });
    }
  }

  guardarSeleccionados(): void {
    const seleccionados = this.obtenerSeleccionados();
    seleccionados.proyecto = this.codigoProyecto;
    this.guardarDatosAdicionales(seleccionados);
  }

  obtenerSeleccionados(): DatosAdicionales {
    let seleccionados = {};
    this.listado.forEach(valor => {
      let propiedad = this.obtenerPropiedadOTitulo(valor.titulo);
      seleccionados[propiedad] = valor.elementosSeleccionados;
    });
    return seleccionados as DatosAdicionales;
  }

  obtenerPropiedadOTitulo(valor: string): string {
    const mapeoTitulosAPropiedades = {
      [ProyectoConstantes.INFORMACION_COMPLEMENTARIA_TITULO_ODS]:
      ProyectoConstantes.INFORMACION_COMPLEMENTARIA_SECCION_ODS,
      [ProyectoConstantes.INFORMACION_COMPLEMENTARIA_TITULO_FOCOS]:
      ProyectoConstantes.INFORMACION_COMPLEMENTARIA_SECCION_FOCOS,
      [ProyectoConstantes.INFORMACION_COMPLEMENTARIA_TITULO_G8]:
      ProyectoConstantes.INFORMACION_COMPLEMENTARIA_SECCION_G8,
      [ProyectoConstantes.INFORMACION_COMPLEMENTARIA_TITULO_ECONOMI]:
      ProyectoConstantes.INFORMACION_COMPLEMENTARIA_SECCION_ECONOMI,
    };

    if (valor in mapeoTitulosAPropiedades) {
      return mapeoTitulosAPropiedades[valor];
    }

    const propiedad = Object.keys(mapeoTitulosAPropiedades).find((key) => mapeoTitulosAPropiedades[key] === valor);
    return propiedad || '';
  }

  guardarDatosAdicionales(datosAdicionales: DatosAdicionales): void {
    const mensaje = new AlertaMensaje();
    this.informacionComplementariaService.guardarInformacionComplementaria(datosAdicionales).subscribe(_ => {
      this.actualizarInformacionComplementaria(mensaje);
    });
  }

  actualizarInformacionComplementaria(mensaje: AlertaMensaje): void {
    mensaje.tipoMensaje = ConstantesExitoError.EXITO;
    mensaje.mensaje = MENSAJE_EXITO;
    this.alertaServicioLocal.agregarMensaje(mensaje);
    this.informacionComplementariaLocalService.actualizarInformacionComplementaria(this.codigoProyecto);
  }

  cambiarTitulo(titulo: string, singleSelection: boolean): string {
    if (titulo.startsWith('Agregar')) {
      titulo = titulo.replace('Agregar', 'Agregue');
    }

    if (singleSelection) {
      titulo += ', seleccione uno.';
    } else {
      titulo += ', puede seleccionar uno o varios.';
    }

    return titulo;
  }

  validarElementosSeleccionados(valor: any): boolean {
    return valor.elementosSeleccionados.length > 0;
  }

  validarSubagendasSeleccionadas(elemento: any): boolean {
    return elemento.subagendas && elemento.subagendas.length > 0;
  }

}
