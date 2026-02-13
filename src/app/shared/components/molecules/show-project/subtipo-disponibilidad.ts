import { TipoDisponibilidad } from "./tipo-disponibilidad";

export interface SubtipoDisponibilidad {
    subtipo: number;
    nombre: string;
    descripcion: string;
    estado: string;
    tipo: TipoDisponibilidad;
    perfil: number;
    aplicacion: number;
}
