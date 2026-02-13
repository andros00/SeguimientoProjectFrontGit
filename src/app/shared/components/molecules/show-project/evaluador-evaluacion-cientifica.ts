import { EvaluadorRecomendado } from 'src/app/proyecto/modelo/evaluador-recomendado';
import { EvaluacionCientifica } from 'src/app/proyecto/modelo/evaluacion-cientifica';
import { ResultadoProyecto } from 'src/app/busqueda-proyecto/modelo/resultado-proyecto';

export class EvaluadorEvaluacionCientifica extends ResultadoProyecto {
    evaluadorRecomendado: EvaluadorRecomendado;
    evaluacionCientifica: EvaluacionCientifica;
    fechaEtapaVigente: boolean;
    inconsistencia: string;
}
