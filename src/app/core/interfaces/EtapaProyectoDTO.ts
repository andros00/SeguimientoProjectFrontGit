export interface EtapaProyectoDTO {
  identificador?: number;
  nombre: string;
  descripcion?: string;
  duracion?: number;
  ejecucionPresupuestal?: boolean;
  fechaInicio?: Date | null;
  fechaFin?: Date | null;
  usuarioCrea?: string;
  usuarioModifica?: string;
}
