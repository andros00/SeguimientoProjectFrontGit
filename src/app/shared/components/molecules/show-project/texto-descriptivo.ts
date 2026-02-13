import { TextoSolicitado } from '../../convocatoria/modelo/texto-solicitado';
export class TextoDescriptivo {
    identificador: number;
    proyecto: string;
    textoSolicitado: TextoSolicitado;
    titulo: string;
    textoIngresado: string;
    planDeTrabajo: number;
    habilitadoEliminacion?: boolean;
    tituloEditable?: boolean;
    esOpcional?: boolean;
}
