import { CeldaRubroPorAportante } from './celda-rubro-por-aportante';
import { RubroConvocatoria } from 'src/app/convocatoria/modelo/rubro-convocatoria';
import { RubroAportante } from './rubro-aportante';

export class RubroProyecto {
    identificador: number;
    proyecto: string;
    rFinanciable: RubroConvocatoria;
    rConvocatoria: RubroConvocatoria;
    totalFresco: number;
    totalEspecie: number;
    nombre: string;
    justificacion: string;
    totalFrescoSolicitado: number;
    totalEspecieSolicitado: number;

    // lista de rubros_x_aportante que se envía al backend
    aportantes: RubroAportante[];
    rubrosHijos: RubroProyecto[];

    // campos no mapeados en el backend

    // lista de rubros_x_aportante agrupados que se usa como modelo de la tabla html
    listaRubrosPorAportantes: CeldaRubroPorAportante[];

    habilitado: number;
    hijosVisibles: boolean;
    porcentajeSubtotalFresco: number;
}
