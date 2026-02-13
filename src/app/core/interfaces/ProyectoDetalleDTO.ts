import { ConvocatoriaDTO } from "./ConvocatoriaDTO";
import { FinanciadorDTO } from "./FinanciadorDTO";
import { GrupoDTO } from "./GrupoDTO";
import { ProyectoDTO } from "./ProyectoDTO";
import { SolicitudAdminDTO } from "./SolicitudAdminDTO";

export interface ProyectoDetalleDTO {
  convocatoria: ConvocatoriaDTO;
  listaFinanciadores: FinanciadorDTO[];
  listaGrupo: GrupoDTO[];
  prorrogasAplicadas: SolicitudAdminDTO[];
  proyecto: ProyectoDTO;
  fechalimiteInicio: Date;
}
