import { DependenciaFinanciadora } from './dependencia-financiadora';
import { GrupoInvestigacion } from './grupo-investigacion';
import { PersonaJuridica } from './persona-juridica';
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
