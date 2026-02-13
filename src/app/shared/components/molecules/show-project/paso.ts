import { ServicioProyectoLocal } from '../servicio-local/servicio-proyecto-local';

export class Paso {
    numero: number;
    titulo: string;
    visible: boolean;
    valido: boolean;
    servicio: ServicioProyectoLocal;
    tabs: Paso[];
}
