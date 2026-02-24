import { FechaProcesoSeleccion } from "./fecha-proceso-seleccion";

export interface FechaIntermedia {
  identificador: number;
  convocatoria: number;
  orden: number;
  fechaInicial: string;
  fechaFinal: string;
  fechaProcesoSeleccion: FechaProcesoSeleccion;
  evento: string;
}
