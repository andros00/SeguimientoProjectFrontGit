import { DependenciaFinanciadora } from './dependencia-financiadora';
import { PersonaJuridica } from './persona-juridica';
import { ProgramaFinanciador } from './programa-financiador';

export class FinanciadorConvocatoria {
    identificador?: number;
    financiador?: PersonaJuridica;
    selectorFinanciador?: string;
    convocatoria?: number;
    dependenciaFinanciadora?: DependenciaFinanciadora;
    programaFinanciador?: ProgramaFinanciador;
    esRecursoEstampilla?: number;
}
