import { DocumentoSoporte } from './documento-soporte';

export interface DocumentoProyecto {
    identificador: number;
    proyecto: string;
    documentoSoporte: DocumentoSoporte;
}
