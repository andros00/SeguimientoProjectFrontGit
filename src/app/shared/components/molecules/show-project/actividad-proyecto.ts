export class ActividadProyecto {
    identificador: number;
    proyecto: string;
    orden: number;
    consecutivo: number;
    inicio: number;
    fin: number;
    nombre: string;
    detalle?: string;
    periodo: string;

    rangoMeses?: number[];
}
