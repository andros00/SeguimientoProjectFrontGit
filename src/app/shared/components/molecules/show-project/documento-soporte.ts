import { TipoDocumento } from './tipo-documento';

export interface DocumentoSoporte {
    identificador: number;
    nombreDocumento: string;
    fechaEmision: string;
    numeroDocumento: number;
    nombreAdjunto: string;
    emisor: string;
    descripcion: string;
    url: string;
    documentoAdjunto: any;
    fechaAdjunto: string;
    nombreUsuarioCrea: string;
    tipo?: TipoDocumento;
}
