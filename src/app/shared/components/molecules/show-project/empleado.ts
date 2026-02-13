import { InstanciaAdministrativa } from './instancia-administrativa';

export interface Empleado {
    identificador: number;
    correoEmpleado: string;
    fechaFin: string;
    fechaInicio: string;
    instanciaAdministrativa: InstanciaAdministrativa;
    nivelComoAdministrador: number;
    nombreEmpleado: string;
    personaNatural: string;
    selectorPersona: string;
    rolMua: string;
}
