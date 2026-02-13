import { DependenciaFinanciadora } from 'src/app/convocatoria/modelo/dependencia-financiadora';
import { GrupoInvestigacion } from 'src/app/shared/modelo/grupo-investigacion';
import { PersonaJuridica } from '../../shared/modelo/persona-juridica';
import { DatosAdicionalesAportantes } from './datos-adicional-aportantes';

export class AportanteProyecto {
    identificador?: number;
    dependencia?: DependenciaFinanciadora;
    grupo?: GrupoInvestigacion;
    personaJuridica?: PersonaJuridica;
    proyecto?: string;
    selectorJuridica?: string;
    tipo?: string;
    totalEspecie?: number;
    totalEspecieSolicitado?: number;
    totalFresco?: number;
    totalFrescoSolicitado?: number;
    aportanteGuardado?: boolean;
    tipoFinanciacion?: DatosAdicionalesAportantes;
    sectorAportante?: DatosAdicionalesAportantes;
    estampilla?: boolean;
}
