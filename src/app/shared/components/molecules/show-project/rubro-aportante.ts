import { AportanteProyecto } from './aportante-proyecto';

export class RubroAportante {

    identificador: number;
    aportante: AportanteProyecto;
    fresco: number;
    especie: number;
    periodo: number;
    frescoSolicitado: number;
    especieSolicitado: number;

    // campos no mapeados en el backend
    porcentaje: number;
    habilitado: boolean;
    porcentajeValido: boolean;
}
