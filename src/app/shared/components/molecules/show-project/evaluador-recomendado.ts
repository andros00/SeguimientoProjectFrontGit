import { DocumentoSoporte } from "./documento-soporte";
import { Evaluador } from "./evaluador-proyecto";

export interface EvaluadorRecomendado {
    identificador?: number;
    evaluador?: Evaluador;
    proyecto?: string;
    recomendadorEvaluador?: number;
    recomendadoPorResponsable?: number;
    asignacion?: string;
    interna?: number;
    comentarioEvaluador?: string;
    correoNotificacion?: string;
    nombreCompleto?: string;
    envioCorreo?: string;
    tieneRolAsignado?: string;
    documentoSoporte?: DocumentoSoporte;
}
