import { InstanciaAdministrativa } from 'src/app/shared/modelo/instancia-administrativa';

export class EvaluacionCientifica {

    identificador: number;
    etapaProceso: number;
    fechaConfirmacion: string;
    fechaUltimoCambio: string;
    instanciaEvaluadora: InstanciaAdministrativa;
    proyecto: string;
    resultadoAutom: string;
    resultadoManual: string;
    aceptaActualizacion: boolean;
}
