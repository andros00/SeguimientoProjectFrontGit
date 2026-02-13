import { ObservacionCondicionFormalPorEvaluacion } from './observacion-condicion-evaluacion';

export interface CondicionFormalPorEvaluacion {
    identificador: number;
    codigoPredefinido: string;
    comentario: string;
    condicionFormal: number;
    evaluacionTecnica: number;
    explicacionPredefinida: string;
    fechaUltimaModificacion: string;
    resultadoAutom: string;
    resultadoManual: string;
    ultimoEvaluador: number;
    explicacionCondicionFormal: string;
    observacionesCondicion: ObservacionCondicionFormalPorEvaluacion[];
}
