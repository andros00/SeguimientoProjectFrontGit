import { Component, OnInit, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { ObjetoInformacionComplementaria } from '../objeto-informacion-complementaria';
import { DatosAdicionales } from '../datos-adicionales';
import { InformacionComplementariaService } from 'src/app/shared/services/show-project/informacion-complementaria.service';
import { ProyectoLocalService } from 'src/app/shared/services/show-project/proyecto-local.service';
import { AlertaLocalService } from 'src/app/shared/services/show-project/alerta-local.service';
import { InformacionComplementariaLocalService } from 'src/app/shared/services/show-project/informacion-complementaria-local.service';
import { ProyectoConstantes } from '../proyecto-constantes';
import { ElementosSeleccionados } from '../elementos-seleccionados';
import { InformacionComplementaria } from '../informacion-complementaria';
import { ElementoDatoAdicional } from '../elemento-dato-adicional';
import { ConstantesExitoError } from '../mensaje-exito-error/constantes-exito-error';
import { AlertaMensaje } from '../mensaje-exito-error/alerta-mensaje';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription } from "@angular/material/expansion";
import { MatCheckbox } from "@angular/material/checkbox";

const MENSAJE_EXITO = 'Información complementaria guardada con éxito.';

@Component({
  selector: 'app-lista-informacion-complementaria',
  templateUrl: './lista-informacion-complementaria.component.html',
  styleUrls: ['./lista-informacion-complementaria.component.css']
})
export class ListaInformacionComplementariaComponent implements OnInit {

  @Input() editable!: boolean;

  listado: ObjetoInformacionComplementaria[] = [];
  datosService: DatosAdicionales = {} as DatosAdicionales;
  codigoProyecto: string;
  mensajeAyuda: string = '';

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
    const indice = valor.elementosSeleccionados!.findIndex(i =>
      (sub ? (i.agenda === elemento.objetivo && i.subagenda === sub.objetivo) : i.objetivo === elemento.objetivo));

    if (indice === -1) {
      valor.elementosSeleccionados!.push(item);
    } else {
      valor.elementosSeleccionados!.splice(indice, 1);
    }
  }



  organizarDatos(propiedad: 'objetivosSocioeconomicos' | 'focosMisionSabios' | 'objetivosDesarrolloMilenio' | 'agendaG8',
    elementosSeleccionados: ElementosSeleccionados[]): Observable<ObjetoInformacionComplementaria> {
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

  manejarCambioElemento(elemento: InformacionComplementaria, subAgenda: InformacionComplementaria,
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
    // const seleccionados = this.obtenerSeleccionados();
    // seleccionados.proyecto = this.codigoProyecto;
    // this.guardarDatosAdicionales(seleccionados);
  }

  // obtenerSeleccionados(): DatosAdicionales {
  //   let seleccionados = {};
  //   this.listado.forEach(valor => {
  //     let propiedad = this.obtenerPropiedadOTitulo(valor.titulo);
  //     seleccionados[propiedad] = valor.elementosSeleccionados;
  //   });
  //   return seleccionados as DatosAdicionales;
  // }

  obtenerPropiedadOTitulo(valor: string): string {
    const mapeoTitulosAPropiedades: Record<string, string> = {
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
    // const mensaje = new AlertaMensaje();
    // this.informacionComplementariaService.guardarInformacionComplementaria(datosAdicionales).subscribe(_ => {
    //   this.actualizarInformacionComplementaria(mensaje);
    // });
  }

  actualizarInformacionComplementaria(mensaje: AlertaMensaje): void {
    // mensaje.tipoMensaje = ConstantesExitoError.EXITO;
    // mensaje.mensaje = MENSAJE_EXITO;
    // this.alertaServicioLocal.agregarMensaje(mensaje);
    // this.informacionComplementariaLocalService.actualizarInformacionComplementaria(this.codigoProyecto);
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

  obtenerDetalleSeleccionados(valor: ObjetoInformacionComplementaria): string[] {
    const detalleSeleccionados: string[] = [];

    valor.elementos.forEach((elemento) => {
      if (this.tieneSubagendas(elemento)) {
        elemento.subagendas!.forEach((subagenda) => {
          if (subagenda.seleccionado) {
            detalleSeleccionados.push(`${elemento.objetivo}.${subagenda.objetivo}. ${subagenda.descripcion}`);
          }
        });
      } else if (elemento.seleccionado) {
        detalleSeleccionados.push(`${elemento.objetivo}. ${elemento.descripcion}`);
      }
    });

    return detalleSeleccionados;
  }

  tieneSubagendas(elemento: InformacionComplementaria): boolean {
    return !!elemento.subagendas && elemento.subagendas.length > 0;
  }

}
