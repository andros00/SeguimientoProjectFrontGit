import { TextoSolicitado } from './texto-solicitado';
export interface TextoDescriptivo {
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
