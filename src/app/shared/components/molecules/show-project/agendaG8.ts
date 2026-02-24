import { SubAgendaG8 } from "./subagendasG8";

export interface AgendaG8 {
  agenda: number;
  descripcion: string;
  estado: string;
  subagendas: SubAgendaG8[];
}
