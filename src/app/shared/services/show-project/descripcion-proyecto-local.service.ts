import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DescripcionProyectoService } from './descripcion-proyecto.service';
import { ProyectoLocalService } from './proyecto-local.service';
import { TextoDescriptivo } from '../../components/molecules/show-project/texto-descriptivo';
import { ProyectoConstantes } from '../../components/molecules/show-project/proyecto-constantes';
import { ServicioProyectoLocal } from './servicio-proyecto-local';

@Injectable({
  providedIn: 'root'
})
export class DescripcionProyectoLocalService implements ServicioProyectoLocal {

  private readonly codigoConvocatoria = 1;
  private readonly codigoProcesoSeleccion = 2;
  private listaTextoDescriptivoObligatoria: BehaviorSubject<TextoDescriptivo[]> = new BehaviorSubject<TextoDescriptivo[]>([]);
  public listaTextoDescriptivoObligatorioObservable = this.listaTextoDescriptivoObligatoria.asObservable();
  private listaTextoDescriptivoOpcional: BehaviorSubject<TextoDescriptivo[]> = new BehaviorSubject<TextoDescriptivo[]>([]);
  public listaTextoDescriptivoOpcionalObservable = this.listaTextoDescriptivoOpcional.asObservable();

  constructor(private proyectoServicioLocal: ProyectoLocalService, private descripcionServicio: DescripcionProyectoService) {
  }

  agregarTextosDescriptivosOpcionalesYObligatorios(textosDescriptivos: TextoDescriptivo[]) {
    const listaTextoDescriptivoObligatorio = this.obtenerListaTextoDescriptivoObligatorio();
    const listaTextoDescriptivoOpcional = this.obtenerListaTextoDescriptivoOpcional();
    if (!!textosDescriptivos &&
      ((listaTextoDescriptivoObligatorio.length === 0) || (listaTextoDescriptivoOpcional.length === 0))) {
      const objetivoEspecifico = 'Objetivo específico';
      const objetivoGeneral = 'Objetivo general';
      textosDescriptivos.forEach(texto => {
        if (texto.titulo !== objetivoEspecifico && texto.titulo !== objetivoGeneral) {
          if (!!texto.textoSolicitado && texto.textoSolicitado.opcional === 1) {
            this.agregarSiNoExiste(listaTextoDescriptivoOpcional, texto);
          } else {
            this.agregarSiNoExiste(listaTextoDescriptivoObligatorio, texto);
          }
        } else {
          this.agregarSiNoExiste(listaTextoDescriptivoObligatorio, texto);
        }
      });
      this.textosOpcionalesYaDiligenciados();
    }
  }

  private textosOpcionalesYaDiligenciados() {
    this.listaTextoDescriptivoOpcional.getValue().forEach((textoDescriptivoOpcional, index) => {
      if (!!textoDescriptivoOpcional.textoIngresado) {
        textoDescriptivoOpcional.tituloEditable = false;
        textoDescriptivoOpcional.habilitadoEliminacion = true;
        textoDescriptivoOpcional.esOpcional = true;
        this.obtenerListaTextoDescriptivoObligatorio().push(textoDescriptivoOpcional);
        this.listaTextoDescriptivoOpcional.getValue().splice(index, 1);
      }
    });
  }

  private agregarSiNoExiste(listadoTextos: TextoDescriptivo[], texto: TextoDescriptivo) {
    const existe = !!listadoTextos.find(t => t.identificador === texto.identificador);
    if (!existe) {
      listadoTextos.push(texto);
    }
  }

  obtenerListaTextoDescriptivoObligatorio(): TextoDescriptivo[] {
    return this.listaTextoDescriptivoObligatoria.getValue();
  }

  agregarTextoDescriptivoObligatorio(listaTextoDescriptivo: TextoDescriptivo[]) {
    this.listaTextoDescriptivoObligatoria.next(listaTextoDescriptivo);
  }

  obtenerListaTextoDescriptivoOpcional(): TextoDescriptivo[] {
    return this.listaTextoDescriptivoOpcional.getValue();
  }

  agregarTextoDescriptivoOpcional(listaTextoDescriptivo: TextoDescriptivo[]) {
    this.listaTextoDescriptivoOpcional.next(listaTextoDescriptivo);
  }

  validar() {
    if (this.proyectoServicioLocal.obtenerInformacionGeneralProyecto().claseProyecto === this.codigoConvocatoria) {
      let nombreTextosDescriptivos: string[] = [];
      nombreTextosDescriptivos =
        nombreTextosDescriptivos.concat(this.listaTextoDescriptivoObligatoria.getValue()
          .filter(textoDescriptivo => !textoDescriptivo.textoIngresado && textoDescriptivo.textoSolicitado)
          .map(textoDescriptivo => textoDescriptivo.textoSolicitado.titulo));
      if (nombreTextosDescriptivos && nombreTextosDescriptivos.length > 0) {
        return `La convocatoria
        <strong>${this.proyectoServicioLocal.obtenerInformacionGeneralConvocatoria().getValue().nombreCorto}</strong>
        requiere que se ingresen obligatoriamente las descripciones actualmente vacías:
        <strong>${nombreTextosDescriptivos.join(', ')}</strong>.
        Para matricular el proyecto en la convocatoria debe ingresar cada una de las descripciones obligatorias faltantes.`;
      }
    } else {
      const numeroDescripciones = this.listaTextoDescriptivoObligatoria.getValue()
        .filter(textoDescriptivo => !textoDescriptivo.textoIngresado).length;
      if (numeroDescripciones > 0) {
        return `Para matricular el proyecto en el proceso de selección debe ingresar las descripciones
        objetivo general y objetivo específico.`;
      }
    }
    return '';
  }

  guardar() {
    const listaTextosDescriptivos: TextoDescriptivo[] = [];
    listaTextosDescriptivos.push(...this.listaTextoDescriptivoObligatoria.getValue());
    listaTextosDescriptivos.push(...this.listaTextoDescriptivoOpcional.getValue());
    return this.descripcionServicio.guardarListaTextoDescriptivo(listaTextosDescriptivos, ProyectoConstantes.ENVIADO_A_CENTRO);
  }

  postguardado(listaTextosDescriptivos: TextoDescriptivo[]) {
  }
}
