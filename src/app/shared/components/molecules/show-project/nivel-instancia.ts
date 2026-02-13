import { InstanciaAdministrativa } from './instancia-administrativa';
import { NivelAdministrativo } from './nivel-administrativo';

export interface NivelInstancia {
    nivelAdministrativo: NivelAdministrativo;
    instanciaAdministrativa: InstanciaAdministrativa;
}
