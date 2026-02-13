import { SubtipoDisponibilidad } from './subtipo-disponibilidad';
import { TipoDisponibilidad } from './tipo-disponibilidad';
import { NivelAdministrativo } from './nivel-administrativo';
import { InstanciaAdministrativa } from './instancia-administrativa';

export interface Disponibilidad {
    idProcesoSeleccion: number;
    tiposDisponibilidad: TipoDisponibilidad[];
    subtiposDisponibilidad: SubtipoDisponibilidad[];
    operacion: number;
    aplicacion: number;
    nivelAdministrativo: NivelAdministrativo[];
    instanciasAdministrativas: InstanciaAdministrativa[];
    utilizacion: string;
}
