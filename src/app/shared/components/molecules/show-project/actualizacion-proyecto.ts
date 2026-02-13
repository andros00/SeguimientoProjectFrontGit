import { EvaluacionTecnica } from './evaluacion-tecnica';
import { EvaluacionCientifica } from './evaluacion-cientifica';
import { Empleado } from './empleado';

export interface ActualizacionProyecto {
    identificador: number;
    habilitadoDescripcion: number;
    habilitadoParticipante: number;
    habilitadoCompromiso: number;
    habilitadoCronograma: number;
    habilitadoPresupuesto: number;
    habilitadoEvaluador: number;
    habilitadoDocumento: number;
    habilitadoDatoBasico: number;
    fechaAutorizacion: string;
    fechaActualizacion: string;
    fechaLimite: string;
    evaluacionTecnica: EvaluacionTecnica;
    evaluacionCientifica: EvaluacionCientifica;
    empleadoAutorizador: Empleado;
    cambiosSolicitados: string;
    cambiosRealizados: string;
    proyecto: string;
    mensajeActualizacionCientifica?: string;
    mensajeActualizacionTecnica?: string;
    orden: number;

    seccionesHabilitadas: string[];

    mostrarDetalle: boolean;
}
