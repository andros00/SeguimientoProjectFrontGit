import { InstanciaAdministrativa } from 'src/app/shared/modelo/instancia-administrativa';

export class EvaluacionTecnica {

    identificador: number;
    etapaProceso: number;
    fechaConfirmacion: string;
    fechaUltimoCambio: string;
    instanciaEvaluadora: InstanciaAdministrativa;
    liquidacionProyecto: string;
    proyecto: string;
    resultadoAutom: string;
    resultadoManual: string;
}
