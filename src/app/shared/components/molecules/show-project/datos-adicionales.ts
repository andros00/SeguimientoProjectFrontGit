import { AgendaG8 } from "./agendaG8";
import { FocosMisionSabios } from "./focos-mision-sabios";
import { ObjetivosDesarrolloMilenio } from "./objetivos-desarrollo-milenio";
import { ObjetivosSocioeconomicos } from "./objetivos-socioeconomicos";

export interface DatosAdicionales {
    objetivosSocioeconomicos: ObjetivosSocioeconomicos[];
    focosMisionSabios: FocosMisionSabios[];
    objetivosDesarrolloMilenio: ObjetivosDesarrolloMilenio[];
    agendaG8: AgendaG8[];
    proyecto: string;
}
