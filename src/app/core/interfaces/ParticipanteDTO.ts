export interface ParticipanteDTO {
  anonimo: number,
  codProgramaApoyado: number, //obligatorio
  dedicacionHoras: number,
  dedicacionHorasPlan: number,
  dedicacionMeses: number,
  dedicacionMesesPlan: number,
  detalleContrato: string,
  funcion: string,
  grupo: number, //obligatorio
  identificador: number,
  institucion: string,
  nombreProgramaExterno: string,
  notaAclaratoria: number, //obligatorio
  notaAclaratoriaGeneral: string,
  observacion: string,
  personaNatural: string,
  porcentajeBeneficios: number,
  rolParticipanteProyecto: number,
  selectorPersona: string,
  tipoContrato: string,
  usuarioActualiza: string,
  vinculacionClase: string, //obligatorio
  vinculacionTipo: string, //obligatorio
  vinculacionUdea: string //obligatorio


// nuevos

  proyecto: string; //obligatorio
  fechaInicio: Date; // formato ISO: 'yyyy-MM-dd'
  fechaFin: Date;
  selectorInstitucion: string;
  nombre: string;
  correo: string;




}
