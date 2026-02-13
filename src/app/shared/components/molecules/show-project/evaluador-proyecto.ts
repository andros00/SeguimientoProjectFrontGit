import { PersonaJuridica } from './persona-juridica';
export interface Evaluador {
    identificador: number;
    identificacion: string;
    tipoIdentificacion: string;
    nombres: string;
    primerApellido: string;
    segundoApellido: string;
    institucion: string;
    personaJuridica: PersonaJuridica;
    areaEspecialidad: string;
    comentarioEvaluador: string;
    tipoEvaluador: string;
    correoElectronico: string;
    telefono: string;
    celular: string;
    habilitadoEvaluador: number;
    direccion: string;
    cvlacColciencias: string;
    continente: number;
    pais: number;
    departamento: number;
    municipio: number;
    fechaNacimiento: string;
    sexo: string;
}
