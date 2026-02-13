import { ModalidadConvocatoria } from './modalidad-convocatoria';
export interface Compromiso {
    identificador: number;
    convocatoria: number;
    orden: number;
    descripcion: string;
    explicacionCondicion: string;
    tipoCompromiso: string;
    modalidades: ModalidadConvocatoria[];
}
