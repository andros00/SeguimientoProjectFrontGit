import { CategoriaCondicionFormal } from "./categoria-condicion-formal";
import { ModalidadConvocatoria } from "./modalidad-convocatoria";
import { NivelInstancia } from "./nivel-instancia";

export interface CondicionFormalConvocatoria {
    identificador: number;
    convocatoria: number;
    orden: number;
    explicacion: string;
    nivelInstancia: NivelInstancia[];
    listadoCategoriaCondicionFormal: CategoriaCondicionFormal[];
    listadoModalidadConvocatoria: ModalidadConvocatoria[];
}
