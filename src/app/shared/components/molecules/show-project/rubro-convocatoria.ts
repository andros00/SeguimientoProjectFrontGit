import { FinanciadorConvocatoria } from './financiador-convocatoria';

export interface RubroConvocatoria {
    identificador: number;
    convocatoria: number;
    orden: number;
    nombre: string;
    aplicacion: number;
    etiquetaJustificacion: string;
    explicacion: string;
    esAdministracion: number;
    listaFinanciadorConvocatoria: FinanciadorConvocatoria[];
    listaRubrosHijos?: RubroConvocatoria[];
}
