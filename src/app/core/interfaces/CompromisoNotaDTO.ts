export interface CompromisoNotaDTO {
  identificador?: number;
  idCompromisoProyecto: number;
  nota: string;
  usuarioCrea: string;
  fechaCrea?: Date;
}
