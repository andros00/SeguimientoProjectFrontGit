import { ElementosSeleccionados } from "./elementos-seleccionados";
import { InformacionComplementaria } from "./informacion-complementaria";

export interface ObjetoInformacionComplementaria {
  titulo: string;
  elementos: InformacionComplementaria[];
  elementosSeleccionados?: ElementosSeleccionados[];
  singleSelection: boolean;
}
