import { CategoriaCondicionFormal } from './categoria-condicion-formal';
import { NivelInstancia } from './nivel-instancia';

export interface CondicionFormal {
    identificador: number;
    accion: string;
    orden: number;
    explicacion: string;
    listadoCategoriaCondicionFormal: CategoriaCondicionFormal[];
    nivelInstancia: NivelInstancia[];
}
