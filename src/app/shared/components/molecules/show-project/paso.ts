import { ServicioProyectoLocal } from "src/app/shared/services/show-project/servicio-proyecto-local";

export interface Paso {
    numero: number;
    titulo: string;
    visible: boolean;
    valido: boolean;
    servicio: ServicioProyectoLocal;
    tabs: Paso[];
}
