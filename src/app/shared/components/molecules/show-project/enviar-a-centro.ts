import { EstadoProyecto } from './../../busqueda-proyecto/modelo/estado-proyecto';
export class EnviarACentro {
    codigoProyecto: string;
    estadoProyecto: EstadoProyecto;
    centroDeGestion: number;
    identificadorProcesoSeleccion: number;
    pestanasGuardadas: string[];
    nombreCortoProyecto: string;
    nombreCompletoCentro: string;
    fechaEnvio: string;
}
