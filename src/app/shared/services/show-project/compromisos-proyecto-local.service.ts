import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ProyectoConstantes } from '../../components/molecules/show-project/proyecto-constantes';
import { CompromisosProyectoService } from './compromisos-proyecto.service';
import { ServicioProyectoLocal } from './servicio-proyecto-local';
import { CompromisoProyecto } from '../../components/molecules/show-project/compromiso-proyecto';

@Injectable({
  providedIn: 'root'
})
export class CompromisosProyectoLocalService implements ServicioProyectoLocal {

  readonly tipoCompromisoObligatorio = 'Obligatorio';
  readonly tipoCompromisoObligatorioBD = 'b';


  private listaCompromisosObligatorios: BehaviorSubject<CompromisoProyecto[]> = new BehaviorSubject<CompromisoProyecto[]>([]);
  public listaCompromisosObligatoriosObservable = this.listaCompromisosObligatorios.asObservable();

  private listaCompromisosOpcionales: BehaviorSubject<CompromisoProyecto[]> = new BehaviorSubject<CompromisoProyecto[]>([]);
  public listaCompromisosOpcionalesObservable = this.listaCompromisosOpcionales.asObservable();

  constructor(private compromisoServicio: CompromisosProyectoService) {
  }

  public cargarCompromisos(listaCompromisosProyecto: CompromisoProyecto[]) {
    if (listaCompromisosProyecto) {
      listaCompromisosProyecto.forEach(compromisoProyecto => {
        if (!!compromisoProyecto.compromiso && (compromisoProyecto.compromiso.tipoCompromiso === this.tipoCompromisoObligatorio
          || compromisoProyecto.compromiso.tipoCompromiso === this.tipoCompromisoObligatorioBD)) {
          this.listaCompromisosObligatorios.getValue().push(compromisoProyecto);
        } else {
          this.listaCompromisosOpcionales.getValue().push(compromisoProyecto);
        }
      });
    }
  }

  public obtenerListaCompromisosObligatorios(): CompromisoProyecto[] {
    return this.listaCompromisosObligatorios.getValue();
  }

  public agregarListaCompromisosObligatorios(listaCompromisos: CompromisoProyecto[]) {
    this.listaCompromisosObligatorios.next(listaCompromisos);
  }

  public obtenerListaCompromisosOpcionales(): CompromisoProyecto[] {
    return this.listaCompromisosOpcionales.getValue();
  }

  public agregarListaCompromisosOpcionales(listaCompromisos: CompromisoProyecto[]) {
    this.listaCompromisosOpcionales.next(listaCompromisos);
  }

  validar() {
    const numeroCompromisosOpcionales = this.listaCompromisosOpcionales.getValue().length;
    const numeroCompromisosOpcionalesAsumidos = this.listaCompromisosOpcionales.getValue()
      .filter(compromiso => compromiso.asumido === 1).length;
    if (numeroCompromisosOpcionales > 1 && numeroCompromisosOpcionalesAsumidos === 0) {
      return `Los compromisos del proyecto están incompletos: Debe asumir al menos uno de los compromisos
      opcionales.`;
    }
    return '';
  }

  guardar() {
    let compromisos: CompromisoProyecto[] = [];
    compromisos = compromisos.concat(this.listaCompromisosObligatorios.getValue());
    compromisos = compromisos.concat(this.listaCompromisosOpcionales.getValue());
    return this.compromisoServicio.guardarCompromisos(compromisos, ProyectoConstantes.ENVIADO_A_CENTRO);
  }

  postguardado(compromisosGuardados: CompromisoProyecto[]) {
    const listaCompromisosObligatorios: CompromisoProyecto[] = [];
    const listaCompromisosOpcionales: CompromisoProyecto[] = [];
    compromisosGuardados.forEach(compromiso => {
      if (compromiso.compromiso && compromiso.compromiso.tipoCompromiso === this.tipoCompromisoObligatorio) {
        listaCompromisosObligatorios.push(compromiso);
      } else {
        listaCompromisosOpcionales.push(compromiso);
      }
    });
    this.agregarListaCompromisosObligatorios(listaCompromisosObligatorios);
    this.agregarListaCompromisosOpcionales(listaCompromisosOpcionales);
  }
}
