import { EvaluadorRecomendado } from './evaluador-recomendado';
import { EvaluacionCientifica } from './evaluacion-cientifica';
import { ResultadoProyecto } from './resultado-proyecto';

export interface EvaluadorEvaluacionCientifica extends ResultadoProyecto {
    evaluadorRecomendado: EvaluadorRecomendado;
    evaluacionCientifica: EvaluacionCientifica;
    fechaEtapaVigente: boolean;
    inconsistencia: string;
}
