import { FinanciadorConvocatoria } from './financiador-convocatoria';

export interface RubroPreautorizado {
  identificador: number;
  convocatoria: number;
  financiador: FinanciadorConvocatoria;
  tipoCambioPreaut: string;
  porcentajeCambPreaut: number;
  usuarioCreador: string;
}
