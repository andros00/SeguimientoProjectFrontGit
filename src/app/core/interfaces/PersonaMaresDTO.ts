export interface PersonaMaresDTO {
  nombre: string;
  apellidos: string;
  email: string;
  celular: string;
  telefono: string;
  direccion: string;

  codigoContinenteResidencia: number;
  nombreContinenteResidencia: string;
  codigoPaisResidencia: number;
  nombrePaisResidencia: string;
  codigoDepartamentoResidencia: number;
  nombreDepartamentoResidencia: string;
  codigoMunicipioResidencia: number;
  nombreMunicipioResidencia: string;

  codigoContinenteNacimiento: number;
  nombreContinenteNacimiento: string;
  codigoPaisNacimiento: number;
  nombrePaisNacimiento: string;
  codigoDepartamentoNacimiento: number;
  nombreDepartamentoNacimiento: string;
  codigoMunicipioNacimiento: number;
  nombreMunicipioNacimiento: string;

  codigoColegio: string;
  nombreColegio: string;
  estadoPersona: string;
  sexo: string;
  tipoDocumento: string;
  estadoCivil: string;
  fechaNacimiento: string;

  trabajador: string;
  anoTitulo: string;
  semestre: number;
  nombrePrograma: string;
  inicioSemestre: string;
  finSemestre: string;
}
