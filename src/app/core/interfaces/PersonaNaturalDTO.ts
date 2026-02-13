
export interface PersonaNaturalDTO {

  // Identificación
  tipoIdentificacion: string;
  identificacion: string;
  identificacionLdap: string;

  // Información personal
  nombrePila: string;
  apellido1: string;
  apellido2: string;

  // Contacto
  correoElectronico: string;
  direccion: string;
  telefono: string;

  // Ubicación geográfica
  continente: number;
  pais: number;
  departamento: number;
  municipio: number;

  // Estado temporal
  temporal: number;
}
