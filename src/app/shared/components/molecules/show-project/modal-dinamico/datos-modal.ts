import { AportanteProyecto } from "src/app/proyecto/modelo/aportante-proyecto";

export interface DatosModal {
    titulo: string;
    mensaje: string;
    clase: string;
    textoPrimerBoton: string;
    textoSegundoBoton: string;
    editarAportante?: AportanteProyecto;
}
