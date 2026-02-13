import { EvaluadorRecomendado } from './evaluador-recomendado';
import { Empleado } from './empleado';
import { FormatoEvaluacion } from './formato-evaluacion';

export interface EvaluacionCientifica {

    identificador: number;
    comentarioEvaluacion: string;
    comentarioInv: string;
    esJurado: number;
    etapaProceso: number;
    evaluador: EvaluadorRecomendado;
    fechaEnvComInv: string;
    fechaEnvioResultado: string;
    fechaLimiteDevolucion: string;
    fechaNotificacion: string;
    formatoEvaluacion: FormatoEvaluacion;
    notaCualitativa: string;
    notaCuantitativa: number;
    proyecto: string;
    publica: number;
    reevaluacion: number;
    solicitanteEvaluacion: Empleado;
    sumaAlPromedio: number;
    conclusiones: string;
    estado: string;
}
