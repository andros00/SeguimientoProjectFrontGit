import { FinanciadorConvocatoria } from './financiador-convocatoria';
import { RubroConvocatoria } from './rubro-convocatoria';
import { TipoPorcentajeMaximo } from './tipo-porcentaje-maximo';

export interface PorcentajeMaximoRubros {
    identificador: number;
    convocatoria: number;
    financiador: FinanciadorConvocatoria;
    rubro: RubroConvocatoria;
    porcentajeMax: number;
    calcularSobre: TipoPorcentajeMaximo;
    usuarioCreador: string;
}
