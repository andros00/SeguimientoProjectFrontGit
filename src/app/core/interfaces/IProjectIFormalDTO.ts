export interface IProjectIFormalDTO{
    id: number;
    codigoProyecto: string;
    duracion: number;
    fechaInicio: Date;
    fechaFinalizacion: Date;
    usuarioCrea: string;
    fechaCrea: Date;
    usuarioModifica: string;
    fechaModifica: Date;
    notificadoIF: string;
    notificadoFF: string;
    notificadoPA: string;
    notificadoAR: string;
    notificadoFechaPE: Date;
    notificadoFechaTE: Date;
    codigoInterno: string;
    fechaAprobacionRechazo: Date;
    estado: string;
    fechaAprobacionProyCodi: Date;
    codigoAprobacionActaCodi: string;

}
