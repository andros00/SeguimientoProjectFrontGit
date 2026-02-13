import { Accion } from './accion';
import { InstanciaAdministrativa } from './instancia-administrativa';
import { NivelAdministrativo } from './nivel-administrativo';

export interface EtapaSeleccion {
    identificador: number;
    accion: Accion;
    nombre: string;
    orden: number;
    maximoReevaluacion: number;
    maximoReprobEvalTecnica: number;
    etiquetaAprobado: string;
    etiquetaNoAprobado: string;
    nivelAdministrativo: NivelAdministrativo;
    instanciaAdministrativa: InstanciaAdministrativa;
    editaListaEvaluadores: boolean;
    evaluacionCientificaInterna: boolean;
    reevaluacionCientificaInterna: boolean;
    evaluacionCientificaExterna: boolean;
    reevaluacionCientificaExterna: boolean;
    registraAprobacionExterna: boolean;
    juradoProcesoSeleccion: boolean;
    finProcesoSeleccion: boolean;
    esEtapaPreAprobacion: boolean;
    esEtapaAvalEticoBioetico: boolean;
}
