import { SubAgendaG8 } from "./subagendasG8";

export interface ElementoDatoAdicional {
    objetivo?: number;
    descripcion: string;
    foco?: number;
    agenda?: number;
    subagendas?: SubAgendaG8[];
}