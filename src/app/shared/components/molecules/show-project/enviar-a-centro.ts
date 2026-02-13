import { EstadoProyecto } from './estado-proyecto';
export interface EnviarACentro {
    codigoProyecto: string;
    estadoProyecto: EstadoProyecto;
    centroDeGestion: number;
    identificadorProcesoSeleccion: number;
    pestanasGuardadas: string[];
    nombreCortoProyecto: string;
    nombreCompletoCentro: string;
    fechaEnvio: string;
}
