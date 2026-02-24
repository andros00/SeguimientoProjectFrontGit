import { DatoAdicionalAportante } from "./dato-adicional-aportante";
import { PersonaJuridica } from "./persona-juridica";

export interface ResultadosFinanciador {
    listaPersonaJuridica: PersonaJuridica[];
    cofinanciadorMatriculaProyecto: DatoAdicionalAportante;
}
