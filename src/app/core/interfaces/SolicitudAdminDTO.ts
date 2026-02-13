export interface SolicitudAdminDTO {

  id: number;
  admFechaModifica: Date;
  descripcion: string;
  idTipoSolicitud: number;
  estado: number;
  tipoProrroga: string;
  tiempoSolicitado: number;
}
