import { ObservacionCondicionFormalPorEvaluacion } from 'src/app/acciones-proyecto/modelo/observacion-condicion-evaluacion';

export class CondicionFormalPorEvaluacion {
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
