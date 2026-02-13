import { Compromiso } from './compromiso';

export interface CompromisoProyecto {

    identificador: number;
    actaFecha: string;
    actaNro: string;
    asumido: number;
    comentario: string;
    compromiso: Compromiso;
    descripcionPropio: string;
    estado: string;
    fechaCrea: string;
    fechaEstimada: string;
    fechaModifica: string;
    fechaReal: string;
    idTipo: number;
    metaEnBpp: number;
    notificadoFf: string;
    proyecto: string;
    resultadoAutomatico: string;
    usuarioCrea: string;
    usuarioModifica: string;
}
